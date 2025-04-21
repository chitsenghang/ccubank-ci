import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaService } from './service/media.service';
import { MediaController } from './media.controller';
import { Media } from './entity/media.entity';
import { MediaRepository } from './repository/media.repository';
import { MediaValidation } from './validators/media.validation';
import { FileExtensionValidationPipe } from './validators/file-extension.validation';

@Module({
  imports: [TypeOrmModule.forFeature([Media])],
  providers: [
    MediaService,
    MediaRepository,
    MediaValidation,
    FileExtensionValidationPipe
  ],
  controllers: [MediaController]
})
export class MediaModule {}
