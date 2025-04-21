import { Injectable } from '@nestjs/common';
import { DataSource, In } from 'typeorm';
import { BaseRepository } from '../../base/base-repository';
import { UserRole } from '../entity/user-role.entity';
import { CreateUserRoleDto } from '../dto/create-user-role.dto';
import { IUserRepository } from './user-role.repository.interface';

@Injectable()
export class UserRoleRepository
  extends BaseRepository<UserRole>
  implements IUserRepository
{
  constructor(private readonly dataSource: DataSource) {
    super(UserRole, dataSource.createEntityManager());
  }

  createUserRole(createUserRoleDto: CreateUserRoleDto): UserRole {
    return this.create(createUserRoleDto);
  }

  async saveAllUserRole(userRole: UserRole[]): Promise<UserRole[]> {
    return this.saveAllWithCreateEntity(userRole);
  }

  async saveUserRole(userRole: UserRole): Promise<UserRole> {
    return this.saveWithCreateEntity(userRole);
  }

  async findRolesByUserId(userId: number): Promise<UserRole[]> {
    return this.findAll({
      where: { user: { id: userId } },
      relations: { role: true, user: true }
    });
  }

  async deleteUserRoles(
    userId: number,
    rolesToRemove: UserRole[]
  ): Promise<void> {
    await this.delete({
      user: { id: userId },
      role: In(
        rolesToRemove.map((userRole: UserRole): number => userRole.role.id)
      )
    });
  }
}
