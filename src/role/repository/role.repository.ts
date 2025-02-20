import { Injectable } from '@nestjs/common';
import { DataSource, In } from 'typeorm';
import { Role } from '../entity/role.entity';
import { BaseRepository } from '../../base/base-repository';
import { PaginationQueryRoleDto } from '../dto/pagination-query-role.dto';
import { PaginationResponse } from '../../common/interface/response.interface';
import { IRoleRepository } from './role.repository.interface';

@Injectable()
export class RoleRepository
  extends BaseRepository<Role>
  implements IRoleRepository
{
  private readonly selectRolePermission = {
    relations: {
      rolePermission: {
        permission: true
      }
    },
    select: {
      id: true,
      name: true,
      rolePermission: {
        id: true,
        permission: { id: true, name: true }
      }
    }
  };

  constructor(private readonly dataSource: DataSource) {
    super(Role, dataSource.createEntityManager());
  }

  async findAllRole(
    pagination: PaginationQueryRoleDto
  ): Promise<PaginationResponse<Role>> {
    return this.findAllWithPagination(pagination, ['id', 'name'], {
      where: {
        isEnabled: pagination.isEnabled
      },
      ...this.selectRolePermission
    });
  }

  async findOneRole(id: number, entityName: string): Promise<Role> {
    return this.findOneById(id, entityName, { ...this.selectRolePermission });
  }

  async findRoleByIds(ids: number[]): Promise<Role[]> {
    return this.findBy({ id: In(ids) });
  }
}
