import { IsIn, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Express } from 'express';
import { MediaEntityTypeEnum } from '../../common/enums/media-entity-type.enum';

export class CreateMediaDto {
  @IsOptional()
  @IsString()
  entityId: number;

  @IsOptional()
  @IsIn(Object.keys(MediaEntityTypeEnum))
  entityType: MediaEntityTypeEnum;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: true
  })
  file: Express.Multer.File;
}
