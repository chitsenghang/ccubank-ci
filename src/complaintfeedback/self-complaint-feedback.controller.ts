import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ResponseMappingInterceptor } from '../common/interceptors/response-mapping.interceptor';
import { ComplaintFeedbackService } from './service/complaint-feedback.service';
import { CreateComplaintFeedbackDto } from './dto/create-complaint-feedback.dto';
import { ComplaintFeedback } from './entity/complaint-feedback.entity';

@UseInterceptors(ResponseMappingInterceptor)
@ApiTags('ComplaintFeedback')
@Controller('self/complaint-feedback')
export class SelfComplaintFeedbackController {
  constructor(
    private readonly complaintFeedbackService: ComplaintFeedbackService
  ) {}

  @Post()
  saveComplaintFeedback(
    @Body() createComplaintFeedbackDto: CreateComplaintFeedbackDto
  ): Promise<ComplaintFeedback> {
    return this.complaintFeedbackService.saveComplaintFeedback(
      createComplaintFeedbackDto
    );
  }
}
