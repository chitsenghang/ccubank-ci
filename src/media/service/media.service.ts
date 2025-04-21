import { join } from 'path';
import * as fsPromise from 'fs/promises';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Express } from 'express';
import { CreateMediaDto } from '../dto/create-media.dto';
import { Media } from '../entity/media.entity';
import { MediaValidation } from '../validators/media.validation';
import { FileExtensionValidationPipe } from '../validators/file-extension.validation';
import { MediaRepository } from '../repository/media.repository';
import { IMediaFile } from '../../common/interface/media-file.interafce';
import { basePath } from '../../common/constants/media/base-path';
import { ResourceNotFoundException } from '../../common/exceptions';
import {
  ALLOW_DOCUMENT_EXTENSIONS,
  ALLOW_IMAGE_EXTENSIONS
} from '../../common/constants/media/regex.constant';
import { IMediaService } from './media.service.interface';

@Injectable()
export class MediaService implements IMediaService {
  private readonly MEDIA: string = 'media';

  constructor(
    private readonly mediaRepository: MediaRepository,
    private readonly mediaValidation: MediaValidation,
    private readonly fileExtensionValidationPipe: FileExtensionValidationPipe
  ) {}

  static validateAndDetermineStoragePath(extension: string): string {
    if (ALLOW_IMAGE_EXTENSIONS.test(extension)) {
      return 'public/images/';
    } else if (ALLOW_DOCUMENT_EXTENSIONS.test(extension)) {
      return 'public/documents/';
    } else {
      throw new Error(`Unsupported file type: ${extension}`);
    }
  }

  async upload(
    createMediaDto: CreateMediaDto,
    file: Express.Multer.File
  ): Promise<Media> {
    this.mediaValidation.validationFileNotFound(file);
    this.mediaValidation.validateFileSize(file.size);

    await this.fileExtensionValidationPipe.transform(file.originalname);
    const extension: string = file.originalname.split('.').pop();
    const fileName: string = this.createFileName();
    const mediaFile: IMediaFile = {
      name: this.createNewFileNameWithExtension(fileName, file.originalname),
      buffer: file.buffer,
      size: file.size,
      originalName: file.originalname
    };
    const storageDir: string =
      MediaService.validateAndDetermineStoragePath(extension);
    const filePath: string = `${storageDir}${fileName}.${extension}`;
    const createMedia: Media = this.mediaRepository.create({
      entityId: createMediaDto.entityId
        ? Number(createMediaDto.entityId)
        : null,
      entityType: createMediaDto.entityType ? createMediaDto.entityType : null,
      name: fileName + '.' + extension,
      size: file.size,
      mimeType: file.mimetype,
      filename: file.originalname
    });
    await fsPromise.mkdir(storageDir, { recursive: true });
    await fsPromise.writeFile(filePath, mediaFile.buffer, 'binary');
    return this.mediaRepository.saveWithCreateEntity(createMedia);
  }

  async download(name: string): Promise<string> {
    const mediaFile: Media = await this.mediaRepository.findOne({
      where: { name }
    });
    if (!mediaFile) {
      throw new ResourceNotFoundException(this.MEDIA, name);
    }
    const path: string = join(basePath, 'documents', name);
    const fileContent: string = await fsPromise.readFile(path, 'base64');
    return `data:${mediaFile.mimeType};base64${fileContent}`;
  }

  async findOneIfExist(documentId: number): Promise<Media> {
    return this.mediaRepository.findOneIfExist(documentId);
  }

  private createFileName(): string {
    return uuidv4();
  }

  private createNewFileNameWithExtension(
    filename: string,
    originalName: string
  ): string {
    const filenameArray: string[] = originalName.split('.');
    const extension: string = filenameArray.pop();
    return `${filename + '.' + extension}`;
  }
}
