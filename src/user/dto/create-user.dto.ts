import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Validate
} from 'class-validator';
import { PhoneValidator } from '../../common/utils/custom-validate-phone-number';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  @Validate(PhoneValidator)
  @IsPhoneNumber('KH')
  phone: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsOptional()
  @IsArray()
  roleIds?: number[];

  @IsBoolean()
  @IsOptional()
  resetPassword: boolean;

  @IsBoolean()
  isSelfService?: boolean;
}
