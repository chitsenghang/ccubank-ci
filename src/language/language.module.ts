import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LanguageService } from './service/language.service';
import { LanguageController } from './language.controller';
import { Language } from './entity/language.entity';
import { LanguageRepository } from './repository/language.repository';
import { SelfLanguageController } from './self-language.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Language])],
  providers: [LanguageService, LanguageRepository],
  controllers: [LanguageController, SelfLanguageController]
})
export class LanguageModule {}
