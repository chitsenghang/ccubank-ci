import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateLanguageDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  nameTranslation: string;

  @IsOptional()
  @IsString()
  logo: string;
}
