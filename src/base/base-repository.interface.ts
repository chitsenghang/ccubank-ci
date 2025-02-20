import {
  DeepPartial,
  FindOptionsOrder,
  FindOptionsRelations,
  FindOptionsSelect,
  FindOptionsWhere,
  ObjectLiteral
} from 'typeorm';
import { BasePaginationQueryDto } from '../common/dto/base-pagination-query.dto';
import { PaginationResponse } from '../common/interface/response.interface';

export type QueryOptions<T> = {
  where?: FindOptionsWhere<T>;
  select?: FindOptionsSelect<T>;
  relations?: FindOptionsRelations<T>;
  order?: FindOptionsOrder<T>;
  skip?: number;
  take?: number;
};

/**
 * Pagination options for findAllWithPagination
 */
export interface PaginationOptions<T> {
  where?: FindOptionsWhere<T>;
  select?: FindOptionsSelect<T>;
  relation?: FindOptionsRelations<T>;
  orderBy?: FindOptionsOrder<T>;
}

export interface IBaseRepository<T extends ObjectLiteral> {
  /**
   * Find entity by ID
   * @param id - Entity ID
   * @param entityName - Optional entity name for error messages
   * @param options - Query options excluding where clause
   */
  findOneById(
    id: number,
    entityName?: string,
    options?: Omit<QueryOptions<T>, 'where'>
  ): Promise<T>;

  /**
   * Find all entity matching query options
   * @param options - Query options
   */
  findAll(options?: QueryOptions<T>): Promise<T[]>;

  /**
   * Find all entity with pagination
   * @param pagination - Pagination parameters
   * @param searchableColumns - Columns that can be searched
   * @param options - Additional query options
   */
  findAllWithPagination(
    pagination: BasePaginationQueryDto,
    searchableColumns: string[],
    options?: PaginationOptions<T>
  ): Promise<PaginationResponse<T>>;

  /**
   * Create and save a new entity
   * @param data - Entity data
   */
  saveEntity(data: DeepPartial<T>): Promise<T>;

  /**
   * Update an existing entity
   * @param id - Entity ID
   * @param data - Updated entity data
   */
  updateEntity(id: number, data: DeepPartial<T>): Promise<T>;

  /**
   * Delete an entity
   * @param id - Entity ID
   * @param entityName - Entity name for error messages
   */
  deleteEntity(id: number, entityName: string): Promise<void>;
}
