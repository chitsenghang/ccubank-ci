import { PaginationResponse } from '../../common/interface/response.interface';
import { ComplaintFeedback } from '../entity/complaint-feedback.entity';
import { CreateComplaintFeedbackDto } from '../dto/create-complaint-feedback.dto';
import { ComplaintFeedbackPaginationQueryDto } from '../dto/complaint-feedback-pagination-query.dto';

export interface IComplainFeedbackRepository {
  saveComplaintFeedback(
    createComplaintFeedbackDto: CreateComplaintFeedbackDto
  ): Promise<ComplaintFeedback>;

  findOneComplaintFeedbackElseThrow(
    id: number,
    entityName: string
  ): Promise<ComplaintFeedback>;

  findAllComplaintFeedback(
    paginationQueryDto: ComplaintFeedbackPaginationQueryDto
  ): Promise<PaginationResponse<ComplaintFeedback>>;

  deleteComplaintFeedback(id: number, entityName: string): Promise<void>;
}
