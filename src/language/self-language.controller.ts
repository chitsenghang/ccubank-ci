import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PaginationResponse } from '../common/interface/response.interface';
import { ResponseMappingInterceptor } from '../common/interceptors/response-mapping.interceptor';
import { LanguageService } from './service/language.service';
import { Language } from './entity/language.entity';
import { PaginationQueryLanguageDto } from './dto/pagination-query-language.dto';

@UseInterceptors(ResponseMappingInterceptor)
@ApiTags('Language')
@Controller('self/language')
export class SelfLanguageController {
  constructor(private readonly languageService: LanguageService) {}

  @Get()
  findAllLanguages(
    @Query() pagination: PaginationQueryLanguageDto
  ): Promise<PaginationResponse<Language>> {
    return this.languageService.findAllLanguages(pagination);
  }
}
