import { Injectable } from '@nestjs/common';
import { UserRole } from '../entity/user-role.entity';
import { UserRoleRepository } from '../repository/user-role.repository';
import { CreateUserRoleDto } from '../dto/create-user-role.dto';
import { IUserRoleService } from './user-role.service.interface';

@Injectable()
export class UserRoleService implements IUserRoleService {
  constructor(private readonly userRoleRepository: UserRoleRepository) {}

  createUserRole(createUserRoleDto: CreateUserRoleDto): UserRole {
    return this.userRoleRepository.createUserRole(createUserRoleDto);
  }

  async saveAllUserRole(userRole: UserRole[]): Promise<UserRole[]> {
    return this.userRoleRepository.saveAllUserRole(userRole);
  }

  async saveUserRole(userRole: UserRole): Promise<UserRole> {
    return this.userRoleRepository.saveUserRole(userRole);
  }

  async findRolesByUserId(userId: number): Promise<UserRole[]> {
    return this.userRoleRepository.findRolesByUserId(userId);
  }

  async deleteUserRoles(
    userId: number,
    rolesToRemove: UserRole[]
  ): Promise<void> {
    await this.userRoleRepository.deleteUserRoles(userId, rolesToRemove);
  }
}
