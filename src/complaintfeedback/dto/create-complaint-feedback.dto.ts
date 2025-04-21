import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Length,
  Validate
} from 'class-validator';
import { Optional } from '@nestjs/common';
import { ComplaintFeedbackTypeEnum } from '../enums/complaint-feedback-type.enum';
import { TimeOurTeamContactEnum } from '../enums/time-our-team-contact.enum';
import { PhoneValidator } from '../../common/utils/custom-validate-phone-number';

export class CreateComplaintFeedbackDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  fullName: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  @Validate(PhoneValidator)
  phoneNumber: string;

  @IsNotEmpty()
  @IsEnum(ComplaintFeedbackTypeEnum)
  type: ComplaintFeedbackTypeEnum;

  @IsNotEmpty()
  @Length(1, 100)
  @IsEmail()
  emailAddress: string;

  @IsNotEmpty()
  @IsBoolean()
  isCcuBankCustomer: boolean;

  @IsNotEmpty()
  @Length(1, 100)
  @IsEnum(TimeOurTeamContactEnum)
  timeOurTeamContact: TimeOurTeamContactEnum;

  @Optional()
  @IsString()
  detail?: string;
}
