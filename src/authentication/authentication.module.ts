import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entity/user.entity';
import { RequestContextService } from '../requestcontext/request-context.service';
import { PermissionRepository } from '../permission/repository/permission.repository';
import { Role } from '../role/entity/role.entity';
import { RolePermission } from '../rolepermission/entity/role-permission';
import { RolePermissionRepository } from '../rolepermission/repository/role-permission.repository';
import { Permission } from '../permission/entity/permission.entity';
import { RolePermissionService } from '../rolepermission/service/role-permission.service';
import { UserModule } from '../user/user.module';
import { RoleRepository } from '../role/repository/role.repository';
import { AuthenticationService } from './service/authentication.service';
import { AuthenticationController } from './authentication.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, RolePermission, Permission]),
    UserModule
  ],
  providers: [
    AuthenticationService,
    JwtService,
    RequestContextService,
    RoleRepository,
    RolePermissionService,
    PermissionRepository,
    RolePermissionRepository
  ],
  controllers: [AuthenticationController]
})
export class AuthenticationModule {}
