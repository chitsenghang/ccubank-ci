import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { loadEnvConfig } from './config/env.config';
import { AuthenticationModule } from './authentication/authentication.module';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { RedisCacheModule } from './cache/cache.module';
import { RequestContextModule } from './requestcontext/request-context.module';
import AppDataSource from './ormconfig';
import { AuditSubscriber } from './common/entities/subscriber/audit-subscriber';
import { AuditLogModule } from './audit-log/audit-log.module';
import { UserRoleModule } from './userrole/user-role.module';
import { RolePermissionModule } from './rolepermission/role-permission.module';
import { AuditLogMiddleware } from './common/middleware/logger/audit-log-middleware';
import { AuditLogService } from './audit-log/service/audit-log.service';
import { AuditLogRepository } from './audit-log/repository/audit-log.repository';
import { AuthMiddleware } from './common/guards/auth/auth.guard';

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
    AuthenticationModule,
    UserModule,
    RoleModule,
    PermissionModule,
    RedisCacheModule,
    RequestContextModule,
    AuditLogModule,
    UserRoleModule,
    RolePermissionModule
  ],
  controllers: [],
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
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware, AuditLogMiddleware)
      .exclude({ path: 'auth/token', method: RequestMethod.POST })
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
