import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entity/user.entity';
import { UserPaginationQueryDto } from '../dto/pagination-query-user.dto';
import { PaginationResponse } from '../../common/interface/response.interface';
import { CurrentUserDto } from '../../common/dto/current-user.dto';
import { LoginDto } from '../../authentication/dto/login.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

export interface IUserService {
  createUser(createUserDto: CreateUserDto): Promise<User>;

  updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User>;

  findOneUserOrFail(id: number, entityName: string): Promise<User>;

  findAllUser(
    pagination: UserPaginationQueryDto
  ): Promise<PaginationResponse<User>>;

  findCurrentUser(): Promise<CurrentUserDto>;

  findIfExistUser(loginDto: LoginDto): Promise<User>;
}
