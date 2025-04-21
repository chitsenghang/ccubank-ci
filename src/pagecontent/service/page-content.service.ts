import { Injectable } from '@nestjs/common';
import { PageContentRepository } from '../repository/page-content.repository';
import { PaginationResponse } from '../../common/interface/response.interface';
import { PageContent } from '../entity/page-content.entity';
import { CreatePageContentDto } from '../dto/create-page-content.dto';
import { LanguageService } from '../../language/service/language.service';
import { Language } from '../../language/entity/language.entity';
import { UpdatePageContentDto } from '../dto/update-page-content.dto';
import { PageContentPaginationQueryDto } from '../dto/page-content-pagination-query.dto';
import { IPageContentService } from './page-content.service.interface';

@Injectable()
export class PageContentService implements IPageContentService {
  private readonly PAGE_CONTENT: string = 'page content';

  constructor(
    private readonly pageContentRepository: PageContentRepository,
    private readonly languageService: LanguageService
  ) {}

  async savePageContent(
    createPageContentDto: CreatePageContentDto[]
  ): Promise<PageContent[]> {
    const pageContentsToCreate = await Promise.all(
      createPageContentDto.map(async (createDto) => {
        const { languageId } = createDto;
        const language: Language =
          await this.languageService.findOneLanguageElseThrow(languageId);

        return {
          ...createDto,
          language
        };
      })
    );

    return this.pageContentRepository.saveAllWithCreateEntity(
      pageContentsToCreate
    );
  }

  async updatePageContent(
    updatePageContentDto: UpdatePageContentDto[]
  ): Promise<PageContent[]> {
    const pageContentsToUpdate: PageContent[] = await Promise.all(
      updatePageContentDto.map(async (updateDto) => {
        const { id, languageId, ...updateData } = updateDto;
        const language: Language =
          await this.languageService.findOneLanguageElseThrow(languageId);
        const pageContent: PageContent =
          await this.findOnePageContentElseThrow(id);

        return {
          ...pageContent,
          ...updateData,
          language
        };
      })
    );

    return this.pageContentRepository.saveAllWithCreateEntity(
      pageContentsToUpdate
    );
  }

  async findAllPageContent(
    paginateQueryDto: PageContentPaginationQueryDto
  ): Promise<PaginationResponse<PageContent> | PageContent[]> {
    return this.pageContentRepository.findAllPageContent(paginateQueryDto);
  }

  async findOnePageContentElseThrow(id: number): Promise<PageContent> {
    return this.pageContentRepository.findOnePageContentElseThrow(
      id,
      this.PAGE_CONTENT
    );
  }

  async deletePageContent(id: number): Promise<void> {
    await this.pageContentRepository.deleteElseThrow(id, this.PAGE_CONTENT);
  }
}
