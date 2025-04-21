import { PageContent } from '../entity/page-content.entity';
import { PageContentPaginationQueryDto } from '../dto/page-content-pagination-query.dto';
import { PaginationResponse } from '../../common/interface/response.interface';

export interface IPageContentRepository {
  findOnePageContentElseThrow(
    id: number,
    entityName: string
  ): Promise<PageContent>;

  findAllPageContent(
    paginateQueryDto: PageContentPaginationQueryDto
  ): Promise<PaginationResponse<PageContent> | PageContent[]>;
}
