import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsNumber,
  IsString,
  MaxLength
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Express } from 'express';
import { Transform, Type } from 'class-transformer';
import {
  toBoolean,
  ToNumberArray
} from '../../common/utils/case-transform.util';

export class CreateApplyCardDto {
  @ApiPropertyOptional()
  @IsString()
  @MaxLength(100)
  fullName: string;

  @ApiPropertyOptional()
  @IsNumber()
  @Type(() => Number)
  requestCreditAmount: number;

  @ApiPropertyOptional()
  @IsString()
  @MaxLength(100)
  phoneNumber: string;

  @ApiPropertyOptional()
  @IsEmail()
  emailAddress: string;

  @ApiPropertyOptional()
  @IsBoolean()
  @Transform(({ value }): boolean => toBoolean(value))
  alreadyHaveAccount: boolean = true;

  @ApiPropertyOptional()
  @IsString()
  companyName: string;

  @ApiPropertyOptional()
  @IsString()
  occupation: string;

  @ApiPropertyOptional()
  @IsString()
  industryBusinessNature: string;

  @ApiPropertyOptional()
  @IsString()
  enterAccountLinkWithCard: string;

  @ApiPropertyOptional()
  @IsNumber()
  @Type(() => Number)
  incomeMonthly: number;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: false
  })
  file: Express.Multer.File;

  @ApiPropertyOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  @ToNumberArray()
  cardIds: number[];
}
