import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { FormatType } from '../common/enum/export.enum';

export class ColumnDefinitionDto {
  @IsNotEmpty()
  @IsString()
  header: string;

  @IsNotEmpty()
  @IsString()
  key: string;

  @IsString()
  @IsEnum(FormatType)
  formatType?: FormatType;
}
