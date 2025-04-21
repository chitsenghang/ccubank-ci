import { join } from 'path';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { loadEnvConfig } from './config/env.config';
import { AuthenticationModule } from './authentication/authentication.module';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { RedisCacheModule } from './cache/cache.module';
import { RequestContextModule } from './requestcontext/request-context.module';
import AppDataSource from './ormconfig';
import { AuditSubscriber } from './common/entity/subscriber/audit-subscriber';
import { AuditLogModule } from './audit-log/audit-log.module';
import { UserRoleModule } from './userrole/user-role.module';
import { RolePermissionModule } from './rolepermission/role-permission.module';
import { AuditLogMiddleware } from './common/middleware/logger/audit-log-middleware';
import { AuditLogService } from './audit-log/service/audit-log.service';
import { AuditLogRepository } from './audit-log/repository/audit-log.repository';
import { AuthMiddleware } from './common/guards/auth/auth.guard';
import { MediaModule } from './media/media.module';
import { ApplyCardModule } from './applycard/apply-card.module';
import { LanguageModule } from './language/language.module';
import { OtpModule } from './otp/otp.module';
import { PageContentModule } from './pagecontent/page-content.module';
import { ComplaintFeedbackModule } from './complaintfeedback/complaint-feedback.module';
import { ExportModule } from './export/export.module';
import { CardModule } from './applycard/card/card.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: loadEnvConfig
    }),
    ThrottlerModule.forRoot([
      {
        ttl: +process.env.RATE_LIMIT_TTL,
        limit: +process.env.RATE_LIMIT
      }
    ]),
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        ...AppDataSource.options,
        autoLoadEntities: true,
        subscribers: [AuditSubscriber]
      })
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public'),
      serveRoot: ''
    }),
    AuthenticationModule,
    UserModule,
    RoleModule,
    PermissionModule,
    RedisCacheModule,
    RequestContextModule,
    AuditLogModule,
    UserRoleModule,
    RolePermissionModule,
    MediaModule,
    ApplyCardModule,
    LanguageModule,
    OtpModule,
    PageContentModule,
    ComplaintFeedbackModule,
    ExportModule,
    CardModule
  ],
  providers: [
    AuditLogRepository,
    AuditLogService,
    JwtService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ]
})
export class AppModule {
  private static readonly EXCLUDED_PATHS = [
    { path: 'media', method: RequestMethod.ALL },
    { path: 'media/:param*', method: RequestMethod.ALL },
    { path: 'public/*', method: RequestMethod.GET },
    { path: 'self/:param*', method: RequestMethod.ALL },
    { path: 'auth/token', method: RequestMethod.POST }
  ];

  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(AuthMiddleware, AuditLogMiddleware)
      .exclude(...AppModule.EXCLUDED_PATHS)
      .forRoutes('*');
  }
}
