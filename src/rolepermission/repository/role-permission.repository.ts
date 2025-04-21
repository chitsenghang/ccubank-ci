import { Injectable } from '@nestjs/common';
import { DataSource, In } from 'typeorm';
import { BaseRepository } from '../../base/base-repository';
import { RolePermission } from '../entity/role-permission';
import { IRolePermissionRepository } from './role-permission.repository.interface';

@Injectable()
export class RolePermissionRepository
  extends BaseRepository<RolePermission>
  implements IRolePermissionRepository
{
  constructor(private readonly dataSource: DataSource) {
    super(RolePermission, dataSource.createEntityManager());
  }

  async saveAllRolePermission(
    rolePermission: RolePermission[]
  ): Promise<RolePermission[]> {
    return this.saveAllWithCreateEntity(rolePermission);
  }

  async deleteRolePermissions(
    roleId: number,
    permissionsToRemove: RolePermission[]
  ): Promise<void> {
    await this.delete({
      role: {
        id: roleId
      },
      permission: In(
        permissionsToRemove.map(
          (rolePermission: RolePermission): number =>
            rolePermission.permission.id
        )
      )
    });
  }

  async findPermissionsByRoleId(roleId: number): Promise<RolePermission[]> {
    return this.findAll({
      where: {
        role: {
          id: roleId
        }
      },
      relations: {
        role: true,
        permission: true
      }
    });
  }
}
