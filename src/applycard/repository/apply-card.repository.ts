import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../base/base-repository';
import { ApplyCard } from '../entity/apply-card.entity';
import { CreateApplyCardDto } from '../dto/create-apply-card.dto';
import { ApplyCardPaginationQueryDto } from '../dto/apply-card-pagination-query.dto';
import { PaginationResponse } from '../../common/interface/response.interface';
import { IApplyCardRepository } from './apply-card.repository.interface';

@Injectable()
export class ApplyCardRepository
  extends BaseRepository<ApplyCard>
  implements IApplyCardRepository
{
  constructor(private readonly dataSource: DataSource) {
    super(ApplyCard, dataSource.createEntityManager());
  }

  async saveApplyCard(
    createApplyCardDto: CreateApplyCardDto
  ): Promise<ApplyCard> {
    return this.saveWithCreateEntity(createApplyCardDto);
  }

  async findOneApplyCard(id: number, entityName: string): Promise<ApplyCard> {
    return this.findOneByIdElseThrow(id, entityName, {
      relations: {
        applyCardDetail: true
      }
    });
  }

  findAllApplyCard(
    applyCardPaginationDto: ApplyCardPaginationQueryDto
  ): Promise<PaginationResponse<ApplyCard>> {
    return this.findAllWithPagination(applyCardPaginationDto, [], {
      relation: {
        applyCardDetail: true
      }
    });
  }
}
