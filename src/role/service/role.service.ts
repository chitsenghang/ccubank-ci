import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { instanceToPlain } from 'class-transformer';
import { PermissionService } from '../../permission/service/permission.service';
import { PaginationResponse } from '../../common/interface/response.interface';
import { CreateRoleDto } from '../dto/create-role.dto';
import { Role } from '../entity/role.entity';
import { RolePermission } from '../../rolepermission/entity/role-permission';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { PaginationQueryRoleDto } from '../dto/pagination-query-role.dto';
import { RoleRepository } from '../repository/role.repository';
import { Transactional } from '../../common/decorators/transactional.decorator';
import { RolePermissionService } from '../../rolepermission/service/role-permission.service';
import { Permission } from '../../permission/entity/permission.entity';
import { IRoleService } from './role.serrvice.interface';

@Injectable()
export class RoleService implements IRoleService {
  private readonly ROLE = 'role';

  constructor(
    private readonly dataSource: DataSource,
    private readonly permissionService: PermissionService,
    private readonly roleRepository: RoleRepository,
    private readonly rolePermissionService: RolePermissionService
  ) {}

  @Transactional()
  async saveRole(createRoleDto: CreateRoleDto): Promise<Role> {
    let newRole: Role = this.roleRepository.create(createRoleDto);
    newRole = await this.roleRepository.save(newRole);
    if (createRoleDto.permissionIds && createRoleDto.permissionIds.length) {
      for (const permissionId of createRoleDto.permissionIds) {
        await this.permissionService.findOnePermission(permissionId);
      }
      const rolePermissions: RolePermission[] = createRoleDto.permissionIds.map(
        (permissionId: number): RolePermission => {
          return this.rolePermissionService.createRolePermission({
            permission: { id: permissionId },
            role: { id: newRole.id }
          });
        }
      );
      await this.rolePermissionService.saveAllRolePermission(rolePermissions);
    }

    return newRole;
  }

  @Transactional()
  async updateRole(id: number, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const existingRole: Role = await this.roleRepository.findOneRole(
      id,
      this.ROLE
    );
    Object.assign(existingRole, updateRoleDto);
    const savedRole: Role = await this.roleRepository.save(existingRole);

    if (updateRoleDto.permissionIds?.length) {
      const existingPermissions: RolePermission[] =
        await this.rolePermissionService.findPermissionsByRoleId(
          existingRole.id
        );
      const newPermissions: Permission[] = await Promise.all(
        updateRoleDto.permissionIds.map(
          (permissionId: number): Promise<Permission> =>
            this.permissionService.findOnePermission(permissionId)
        )
      );
      const permissionsToRemove: RolePermission[] = existingPermissions.filter(
        (rolePermission: RolePermission): boolean =>
          !newPermissions.some(
            (permission: Permission): boolean =>
              permission.id === rolePermission.role.id
          )
      );
      if (permissionsToRemove.length) {
        await this.rolePermissionService.deleteRolePermissions(
          existingRole.id,
          permissionsToRemove
        );
      }
      const permissionsToAdd: Permission[] = newPermissions.filter(
        (permission: Permission): boolean =>
          !existingPermissions.some(
            (rolePermission: RolePermission): boolean =>
              rolePermission.permission.id === permission.id
          )
      );
      const rolePermissions: RolePermission[] = permissionsToAdd.map(
        (permission: Permission): RolePermission =>
          this.rolePermissionService.createRolePermission({
            permission: { id: existingRole.id },
            role: { id: permission.id }
          })
      );
      await this.rolePermissionService.saveAllRolePermission(rolePermissions);
    }

    return savedRole;
  }

  async findSpecificRole(
    id: number,
    isIncludePermission: boolean
  ): Promise<Role | any> {
    const role: Role = await this.findOneRoleOrFail(id);
    if (isIncludePermission) {
      return role;
    } else {
      return role.rolePermission.map((rolePermission: RolePermission) =>
        instanceToPlain(rolePermission.permission)
      );
    }
  }

  async findAllRole(
    pagination: PaginationQueryRoleDto
  ): Promise<PaginationResponse<Role>> {
    return this.roleRepository.findAllRole(pagination);
  }

  async findOneRoleOrFail(id: number): Promise<Role> {
    return this.roleRepository.findOneRole(id, this.ROLE);
  }

  findRoleByIds(ids: number[]): Promise<Role[]> {
    return this.roleRepository.findRoleByIds(ids);
  }
}
