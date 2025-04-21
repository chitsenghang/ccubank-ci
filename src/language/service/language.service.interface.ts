import { CreateLanguageDto } from '../dto/create-language.dto';
import { Language } from '../entity/language.entity';
import { PaginationQueryLanguageDto } from '../dto/pagination-query-language.dto';
import { PaginationResponse } from '../../common/interface/response.interface';
import { UpdateLanguageDto } from '../dto/update-language.dto';

export interface ILanguageService {
  createLanguage(createLanguageDto: CreateLanguageDto): Promise<Language>;

  findOneLanguageElseThrow(id: number): Promise<Language>;

  updateLanguage(
    id: number,
    updateLanguageDto: UpdateLanguageDto
  ): Promise<Language>;

  findAllLanguages(
    pagination: PaginationQueryLanguageDto
  ): Promise<PaginationResponse<Language>>;

  deleteLanguage(id: number): Promise<void>;
}
