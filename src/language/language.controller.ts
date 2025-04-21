import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { PaginationResponse } from '../common/interface/response.interface';
import { ResponseMappingInterceptor } from '../common/interceptors/response-mapping.interceptor';
import { LanguageService } from './service/language.service';
import { CreateLanguageDto } from './dto/create-language.dto';
import { Language } from './entity/language.entity';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { PaginationQueryLanguageDto } from './dto/pagination-query-language.dto';

@ApiBearerAuth()
@UseInterceptors(ResponseMappingInterceptor)
@Controller('language')
export class LanguageController {
  constructor(private readonly languageService: LanguageService) {}

  @Post()
  createLanguage(
    @Body() createLanguageDto: CreateLanguageDto
  ): Promise<Language> {
    return this.languageService.createLanguage(createLanguageDto);
  }

  @Get(':id')
  findOneLanguage(@Param('id') id: number): Promise<Language> {
    return this.languageService.findOneLanguageElseThrow(id);
  }

  @Patch(':id')
  updateLanguage(
    @Param('id') id: number,
    @Body() updateLanguageDto: UpdateLanguageDto
  ): Promise<Language> {
    return this.languageService.updateLanguage(id, updateLanguageDto);
  }

  @Get()
  findAllLanguages(
    @Query() pagination: PaginationQueryLanguageDto
  ): Promise<PaginationResponse<Language>> {
    return this.languageService.findAllLanguages(pagination);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteLanguage(@Param('id') id: number): Promise<void> {
    return this.languageService.deleteLanguage(id);
  }
}
