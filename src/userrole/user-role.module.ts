import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entity/user.entity';
import { UserRole } from './entity/user-role.entity';
import { UserRoleService } from './service/user-role.service';
import { UserRoleRepository } from './repository/user-role.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserRole, User])],
  providers: [UserRoleService, UserRoleRepository]
})
export class UserRoleModule {}
