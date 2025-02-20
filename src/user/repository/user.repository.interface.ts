import { User } from '../entity/user.entity';
import { UserPaginationQueryDto } from '../dto/pagination-query-user.dto';
import { PaginationResponse } from '../../common/interface/response.interface';
import { LoginDto } from '../../authentication/dto/login.dto';
import { CreateUserDto } from '../dto/create-user.dto';

export interface IUserRepository {
  createUser(createUserDto: CreateUserDto): User;

  saveUser(createUserDto: CreateUserDto): Promise<User>;

  findOneUserOrFail(id: number, entityName: string): Promise<User>;

  findAllUser(
    pagination: UserPaginationQueryDto
  ): Promise<PaginationResponse<User>>;

  findIfExistUser(loginDto: LoginDto): Promise<User>;
}
