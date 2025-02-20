import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from '../../base/base-repository';
import { Permission } from '../entity/permission.entity';
import { IPermissionRepository } from './permission.repository.interface';

@Injectable()
export class PermissionRepository
  extends BaseRepository<Permission>
  implements IPermissionRepository
{
  constructor(private readonly dataSource: DataSource) {
    super(Permission, dataSource.createEntityManager());
  }

  async findOnePermission(id: number, entityName: string): Promise<Permission> {
    return this.findOneById(id, entityName);
  }
}
