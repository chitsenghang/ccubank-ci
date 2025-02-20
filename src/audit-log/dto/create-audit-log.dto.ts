import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { User } from '../../user/entity/user.entity';

export class CreateAuditLogDtoDto {
  @IsString()
  @IsNotEmpty()
  requestMethod: string;

  @IsString()
  @IsNotEmpty()
  requestUrl: string;

  @IsString()
  @IsOptional()
  requestJson?: string;

  @IsString()
  @IsNotEmpty()
  ipAddress: string;

  @IsNumber()
  @IsOptional()
  resourceId?: number;

  @IsNumber()
  @IsOptional()
  createdBy?: User;
}
