import { QueryRunner } from 'typeorm';
import { CreateRoleDto } from '../dto/create-role.dto';
import { Role } from '../entity/role.entity';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { PaginationQueryRoleDto } from '../dto/pagination-query-role.dto';
import { PaginationResponse } from '../../common/interface/response.interface';

export interface IRoleService {
  saveRole(createRoleDto: CreateRoleDto): Promise<Role>;

  updateRole(
    id: number,
    updateRoleDto: UpdateRoleDto,
    queryRunner?: QueryRunner
  ): Promise<Role>;

  findSpecificRole(id: number, isIncludePermission: boolean): Promise<Role>;

  findOneRoleOrFail(id: number): Promise<Role>;

  findAllRole(
    pagination: PaginationQueryRoleDto
  ): Promise<PaginationResponse<Role>>;

  findRoleByIds(ids: number[]): Promise<Role[]>;
}
