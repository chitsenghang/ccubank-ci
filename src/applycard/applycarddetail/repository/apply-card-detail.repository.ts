import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from '../../../base/base-repository';
import { ApplyCardDetail } from '../entity/apply-card-detail.entity';
import { IApplyCardDetail } from './apply-card-detail.repository.interface';

@Injectable()
export class ApplyCardDetailRepository
  extends BaseRepository<ApplyCardDetail>
  implements IApplyCardDetail
{
  constructor(private readonly dataSource: DataSource) {
    super(ApplyCardDetail, dataSource.createEntityManager());
  }

  async saveAllApplyCardDetail(
    applyCardDetails: ApplyCardDetail[]
  ): Promise<ApplyCardDetail[]> {
    return this.saveAllWithCreateEntity(applyCardDetails);
  }
}
