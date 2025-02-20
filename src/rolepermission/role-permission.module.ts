import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleRepository } from '../role/repository/role.repository';
import { Role } from '../role/entity/role.entity';
import { RolePermission } from './entity/role-permission';
import { RolePermissionService } from './service/role-permission.service';
import { RolePermissionRepository } from './repository/role-permission.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RolePermission, Role])],
  providers: [RolePermissionService, RolePermissionRepository, RoleRepository]
})
export class RolePermissionModule {}
