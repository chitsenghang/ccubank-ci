import { Controller, Get, Param, Query, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ResponseMappingInterceptor } from '../common/interceptors/response-mapping.interceptor';
import { PaginationResponse } from '../common/interface/response.interface';
import { ComplaintFeedbackService } from './service/complaint-feedback.service';
import { ComplaintFeedback } from './entity/complaint-feedback.entity';
import { ComplaintFeedbackPaginationQueryDto } from './dto/complaint-feedback-pagination-query.dto';

@ApiBearerAuth()
@UseInterceptors(ResponseMappingInterceptor)
@ApiTags('ComplaintFeedback')
@Controller('complaint-feedback')
export class ComplaintFeedbackController {
  constructor(
    private readonly complaintFeedbackService: ComplaintFeedbackService
  ) {}

  @Get(':id')
  findOneComplaintFeedback(
    @Param('id') id: number
  ): Promise<ComplaintFeedback> {
    return this.complaintFeedbackService.findOneComplaintFeedbackElseThrow(id);
  }

  @Get()
  findAllComplaintFeedback(
    @Query() paginationQueryDto: ComplaintFeedbackPaginationQueryDto
  ): Promise<PaginationResponse<ComplaintFeedback>> {
    return this.complaintFeedbackService.findAllComplaintFeedback(
      paginationQueryDto
    );
  }
}
