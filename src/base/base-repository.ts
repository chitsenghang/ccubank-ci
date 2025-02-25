import {
  DeepPartial,
  DeleteResult,
  EntityManager,
  EntityTarget,
  FindOptionsOrder,
  FindOptionsRelations,
  FindOptionsSelect,
  FindOptionsWhere,
  Repository
} from 'typeorm';
import { ResourceNotFoundException } from '../common/exceptions';
import { BasePaginationQueryDto } from '../common/dto/base-pagination-query.dto';
import { PaginationResponse } from '../common/interface/response.interface';
import { GetPagination } from '../common/utils/pagination-query.common';
import { IBaseRepository, QueryOptions } from './base-repository.interface';

export class BaseRepository<T>
  extends Repository<T>
  implements IBaseRepository<T>
{
  constructor(target: EntityTarget<T>, manager?: EntityManager) {
    super(target, manager);
  }

  async findOneById(
    id: number,
    entityName?: string,
    options: Omit<QueryOptions<T>, 'where'> = {}
  ): Promise<T> {
    const entity = await this.findOne({
      cache: {
        id: `user`,
        milliseconds: 30000
      },
      where: { id } as unknown as FindOptionsWhere<T>,
      select: options.select,
      relations: options.relations
    });

    if (!entity) {
      throw new ResourceNotFoundException(entityName, id);
    }

    return entity;
  }

  async findAll(options: QueryOptions<T> = {}): Promise<T[]> {
    return this.find({
      where: options.where,
      select: options.select,
      relations: options.relations,
      order: options.order,
      skip: options.skip,
      take: options.take
    });
  }

  async findAllWithPagination(
    pagination: BasePaginationQueryDto,
    searchableColumns: string[],
    options?: {
      where?: FindOptionsWhere<T>;
      select?: FindOptionsSelect<T>;
      relation?: FindOptionsRelations<T>;
      orderBy?: FindOptionsOrder<T>;
    }
  ): Promise<PaginationResponse<T>> {
    return GetPagination(this, pagination, searchableColumns, options);
  }

  async saveEntity(data: DeepPartial<T>): Promise<T> {
    const entity: T = this.create(data);
    await this.save(entity);
    return entity;
  }

  async updateEntity(id: number, data: DeepPartial<T>): Promise<T> {
    await this.update(id, data as any);
    return this.findOneById(id);
  }

  async deleteEntity(id: number, entityName: string): Promise<void> {
    const result: DeleteResult = await this.delete(id);
    if (result.affected === 0) {
      throw new ResourceNotFoundException(entityName, id);
    }
  }
}
