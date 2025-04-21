import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested
} from 'class-validator';
import { Type } from 'class-transformer';

class OfficeDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsOptional()
  @IsString()
  mapURL?: string;
}

class SocialMediaDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  logo: string;

  @IsNotEmpty()
  @IsString()
  link: string;
}

class ContactInfoDto {
  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  email: string;
}
export class CompanyInformationDto {
  @IsArray()
  @ValidateNested()
  @Type(() => OfficeDto)
  offices: OfficeDto[];

  @IsArray()
  @ValidateNested()
  @Type(() => SocialMediaDto)
  socialMedias: SocialMediaDto[];

  @ValidateNested()
  @Type(() => ContactInfoDto)
  contactInfo: ContactInfoDto;

  @IsNotEmpty()
  @IsString()
  scanHere: string;

  @IsNotEmpty()
  @IsString()
  logoBigSize: string;

  @IsNotEmpty()
  @IsString()
  logoSmallSize: string;
}
