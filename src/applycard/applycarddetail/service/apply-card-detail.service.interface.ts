import { ApplyCardDetail } from '../entity/apply-card-detail.entity';
import { CreateApplyCardDetailDto } from '../dto/create-apply-card-detail.dto';

export interface IApplyCardDetailService {
  createApplyCardDetail(
    createApplyCardDetailDto: CreateApplyCardDetailDto
  ): ApplyCardDetail;

  saveAllApplyCardDetail(
    applyCardDetails: ApplyCardDetail[]
  ): Promise<ApplyCardDetail[]>;
}
