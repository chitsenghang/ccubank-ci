import { UserRole } from '../entity/user-role.entity';
import { CreateUserRoleDto } from '../dto/create-user-role.dto';

export interface IUserRoleService {
  createUserRole(createUserRoleDto: CreateUserRoleDto): UserRole;

  findRolesByUserId(userId: number): Promise<UserRole[]>;

  saveAllUserRole(userRole: UserRole[]): Promise<UserRole[]>;

  saveUserRole(userRole: UserRole): Promise<UserRole>;

  deleteUserRoles(userId: number, rolesToRemove: UserRole[]): Promise<void>;
}
