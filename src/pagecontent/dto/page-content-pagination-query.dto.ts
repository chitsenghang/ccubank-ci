import { ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import {
  BasePaginationQueryDto,
  BasePaginationQueryProps
} from '../../common/dto/base-pagination-query.dto';
import { PageContentTypeEnum } from '../../common/enums/page-content-type.enum';
import { toBoolean } from '../../common/utils/case-transform.util';

export class PageContentPaginationQueryDto extends OmitType(
  BasePaginationQueryDto,
  [BasePaginationQueryProps.ORDER_BY] as const
) {
  @ApiPropertyOptional({
    example: 'ordering:asc'
  })
  @IsOptional()
  orderBy: string;

  @ApiPropertyOptional()
  @IsOptional()
  pageCode?: PageContentTypeEnum;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }): boolean => toBoolean(value))
  enablePagination?: boolean = true;

  @ApiPropertyOptional()
  @IsOptional()
  languageId?: number;
}
