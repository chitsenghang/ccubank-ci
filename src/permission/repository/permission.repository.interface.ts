import { Permission } from '../entity/permission.entity';

export interface IPermissionRepository {
  findOnePermission(id: number, entityName: string): Promise<Permission>;
}
