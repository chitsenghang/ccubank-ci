import { Injectable } from '@nestjs/common';
import { RolePermission } from '../entity/role-permission';
import { RolePermissionRepository } from '../repository/role-permission.repository';
import { CreateRolePermissionDto } from '../dto/create-role-permission.dto';
import { IRolePermissionService } from './role-permission.service.interface';

@Injectable()
export class RolePermissionService implements IRolePermissionService {
  constructor(
    private readonly rolePermissionRepository: RolePermissionRepository
  ) {}

  createRolePermission(
    createRolePermissionDto: CreateRolePermissionDto
  ): RolePermission {
    return this.rolePermissionRepository.create(createRolePermissionDto);
  }

  async saveAllRolePermission(
    rolePermission: RolePermission[]
  ): Promise<RolePermission[]> {
    return this.rolePermissionRepository.saveAllRolePermission(rolePermission);
  }

  async deleteRolePermissions(
    roleId: number,
    permissionsToRemove: RolePermission[]
  ): Promise<void> {
    await this.rolePermissionRepository.deleteRolePermissions(
      roleId,
      permissionsToRemove
    );
  }

  async findPermissionsByRoleId(roleId: number): Promise<RolePermission[]> {
    return this.rolePermissionRepository.findPermissionsByRoleId(roleId);
  }
}
