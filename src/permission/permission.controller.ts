import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PermissionService } from './service/permission.service';
import { Permission } from './entity/permission.entity';

@ApiBearerAuth()
@ApiTags('Permission')
@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @ApiOkResponse({ type: Permission, isArray: true })
  @Get()
  getALlPermission(): Promise<{ data: Record<string, any> }> {
    return this.permissionService.findAllRolePermission();
  }
}
