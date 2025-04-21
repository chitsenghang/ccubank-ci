import { Injectable } from '@nestjs/common';
import { ApplyCardDetail } from '../entity/apply-card-detail.entity';
import { ApplyCardDetailRepository } from '../repository/apply-card-detail.repository';
import { CreateApplyCardDetailDto } from '../dto/create-apply-card-detail.dto';
import { IApplyCardDetailService } from './apply-card-detail.service.interface';

@Injectable()
export class ApplyCardDetailService implements IApplyCardDetailService {
  constructor(
    private readonly applyCardDetailRepository: ApplyCardDetailRepository
  ) {}

  createApplyCardDetail(
    createApplyCardDetailDto: CreateApplyCardDetailDto
  ): ApplyCardDetail {
    return this.applyCardDetailRepository.create(createApplyCardDetailDto);
  }

  async saveAllApplyCardDetail(
    applyCardDetails: ApplyCardDetail[]
  ): Promise<ApplyCardDetail[]> {
    return this.applyCardDetailRepository.saveAllApplyCardDetail(
      applyCardDetails
    );
  }
}
