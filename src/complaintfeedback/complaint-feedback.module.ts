import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailService } from '../otp/email/email.service';
import { ComplaintFeedbackService } from './service/complaint-feedback.service';
import { SelfComplaintFeedbackController } from './self-complaint-feedback.controller';
import { ComplainFeedbackRepository } from './repository/complain-feedback.repository';
import { ComplaintFeedback } from './entity/complaint-feedback.entity';
import { ComplaintFeedbackController } from './complaint-feedback.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ComplaintFeedback])],
  providers: [
    ComplaintFeedbackService,
    ComplainFeedbackRepository,
    EmailService
  ],
  controllers: [SelfComplaintFeedbackController, ComplaintFeedbackController]
})
export class ComplaintFeedbackModule {}
