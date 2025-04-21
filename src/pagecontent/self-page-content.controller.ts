import { Controller, Get, Param, Query, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ResponseMappingInterceptor } from '../common/interceptors/response-mapping.interceptor';
import { PaginationResponse } from '../common/interface/response.interface';
import { PageContentPaginationQueryDto } from './dto/page-content-pagination-query.dto';
import { PageContent } from './entity/page-content.entity';
import { PageContentService } from './service/page-content.service';

@UseInterceptors(ResponseMappingInterceptor)
@ApiTags('PageContent')
@Controller('self/page-content')
export class SelfPageContentController {
  constructor(private readonly pageContentService: PageContentService) {}

  @Get()
  findAllPageContent(
    @Query() paginateQueryDto: PageContentPaginationQueryDto
  ): Promise<PaginationResponse<PageContent> | PageContent[]> {
    return this.pageContentService.findAllPageContent(paginateQueryDto);
  }

  @Get(':id')
  findOnePageContent(@Param('id') id: number): Promise<PageContent> {
    return this.pageContentService.findOnePageContentElseThrow(id);
  }
}
