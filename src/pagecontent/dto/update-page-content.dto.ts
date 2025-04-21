import { PartialType } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';
import { CreatePageContentDto } from './create-page-content.dto';

export class UpdatePageContentDto extends PartialType(CreatePageContentDto) {
  @IsInt()
  @Min(1)
  id: number;
}
