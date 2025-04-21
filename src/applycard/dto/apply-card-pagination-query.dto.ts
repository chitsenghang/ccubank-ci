import { ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import {
  BasePaginationQueryDto,
  BasePaginationQueryProps
} from '../../common/dto/base-pagination-query.dto';

export class ApplyCardPaginationQueryDto extends OmitType(
  BasePaginationQueryDto,
  [BasePaginationQueryProps.ORDER_BY] as const
) {
  @ApiPropertyOptional()
  @IsOptional()
  orderBy: string;
}
