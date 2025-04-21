import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { PageContent } from '../entity/page-content.entity';
import { BaseRepository } from '../../base/base-repository';
import { PageContentPaginationQueryDto } from '../dto/page-content-pagination-query.dto';
import { PaginationResponse } from '../../common/interface/response.interface';
import { IPageContentRepository } from './page-content.repository.interface';

@Injectable()
export class PageContentRepository
  extends BaseRepository<PageContent>
  implements IPageContentRepository
{
  constructor(private readonly dataSource: DataSource) {
    super(PageContent, dataSource.createEntityManager());
  }

  async findOnePageContentElseThrow(
    id: number,
    entityName: string
  ): Promise<PageContent> {
    return this.findOneByIdElseThrow(id, entityName, {
      relations: { language: true },
      select: { language: { id: true } }
    });
  }

  async findAllPageContent(
    paginateQueryDto: PageContentPaginationQueryDto
  ): Promise<PaginationResponse<PageContent> | PageContent[]> {
    const { enablePagination, pageCode, languageId } = paginateQueryDto;
    const queryOptions = {
      where: {
        pageCode,
        language: {
          id: languageId
        }
      },
      relation: { language: true },
      select: { language: { id: true, name: true } }
    };

    return enablePagination
      ? this.findAllWithPagination(paginateQueryDto, [], queryOptions)
      : this.findAll(queryOptions);
  }
}
