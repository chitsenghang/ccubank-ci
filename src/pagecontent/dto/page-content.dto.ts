import { IsArray, Validate, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ValidateDuplicateIdInPageContent } from '../validators/page-content.validation';
import { CreatePageContentDto } from './create-page-content.dto';
import { UpdatePageContentDto } from './update-page-content.dto';

export class CreatePageContentDataDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePageContentDto)
  pageContentDto: CreatePageContentDto[];
}

export class UpdatePageContentDataDto {
  @Validate(ValidateDuplicateIdInPageContent)
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdatePageContentDto)
  pageContentDto: UpdatePageContentDto[];
}
