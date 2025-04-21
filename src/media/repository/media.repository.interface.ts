import { DeleteResult } from 'typeorm';
import { Media } from '../entity/media.entity';

export interface IMediaRepository {
  findOneIfExist(documentId: number): Promise<Media>;

  deleteMediaByDocumentIds(documentIds: number[]): Promise<DeleteResult>;
}
