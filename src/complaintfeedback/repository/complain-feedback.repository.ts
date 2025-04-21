import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../base/base-repository';
import { ComplaintFeedback } from '../entity/complaint-feedback.entity';
import { CreateComplaintFeedbackDto } from '../dto/create-complaint-feedback.dto';
import { ComplaintFeedbackPaginationQueryDto } from '../dto/complaint-feedback-pagination-query.dto';
import { PaginationResponse } from '../../common/interface/response.interface';
import { IComplainFeedbackRepository } from './complain-feedback.repository.interface';

@Injectable()
export class ComplainFeedbackRepository
  extends BaseRepository<ComplaintFeedback>
  implements IComplainFeedbackRepository
{
  constructor(private readonly dataSource: DataSource) {
    super(ComplaintFeedback, dataSource.createEntityManager());
  }

  async saveComplaintFeedback(
    createComplaintFeedbackDto: CreateComplaintFeedbackDto
  ): Promise<ComplaintFeedback> {
    return this.saveWithCreateEntity(createComplaintFeedbackDto);
  }

  async findAllComplaintFeedback(
    paginationQueryDto: ComplaintFeedbackPaginationQueryDto
  ): Promise<PaginationResponse<ComplaintFeedback>> {
    const { type } = paginationQueryDto;
    return this.findAllWithPagination(paginationQueryDto, [], {
      where: {
        type
      }
    });
  }

  async findOneComplaintFeedbackElseThrow(
    id: number,
    entityName: string
  ): Promise<ComplaintFeedback> {
    return this.findOneByIdElseThrow(id, entityName);
  }

  async deleteComplaintFeedback(id: number, entityName: string): Promise<void> {
    return this.deleteElseThrow(id, entityName);
  }
}
