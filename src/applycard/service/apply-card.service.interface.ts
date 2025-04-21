import { Express } from 'express';
import { CreateApplyCardDto } from '../dto/create-apply-card.dto';
import { ApplyCard } from '../entity/apply-card.entity';
import { ApplyCardPaginationQueryDto } from '../dto/apply-card-pagination-query.dto';
import { PaginationResponse } from '../../common/interface/response.interface';

export interface IApplyCardService {
  createApplyCard(
    type: string,
    createApplyCardDto: CreateApplyCardDto,
    file: Express.Multer.File
  ): Promise<ApplyCard>;

  findOneApplyCard(id: number): Promise<ApplyCard>;

  findAllApplyCard(
    applyCardPaginationDto: ApplyCardPaginationQueryDto
  ): Promise<PaginationResponse<ApplyCard>>;
}
