import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditLog } from './entity/audit-log.entity';
import { AuditLogService } from './service/audit-log.service';
import { AuditLogController } from './audit-log.controller';
import { AuditLogRepository } from './repository/audit-log.repository';

@Module({
  controllers: [AuditLogController],
  providers: [AuditLogService, AuditLogRepository],
  imports: [TypeOrmModule.forFeature([AuditLog])]
})
export class AuditLogModule {}
