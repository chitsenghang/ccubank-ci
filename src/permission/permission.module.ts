import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionService } from './service/permission.service';
import { PermissionController } from './permission.controller';
import { Permission } from './entity/permission.entity';
import { PermissionRepository } from './repository/permission.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Permission])],
  controllers: [PermissionController],
  providers: [PermissionService, PermissionRepository]
})
export class PermissionModule {}
