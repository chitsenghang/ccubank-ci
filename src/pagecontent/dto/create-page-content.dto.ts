import { IsNotEmpty, IsObject, ValidateNested } from 'class-validator';
import { Type, TypeHelpOptions } from 'class-transformer';
import { contentDtoMap } from '../../common/constants/page-content.constant';
import { BasePageContentDto } from './base-page-content.dto';

export class CreatePageContentDto extends BasePageContentDto {
  @IsObject()
  @IsNotEmpty()
  @ValidateNested()
  @Type(
    (options: TypeHelpOptions) =>
      contentDtoMap[options.object.pageCode] || BasePageContentDto
  )
  content: BasePageContentDto;
}
