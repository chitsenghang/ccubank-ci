import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsIn,
  IsOptional,
  IsPositive,
  IsString
} from 'class-validator';
import { AUDIT_BASE_ORDER_BY_OPTIONS } from '../constants/audit-base-orderby.constants';
import { ExportDataTypeEnum } from '../export-file/common/enum/export.enum';
import { PAGINATION_ORDER_DIRECTION } from '../enums/pagination-order-direction.enum';

export class BasePaginationQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  limit?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  offset?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  keywords?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsIn(AUDIT_BASE_ORDER_BY_OPTIONS)
  orderBy: any;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(PAGINATION_ORDER_DIRECTION)
  orderDirection?: PAGINATION_ORDER_DIRECTION;

  @ApiPropertyOptional({ enum: ExportDataTypeEnum })
  @IsOptional()
  @IsEnum(ExportDataTypeEnum)
  exportFileType?: ExportDataTypeEnum;
}

export enum BasePaginationQueryProps {
  LIMIT = 'limit',
  OFFSET = 'offset',
  KEYWORDS = 'keywords',
  ORDER_BY = 'orderBy',
  ORDER_DIRECTION = 'orderDirection',
  EXPORT_FILE_TYPE = 'exportFileType'
}
