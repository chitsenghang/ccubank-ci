import { CreateApplyCardDto } from '../dto/create-apply-card.dto';
import { ApplyCard } from '../entity/apply-card.entity';
import { ApplyCardPaginationQueryDto } from '../dto/apply-card-pagination-query.dto';
import { PaginationResponse } from '../../common/interface/response.interface';

export interface IApplyCardRepository {
  saveApplyCard(createApplyCardDto: CreateApplyCardDto): Promise<ApplyCard>;

  findOneApplyCard(id: number, entityName: string): Promise<ApplyCard>;

  findAllApplyCard(
    applyCardPaginationDto: ApplyCardPaginationQueryDto
  ): Promise<PaginationResponse<ApplyCard>>;
}
