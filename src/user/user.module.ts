import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Permission } from '../permission/entity/permission.entity';
import { Role } from '../role/entity/role.entity';
import { RoleService } from '../role/service/role.service';
import { RolePermission } from '../rolepermission/entity/role-permission';
import { PermissionService } from '../permission/service/permission.service';
import { RoleRepository } from '../role/repository/role.repository';
import { PermissionRepository } from '../permission/repository/permission.repository';
import { UserRoleService } from '../userrole/service/user-role.service';
import { UserRoleRepository } from '../userrole/repository/user-role.repository';
import { RolePermissionService } from '../rolepermission/service/role-permission.service';
import { RolePermissionRepository } from '../rolepermission/repository/role-permission.repository';
import { UserRole } from '../userrole/entity/user-role.entity';
import { CacheService } from '../cache/cache.service';
import { UserService } from './service/user.service';
import { UserController } from './user.controller';
import { User } from './entity/user.entity';
import { UserRepository } from './repository/user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Permission, Role, UserRole, User, RolePermission])
  ],
  controllers: [UserController],
  providers: [
    UserService,
    RoleService,
    PermissionService,
    JwtService,
    UserRepository,
    RoleRepository,
    PermissionRepository,
    UserRoleService,
    UserRoleRepository,
    RolePermissionService,
    RolePermissionRepository,
    CacheService
  ],
  exports: [UserService]
})
export class UserModule {}
