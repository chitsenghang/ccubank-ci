import { DataSource, ILike, Raw } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../base/base-repository';
import { AuditLogPaginationDto } from '../dto/audit-log-pagination.dto';
import { PaginationResponse } from '../../common/interface/response.interface';
import { AuditLog } from '../entity/audit-log.entity';
import { DateTimeUtilService } from '../../common/utils/date-utils';
import {
  DEFAULT_DATE_FORMAT,
  DEFAULT_TIME_FORMAT
} from '../../common/dto/default-date-format';
import { CreateAuditLogDtoDto } from '../dto/create-audit-log.dto';
import { IAuditLogRepository } from './audit-log.repository.interface';

@Injectable()
export class AuditLogRepository
  extends BaseRepository<AuditLog>
  implements IAuditLogRepository
{
  constructor(private readonly dataSource: DataSource) {
    super(AuditLog, dataSource.createEntityManager());
  }

  async findAllAuditLog(
    pagination: AuditLogPaginationDto
  ): Promise<PaginationResponse<AuditLog>> {
    if (pagination?.orderBy === 'createdBy') {
      pagination.orderBy = 'createdBy.id';
    }
    const { fromDate, toDate, fromTime, toTime } = pagination;
    let searchCondition: any;
    let fromDateFormatted: string;
    let toDateFormatted: string;
    let fromTimeFormatted: string;
    let toTimeFormatted: string;
    if (fromDate && toDate) {
      fromDateFormatted = DateTimeUtilService.formatDate(
        fromDate,
        DEFAULT_DATE_FORMAT
      );
      toDateFormatted = DateTimeUtilService.formatDate(
        toDate,
        DEFAULT_DATE_FORMAT
      );
      searchCondition = Raw(
        (alias: string): string =>
          `TO_CHAR(${alias}, 'YYYY-MM-DD') BETWEEN '${fromDateFormatted}' AND '${toDateFormatted}'`
      );
    }
    if (fromTime && toTime) {
      fromTimeFormatted = DateTimeUtilService.formatDate(
        fromTime,
        DEFAULT_TIME_FORMAT
      );
      toTimeFormatted = DateTimeUtilService.formatDate(
        toDate,
        DEFAULT_TIME_FORMAT
      );
      searchCondition = Raw(
        (dateRange: string): string =>
          `TO_CHAR(${dateRange}, 'YYYY-MM-DD HH24:MI:SS') BETWEEN '${fromTimeFormatted}' AND '${toTimeFormatted}'`
      );
    }
    if (fromDate && toDate && fromTime && toTime) {
      searchCondition = Raw(
        (dateRange: string): string =>
          `TO_CHAR(${dateRange}, 'YYYY-MM-DD') BETWEEN '${fromDateFormatted}'
            AND '${toDateFormatted}'
            AND TO_CHAR(${dateRange}, 'HH24:MI:SS')
            BETWEEN '${fromTimeFormatted}' AND '${toTimeFormatted}'`
      );
    }

    return this.findAllWithPagination(pagination, [], {
      where: {
        requestMethod: pagination.requestMethod,
        requestUrl:
          pagination.requestUrl && ILike(`%${pagination.requestUrl}%`),
        createdAt: searchCondition,
        createdBy: pagination.userId && {
          id: Number(pagination.userId)
        }
      },
      relation: {
        createdBy: true
      },
      select: {
        createdBy: {
          id: true,
          username: true
        }
      }
    });
  }

  async saveAuditLog(
    createAuditLogDtoDto: CreateAuditLogDtoDto
  ): Promise<AuditLog> {
    return this.saveEntity(createAuditLogDtoDto);
  }
}
