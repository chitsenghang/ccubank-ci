import {
  DeepPartial,
  DeleteResult,
  EntityManager,
  EntityTarget,
  FindOptionsWhere,
  Repository,
  UpdateResult
} from 'typeorm';
import { ResourceNotFoundException } from '../common/exceptions';
import { BasePaginationQueryDto } from '../common/dto/base-pagination-query.dto';
import { PaginationResponse } from '../common/interface/response.interface';
import { GetPagination } from '../common/utils/pagination-query.common';
import {
  IBaseRepository,
  PaginationOptions,
  QueryOptions
} from './base-repository.interface';

export class BaseRepository<T>
  extends Repository<T>
  implements IBaseRepository<T>
{
  private readonly TYPE_ORM_CACHE_DURATION: number =
    +process.env.TYPE_ORM_CACHE_DURATION;

  constructor(target: EntityTarget<T>, manager?: EntityManager) {
    super(target, manager);
  }

  async findOneByIdElseThrow(
    id: number,
    entityName?: string,
    options: Omit<QueryOptions<T>, 'where'> = {}
  ): Promise<T> {
    await this.clearEntityCache();
    const entity: Awaited<T> = await this.getManager().findOne(this.target, {
      where: { id } as unknown as FindOptionsWhere<T>,
      select: options.select,
      relations: options.relations,
      cache: {
        id: `entity_${this.metadata.tableName}_${id}`,
        milliseconds: this.TYPE_ORM_CACHE_DURATION
      }
    });

    if (!entity) {
      throw new ResourceNotFoundException(entityName, id);
    }
    return entity;
  }

  async findAll(options: QueryOptions<T> = {}): Promise<T[]> {
    await this.clearEntityCache();
    return this.getManager().find(this.target, {
      where: options.where,
      select: options.select,
      relations: options.relations,
      order: options.order,
      skip: options.skip,
      take: options.take,
      cache: {
        id: `list_${this.metadata.tableName}`,
        milliseconds: this.TYPE_ORM_CACHE_DURATION
      }
    });
  }

  async findAllWithPagination(
    pagination: BasePaginationQueryDto,
    searchableColumns: string[],
    options?: PaginationOptions<T>
  ): Promise<PaginationResponse<T>> {
    await this.clearEntityCache();
    return GetPagination(
      this.getManager().getRepository(this.target),
      pagination,
      searchableColumns,
      {
        ...options,
        cache: {
          id: `pagination_${this.metadata.tableName}`,
          milliseconds: this.TYPE_ORM_CACHE_DURATION
        }
      }
    );
  }

  async saveWithCreateEntity(data: DeepPartial<T>): Promise<T> {
    const entity: T = this.getManager().create(this.target, data);
    await this.getManager().save(entity);
    await this.clearEntityCache();
    return entity;
  }

  async saveAllWithCreateEntity(data: DeepPartial<T>[]): Promise<T[]> {
    const entities: T[] = data.map(
      (item): T => this.getManager().create(this.target, item)
    );
    const savedEntities: T[] = await this.getManager().save(entities);
    const ids: number[] = savedEntities.map((entity) => entity['id']);
    await this.clearEntityCache(ids);

    return savedEntities;
  }

  async deleteElseThrow(id: number, entityName: string): Promise<void> {
    const result: DeleteResult = await this.getManager().delete(
      this.target,
      id
    );
    if (result.affected === 0) {
      throw new ResourceNotFoundException(entityName, id);
    }

    await this.clearEntityCache();
  }

  async softDeleteElseThrow(id: number, entityName: string): Promise<void> {
    await this.findOneByIdElseThrow(id, entityName);

    const result: UpdateResult = await this.getManager().softDelete(
      this.target,
      id
    );
    if (result.affected === 0) {
      throw new ResourceNotFoundException(entityName, id);
    }

    await this.clearEntityCache();
  }

  protected getManager(): EntityManager {
    return (this as any).transactionManager || this.manager;
  }

  private async clearEntityCache(ids?: number | number[]): Promise<void> {
    const cacheKeys: string[] = [
      `list_${this.metadata.tableName}`,
      `pagination_${this.metadata.tableName}`
    ];
    if (Array.isArray(ids)) {
      ids.forEach((id): void => {
        cacheKeys.push(`entity_${this.metadata.tableName}_${id}`);
      });
    } else {
      cacheKeys.push(`entity_${this.metadata.tableName}_${ids}`);
    }
    await this.getManager().connection.queryResultCache?.remove(cacheKeys);
  }
}
