import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { ResponseMappingInterceptor } from '../common/interceptors/response-mapping.interceptor';
import { PaginationResponse } from '../common/interface/response.interface';
import { pageContentApiDoc } from '../common/constants/page-content.constant';
import { PageContentService } from './service/page-content.service';
import { PageContent } from './entity/page-content.entity';
import { PageContentPaginationQueryDto } from './dto/page-content-pagination-query.dto';
import {
  CreatePageContentDataDto,
  UpdatePageContentDataDto
} from './dto/page-content.dto';

@ApiBearerAuth()
@UseInterceptors(ResponseMappingInterceptor)
@ApiTags('PageContent')
@Controller('page-content')
export class PageContentController {
  constructor(private readonly pageContentService: PageContentService) {}

  @Post()
  @ApiBody({
    type: CreatePageContentDataDto,
    examples: pageContentApiDoc
  })
  savePageContent(
    @Body() createPageContentDataDto: CreatePageContentDataDto
  ): Promise<PageContent[]> {
    return this.pageContentService.savePageContent(
      createPageContentDataDto.pageContentDto
    );
  }

  @Patch()
  @ApiBody({
    type: UpdatePageContentDataDto,
    examples: pageContentApiDoc
  })
  updatePageContent(
    @Body() updatePageContentDataDto: UpdatePageContentDataDto
  ): Promise<PageContent[]> {
    return this.pageContentService.updatePageContent(
      updatePageContentDataDto.pageContentDto
    );
  }

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

  @Delete(':id')
  @HttpCode(204)
  deletePageContent(@Param('id') id: number): Promise<void> {
    return this.pageContentService.deletePageContent(id);
  }
}
