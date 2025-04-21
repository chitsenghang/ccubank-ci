import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../base/base-repository';
import { Language } from '../entity/language.entity';
import { CreateLanguageDto } from '../dto/create-language.dto';
import { PaginationQueryLanguageDto } from '../dto/pagination-query-language.dto';
import { PaginationResponse } from '../../common/interface/response.interface';
import { ILanguageRepository } from './language.repository.interface';

@Injectable()
export class LanguageRepository
  extends BaseRepository<Language>
  implements ILanguageRepository
{
  constructor(private readonly dataSource: DataSource) {
    super(Language, dataSource.createEntityManager());
  }

  async createLanguage(
    createLanguageDto: CreateLanguageDto
  ): Promise<Language> {
    return this.saveWithCreateEntity(createLanguageDto);
  }

  async findAllLanguages(
    pagination: PaginationQueryLanguageDto
  ): Promise<PaginationResponse<Language>> {
    return this.findAllWithPagination(pagination, []);
  }

  async findOneLanguageElseThrow(
    id: number,
    entityName: string
  ): Promise<Language> {
    return this.findOneByIdElseThrow(id, entityName);
  }

  async deleteLanguage(id: number, entityName: string): Promise<void> {
    await this.softDeleteElseThrow(id, entityName);
  }
}
