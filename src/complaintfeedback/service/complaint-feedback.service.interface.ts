import { CreateComplaintFeedbackDto } from '../dto/create-complaint-feedback.dto';
import { ComplaintFeedback } from '../entity/complaint-feedback.entity';
import { ComplaintFeedbackPaginationQueryDto } from '../dto/complaint-feedback-pagination-query.dto';
import { PaginationResponse } from '../../common/interface/response.interface';

export interface IComplainFeedbackService {
  saveComplaintFeedback(
    createComplaintFeedbackDto: CreateComplaintFeedbackDto
  ): Promise<ComplaintFeedback>;

  findOneComplaintFeedbackElseThrow(id: number): Promise<ComplaintFeedback>;

  findAllComplaintFeedback(
    paginationQueryDto: ComplaintFeedbackPaginationQueryDto
  ): Promise<PaginationResponse<ComplaintFeedback>>;

  deleteComplaintFeedback(id: number): Promise<void>;
}
