import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionService } from '../permission/service/permission.service';
import { Permission } from '../permission/entity/permission.entity';
import { PermissionRepository } from '../permission/repository/permission.repository';
import { RolePermissionService } from '../rolepermission/service/role-permission.service';
import { RolePermissionRepository } from '../rolepermission/repository/role-permission.repository';
import { RolePermission } from '../rolepermission/entity/role-permission';
import { RoleService } from './service/role.service';
import { RoleController } from './role.controller';
import { Role } from './entity/role.entity';
import { RoleRepository } from './repository/role.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RolePermission, Role, Permission])],
  controllers: [RoleController],
  providers: [
    RoleService,
    PermissionService,
    RoleRepository,
    PermissionRepository,
    RolePermissionService,
    RolePermissionRepository
  ]
})
export class RoleModule {}
