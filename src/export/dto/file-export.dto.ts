import { PassThrough } from 'stream';
import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { FileExportTypeEnum } from '../enum/file-export-type.enum';

export type FileExportResult = {
  stream: PassThrough;
  fileName: string;
};

export class FileExportDto<T = any> {
  @ApiProperty({ enum: FileExportTypeEnum, example: 'xlsx' })
  @IsEnum(FileExportTypeEnum)
  format: FileExportTypeEnum;

  @ApiProperty({ example: 'Language', required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ type: 'array', items: { type: 'object' } })
  @IsArray()
  data: T[];
}
