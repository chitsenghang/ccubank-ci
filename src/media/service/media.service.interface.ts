import { Express } from 'express';
import { Media } from '../entity/media.entity';
import { CreateMediaDto } from '../dto/create-media.dto';

export interface IMediaService {
  upload(
    createMediaDto: CreateMediaDto,
    file: Express.Multer.File
  ): Promise<Media>;

  download(name: string): Promise<string>;

  findOneIfExist(documentId: number): Promise<Media>;
}
