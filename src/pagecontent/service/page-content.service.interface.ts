import { CreatePageContentDto } from '../dto/create-page-content.dto';
import { PageContent } from '../entity/page-content.entity';
import { PaginationResponse } from '../../common/interface/response.interface';
import { UpdatePageContentDto } from '../dto/update-page-content.dto';
import { PageContentPaginationQueryDto } from '../dto/page-content-pagination-query.dto';

export interface IPageContentService {
  savePageContent(
    createPageContentDto: CreatePageContentDto[]
  ): Promise<PageContent[]>;

  updatePageContent(
    updatePageContentDto: UpdatePageContentDto[]
  ): Promise<PageContent[]>;

  findOnePageContentElseThrow(
    id: number,
    entityName: string
  ): Promise<PageContent>;

  findAllPageContent(
    paginateQueryDto: PageContentPaginationQueryDto
  ): Promise<PaginationResponse<PageContent> | PageContent[]>;

  deletePageContent(id: number): Promise<void>;
}
