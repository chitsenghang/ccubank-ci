import { Injectable } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { Permission } from '../entity/permission.entity';
import { PermissionRepository } from '../repository/permission.repository';

@Injectable()
export class PermissionService {
  private readonly PERMISSION = 'permission';

  constructor(private readonly permissionRepo: PermissionRepository) {}

  async findAllRolePermission(): Promise<{ data: Record<string, any> }> {
    const rolePermission: Permission[] = await this.permissionRepo.manager
      .getTreeRepository(Permission)
      .findTrees();
    return {
      data: instanceToPlain(rolePermission)
    };
  }

  async findOnePermission(id: number): Promise<Permission> {
    return this.permissionRepo.findOnePermission(id, this.PERMISSION);
  }
}
