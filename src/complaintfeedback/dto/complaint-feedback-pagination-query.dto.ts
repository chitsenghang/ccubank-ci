import { ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import {
  BasePaginationQueryDto,
  BasePaginationQueryProps
} from '../../common/dto/base-pagination-query.dto';
import { ComplaintFeedbackTypeEnum } from '../enums/complaint-feedback-type.enum';

export class ComplaintFeedbackPaginationQueryDto extends OmitType(
  BasePaginationQueryDto,
  [BasePaginationQueryProps.ORDER_BY] as const
) {
  @ApiPropertyOptional()
  @IsOptional()
  orderBy: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(ComplaintFeedbackTypeEnum)
  type: ComplaintFeedbackTypeEnum;
}
