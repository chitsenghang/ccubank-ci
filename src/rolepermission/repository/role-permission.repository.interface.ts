import { RolePermission } from '../entity/role-permission';
import { CreateRolePermissionDto } from '../dto/create-role-permission.dto';

export interface IRolePermissionRepository {
  createRolePermission(
    createRolePermissionDto: CreateRolePermissionDto
  ): RolePermission;

  findPermissionsByRoleId(roleId: number): Promise<RolePermission[]>;

  saveAllRolePermission(
    rolePermission: RolePermission[]
  ): Promise<RolePermission[]>;

  deleteRolePermissions(
    roleId: number,
    permissionsToRemove: RolePermission[]
  ): Promise<void>;
}
