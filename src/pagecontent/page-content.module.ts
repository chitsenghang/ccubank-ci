import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LanguageService } from '../language/service/language.service';
import { LanguageRepository } from '../language/repository/language.repository';
import { PageContentService } from './service/page-content.service';
import { PageContentController } from './page-content.controller';
import { PageContentRepository } from './repository/page-content.repository';
import { PageContent } from './entity/page-content.entity';
import { SelfPageContentController } from './self-page-content.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PageContent])],
  providers: [
    PageContentService,
    PageContentRepository,
    LanguageService,
    LanguageRepository
  ],
  controllers: [PageContentController, SelfPageContentController]
})
export class PageContentModule {}
