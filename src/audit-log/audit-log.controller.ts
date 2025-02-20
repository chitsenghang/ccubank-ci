import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ResponseMappingInterceptor } from '../common/interceptors/response-mapping.interceptor';
import { PaginationResponse } from '../common/interface/response.interface';
import { AuditLogPaginationDto } from './dto/audit-log-pagination.dto';
import { AuditLogService } from './service/audit-log.service';
import { AuditLog } from './entity/audit-log.entity';

@UseInterceptors(ResponseMappingInterceptor)
@ApiBearerAuth()
@Controller('audit-log')
export class AuditLogController {
  constructor(private readonly auditLogService: AuditLogService) {}

  @Get()
  findAll(
    @Query() pagination: AuditLogPaginationDto
  ): Promise<PaginationResponse<AuditLog>> {
    return this.auditLogService.findAllWithPagination(pagination);
  }
}
