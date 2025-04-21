import { RolePermission } from '../entity/role-permission';

export interface IRolePermissionRepository {
  findPermissionsByRoleId(roleId: number): Promise<RolePermission[]>;

  saveAllRolePermission(
    rolePermission: RolePermission[]
  ): Promise<RolePermission[]>;

  deleteRolePermissions(
    roleId: number,
    permissionsToRemove: RolePermission[]
  ): Promise<void>;
}
