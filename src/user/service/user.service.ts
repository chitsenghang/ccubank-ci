import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { plainToClass } from 'class-transformer';
import { DataSource } from 'typeorm';
import { Role } from '../../role/entity/role.entity';
import { RoleService } from '../../role/service/role.service';
import { CurrentUserDto } from '../../common/dto/current-user.dto';
import { RolePermission } from '../../rolepermission/entity/role-permission';
import { RequestContextService } from '../../requestcontext/request-context.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entity/user.entity';
import { UserRole } from '../../userrole/entity/user-role.entity';
import { UserPaginationQueryDto } from '../dto/pagination-query-user.dto';
import { PaginationResponse } from '../../common/interface/response.interface';
import { UserRepository } from '../repository/user.repository';
import { UserRoleService } from '../../userrole/service/user-role.service';
import { Transactional } from '../../common/decorators/transactional.decorator';
import { LoginDto } from '../../authentication/dto/login.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CacheService } from '../../cache/cache.service';
import { CacheCurrentUser } from '../../common/decorators/cache-current-user.decorator';
import { IUserService } from './user.service.interface';

@Injectable()
export class UserService implements IUserService {
  private readonly USER = 'user';

  private readonly USER_ROLE = 'user,role';

  constructor(
    private readonly dataSource: DataSource,
    public cacheService: CacheService,
    private readonly userRoleService: UserRoleService,
    private readonly roleService: RoleService,
    private readonly userRepository: UserRepository
  ) {}

  @Transactional()
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user: User = this.userRepository.createUser(createUserDto);
    const salt: string = bcrypt.genSaltSync(+process.env.PASSWORD_SALT);
    user.password = await bcrypt.hash(user.password, salt);
    const roles: Role[] = await this.roleService.findRoleByIds(
      createUserDto.roleIds
    );
    const roleList: UserRole[] = roles.map(
      (role: Role): UserRole =>
        this.userRoleService.createUserRole({
          user: { id: user.id },
          role: { id: role.id }
        })
    );
    await this.userRoleService.saveAllUserRole(roleList);
    return this.userRepository.saveUser(user);
  }

  @Transactional()
  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const existingUser: User = await this.findOneUserOrFail(id);
    Object.assign(existingUser, updateUserDto);
    const savedUser: User = await this.userRepository.save(existingUser);
    if (updateUserDto.roleIds?.length) {
      const existingRoles: UserRole[] =
        await this.userRoleService.findRolesByUserId(existingUser.id);
      const newRoles: Role[] = await Promise.all(
        updateUserDto.roleIds.map(
          (roleId: number): Promise<Role> =>
            this.roleService.findOneRoleOrFail(roleId)
        )
      );
      const rolesToRemove: UserRole[] = existingRoles.filter(
        (userRole: UserRole): boolean =>
          !newRoles.some((role: Role): boolean => role.id === userRole.role.id)
      );
      if (rolesToRemove.length) {
        await this.userRoleService.deleteUserRoles(
          existingUser.id,
          rolesToRemove
        );
      }
      const rolesToAdd: Role[] = newRoles.filter(
        (role: Role): boolean =>
          !existingRoles.some(
            (userRole: UserRole): boolean => userRole.role.id === role.id
          )
      );
      const userRoles: UserRole[] = rolesToAdd.map(
        (role: Role): UserRole =>
          this.userRoleService.createUserRole({
            user: { id: existingUser.id },
            role: { id: role.id }
          })
      );
      await this.userRoleService.saveAllUserRole(userRoles);
    }

    return savedUser;
  }

  async findOneUserOrFail(id: number): Promise<User> {
    return this.userRepository.findOneUserOrFail(id, this.USER);
  }

  async findAllUser(
    pagination: UserPaginationQueryDto
  ): Promise<PaginationResponse<User>> {
    return this.userRepository.findAllUser(pagination);
  }

  @CacheCurrentUser()
  async findCurrentUser(): Promise<CurrentUserDto> {
    const user: User = await this.findOneUserOrFail(
      RequestContextService.getCurrentUserId()
    );
    return plainToClass(CurrentUserDto, {
      id: user.id,
      username: user.username,
      isActive: user.isActive,
      isSelfService: user.isSelfService,
      permissions: user.userRole.flatMap((userRole: UserRole): string[] =>
        userRole.role.rolePermission.map(
          (rolePermission: RolePermission): string =>
            rolePermission.permission.name
        )
      )
    });
  }

  async findIfExistUser(loginDto: LoginDto): Promise<User> {
    return this.userRepository.findIfExistUser(loginDto);
  }
}
