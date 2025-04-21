import { Injectable } from '@nestjs/common';
import { DataSource, DeleteResult } from 'typeorm';
import { BaseRepository } from '../../base/base-repository';
import { Media } from '../entity/media.entity';
import { IMediaRepository } from './media.repository.interface';

@Injectable()
export class MediaRepository
  extends BaseRepository<Media>
  implements IMediaRepository
{
  private readonly DOCUMENT: string = 'Document';

  constructor(private readonly dataSource: DataSource) {
    super(Media, dataSource.createEntityManager());
  }

  async deleteMediaByDocumentIds(documentIds: number[]): Promise<DeleteResult> {
    return await this.delete(documentIds);
  }

  async findOneIfExist(documentId: number): Promise<Media> {
    return this.findOneByIdElseThrow(documentId, this.DOCUMENT);
  }
}
