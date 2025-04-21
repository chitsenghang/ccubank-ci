import { Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ComplaintFeedbackPaginationQueryDto } from '../dto/complaint-feedback-pagination-query.dto';
import { PaginationResponse } from '../../common/interface/response.interface';
import { ComplaintFeedback } from '../entity/complaint-feedback.entity';
import { CreateComplaintFeedbackDto } from '../dto/create-complaint-feedback.dto';
import { ComplainFeedbackRepository } from '../repository/complain-feedback.repository';
import { EmailService } from '../../otp/email/email.service';
import { Transactional } from '../../common/decorators/transactional.decorator';
import { ModuleTypeEnum } from '../../otp/enum/module-type';
import { IComplainFeedbackService } from './complaint-feedback.service.interface';

@Injectable()
export class ComplaintFeedbackService implements IComplainFeedbackService {
  private readonly COMPLAINT_FEEDBACK: string = 'complaint feedback';

  constructor(
    private readonly dataSource: DataSource,
    private readonly complainFeedbackRepository: ComplainFeedbackRepository,
    private readonly emailService: EmailService
  ) {}

  @Transactional()
  async saveComplaintFeedback(
    createComplaintFeedbackDto: CreateComplaintFeedbackDto
  ): Promise<ComplaintFeedback> {
    const complaintFeedback: ComplaintFeedback =
      await this.complainFeedbackRepository.saveComplaintFeedback(
        createComplaintFeedbackDto
      );

    this.emailService
      .sendEmailByModule(complaintFeedback, ModuleTypeEnum.COMPLAINT_FEEDBACK)
      .catch((error): void => {
        Logger.error(`Failed to send email:`, error);
      });

    return complaintFeedback;
  }

  async findAllComplaintFeedback(
    paginationQueryDto: ComplaintFeedbackPaginationQueryDto
  ): Promise<PaginationResponse<ComplaintFeedback>> {
    return this.complainFeedbackRepository.findAllComplaintFeedback(
      paginationQueryDto
    );
  }

  async findOneComplaintFeedbackElseThrow(
    id: number
  ): Promise<ComplaintFeedback> {
    return this.complainFeedbackRepository.findOneComplaintFeedbackElseThrow(
      id,
      this.COMPLAINT_FEEDBACK
    );
  }

  async deleteComplaintFeedback(id: number): Promise<void> {
    return this.complainFeedbackRepository.deleteComplaintFeedback(
      id,
      this.COMPLAINT_FEEDBACK
    );
  }
}
