import { Injectable } from '@nestjs/common';
import { PaginationResponse } from '../../common/interface/response.interface';
import { AuditLogPaginationDto } from '../dto/audit-log-pagination.dto';
import { AuditLog } from '../entity/audit-log.entity';
import { AuditLogRepository } from '../repository/audit-log.repository';
import { CreateAuditLogDtoDto } from '../dto/create-audit-log.dto';
import { IAuditLogService } from './audit-log.service.interface';

@Injectable()
export class AuditLogService implements IAuditLogService {
  private readonly auditLogging = 'AUDIT LOG';

  constructor(private readonly auditLoggingRepo: AuditLogRepository) {}

  async findAllWithPagination(
    pagination: AuditLogPaginationDto
  ): Promise<PaginationResponse<AuditLog>> {
    return this.auditLoggingRepo.findAllAuditLog(pagination);
  }

  async saveAuditLog(
    createAuditLogDtoDto: CreateAuditLogDtoDto
  ): Promise<AuditLog> {
    return this.auditLoggingRepo.saveAuditLog(createAuditLogDtoDto);
  }
}
