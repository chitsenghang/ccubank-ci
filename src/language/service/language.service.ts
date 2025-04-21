import { Injectable } from '@nestjs/common';
import { CreateLanguageDto } from '../dto/create-language.dto';
import { Language } from '../entity/language.entity';
import { PaginationQueryLanguageDto } from '../dto/pagination-query-language.dto';
import { PaginationResponse } from '../../common/interface/response.interface';
import { UpdateLanguageDto } from '../dto/update-language.dto';
import { LanguageRepository } from '../repository/language.repository';
import { ILanguageService } from './language.service.interface';

@Injectable()
export class LanguageService implements ILanguageService {
  private readonly ENTITY_NAME: string = 'language';

  constructor(private readonly languageRepository: LanguageRepository) {}

  async createLanguage(
    createLanguageDto: CreateLanguageDto
  ): Promise<Language> {
    return this.languageRepository.createLanguage(createLanguageDto);
  }

  async findAllLanguages(
    pagination: PaginationQueryLanguageDto
  ): Promise<PaginationResponse<Language>> {
    return this.languageRepository.findAllLanguages(pagination);
  }

  async findOneLanguageElseThrow(id: number): Promise<Language> {
    return this.languageRepository.findOneLanguageElseThrow(
      id,
      this.ENTITY_NAME
    );
  }

  async updateLanguage(
    id: number,
    updateLanguageDto: UpdateLanguageDto
  ): Promise<Language> {
    const language: Language = await this.findOneLanguageElseThrow(id);
    const updatedLanguage: Language & UpdateLanguageDto = Object.assign(
      language,
      updateLanguageDto
    );
    return this.languageRepository.saveWithCreateEntity(updatedLanguage);
  }

  async deleteLanguage(id: number): Promise<void> {
    await this.languageRepository.deleteLanguage(id, this.ENTITY_NAME);
  }
}
