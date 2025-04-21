import { CreateLanguageDto } from '../dto/create-language.dto';
import { Language } from '../entity/language.entity';
import { PaginationResponse } from '../../common/interface/response.interface';
import { PaginationQueryLanguageDto } from '../dto/pagination-query-language.dto';

export interface ILanguageRepository {
  createLanguage(createLanguageDto: CreateLanguageDto): Promise<Language>;

  findOneLanguageElseThrow(id: number, entityName: string): Promise<Language>;

  findAllLanguages(
    pagination: PaginationQueryLanguageDto
  ): Promise<PaginationResponse<Language>>;

  deleteLanguage(id: number, entityName: string): Promise<void>;
}
