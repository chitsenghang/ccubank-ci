import { Role } from '../entity/role.entity';
import { PaginationResponse } from '../../common/interface/response.interface';
import { PaginationQueryRoleDto } from '../dto/pagination-query-role.dto';

export interface IRoleRepository {
  findOneRole(id: number, entityName: string): Promise<Role>;

  findAllRole(
    pagination: PaginationQueryRoleDto
  ): Promise<PaginationResponse<Role>>;

  findRoleByIds(ids: number[]): Promise<Role[]>;
}
