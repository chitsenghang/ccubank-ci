import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { User } from '../entity/user.entity';
import { BaseRepository } from '../../base/base-repository';
import { UserPaginationQueryDto } from '../dto/pagination-query-user.dto';
import { PaginationResponse } from '../../common/interface/response.interface';
import { LoginDto } from '../../authentication/dto/login.dto';
import { UnauthorizedResourceException } from '../../common/exceptions';
import { CreateUserDto } from '../dto/create-user.dto';
import { IUserRepository } from './user.repository.interface';

@Injectable()
export class UserRepository
  extends BaseRepository<User>
  implements IUserRepository
{
  constructor(private readonly dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  createUser(createUserDto: CreateUserDto): User {
    return this.create({
      ...createUserDto,
      phoneVerified: true,
      emailVerified: true,
      isSelfService: createUserDto.isSelfService ?? false,
      resetPassword: createUserDto.resetPassword ?? false
    });
  }

  async saveUser(createUserDto: CreateUserDto): Promise<User> {
    return this.save(createUserDto);
  }

  async findOneUserOrFail(id: number, entityName: string): Promise<User> {
    return this.findOneById(id, entityName, {
      relations: {
        userRole: { role: { rolePermission: { permission: true } } }
      }
    });
  }

  async findAllUser(
    pagination: UserPaginationQueryDto
  ): Promise<PaginationResponse<User>> {
    return this.findAllWithPagination(
      pagination,
      ['id', 'username', 'phone', 'email'],
      {
        where: {
          userRole: { role: { id: pagination.roleId } },
          isSelfService: pagination.isSelfService
        },
        relation: {
          userRole: {
            role: true
          }
        }
      }
    );
  }

  async findIfExistUser(loginDto: LoginDto): Promise<User> {
    const user: User = await this.findOne({
      where: [
        {
          isActive: true,
          email: loginDto.username,
          emailVerified: true
        },
        {
          isActive: true,
          phone: loginDto.username,
          phoneVerified: true
        }
      ]
    });
    if (!user) {
      throw new UnauthorizedResourceException(
        `Username or password is invalid`
      );
    }

    return user;
  }
}
