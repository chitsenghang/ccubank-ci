import { AuditLog } from '../entity/audit-log.entity';
import { AuditLogPaginationDto } from '../dto/audit-log-pagination.dto';
import { PaginationResponse } from '../../common/interface/response.interface';
import { CreateAuditLogDtoDto } from '../dto/create-audit-log.dto';

export interface IAuditLogRepository {
  findAllAuditLog(
    pagination: AuditLogPaginationDto
  ): Promise<PaginationResponse<AuditLog>>;

  saveAuditLog(createAuditLogDtoDto: CreateAuditLogDtoDto): Promise<AuditLog>;
}
