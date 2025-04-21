import { ApplyCardDetail } from '../entity/apply-card-detail.entity';

export interface IApplyCardDetail {
  saveAllApplyCardDetail(
    applyCardDetails: ApplyCardDetail[]
  ): Promise<ApplyCardDetail[]>;
}
