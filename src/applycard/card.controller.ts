import { Controller, Get, Param, Query, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PaginationResponse } from '../common/interface/response.interface';
import { ResponseMappingInterceptor } from '../common/interceptors/response-mapping.interceptor';
import { ApplyCardService } from './service/apply-card.service';
import { ApplyCard } from './entity/apply-card.entity';
import { ApplyCardPaginationQueryDto } from './dto/apply-card-pagination-query.dto';

@ApiBearerAuth()
@UseInterceptors(ResponseMappingInterceptor)
@ApiTags('ApplyCard')
@Controller('apply-card')
export class ApplyCardController {
  constructor(private readonly applyCardService: ApplyCardService) {}

  @Get(':id')
  findOneApplyCard(@Param('id') id: number): Promise<ApplyCard> {
    return this.applyCardService.findOneApplyCard(id);
  }

  @Get()
  findAllApplyCard(
    @Query() applyCardPaginationQueryDto: ApplyCardPaginationQueryDto
  ): Promise<PaginationResponse<ApplyCard>> {
    return this.applyCardService.findAllApplyCard(applyCardPaginationQueryDto);
  }
}
