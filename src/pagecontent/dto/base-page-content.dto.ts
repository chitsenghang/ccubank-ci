import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength
} from 'class-validator';
import { PageContentTypeEnum } from '../../common/enums/page-content-type.enum';

export class BasePageContentDto {
  @IsNotEmpty()
  @IsEnum(PageContentTypeEnum)
  @MaxLength(100)
  pageCode: PageContentTypeEnum;

  @IsNotEmpty()
  languageId: number;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  componentId?: number;

  @IsOptional()
  ordering?: number;
}
