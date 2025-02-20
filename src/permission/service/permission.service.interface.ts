import { Permission } from '../entity/permission.entity';

export interface IPermissionService {
  findAllRolePermission(): Promise<{ data: Record<string, any> }>;

  findOnePermission(id: number, entityName: string): Promise<Permission>;
}
