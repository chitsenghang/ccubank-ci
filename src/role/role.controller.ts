import {
  Body,
  Controller,
  Get,
  Param,
  ParseBoolPipe,
  Post,
  Put,
  Query,
  UseInterceptors
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ResponseMappingInterceptor } from '../common/interceptors/response-mapping.interceptor';
import { PaginationResponse } from '../common/interface/response.interface';
import { CreateRoleDto } from './dto/create-role.dto';
import { RoleService } from './service/role.service';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PaginationQueryRoleDto } from './dto/pagination-query-role.dto';
import { Role } from './entity/role.entity';

@ApiBearerAuth()
@UseInterceptors(ResponseMappingInterceptor)
@ApiTags('Role')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  getAllRole(
    @Query() pagination: PaginationQueryRoleDto
  ): Promise<PaginationResponse<Role>> {
    return this.roleService.findAllRole(pagination);
  }

  @Post()
  createRole(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
    return this.roleService.saveRole(createRoleDto);
  }

  @Put(':id')
  async updateSpecificRole(
    @Param('id') id: number,
    @Body() updateRoleDto: UpdateRoleDto
  ): Promise<Role> {
    return this.roleService.updateRole(id, updateRoleDto);
  }

  @Get(':id')
  getSpecificRole(
    @Param('id') id: number,
    @Query('isIncludePermission', ParseBoolPipe) isIncludePermission: boolean
  ): Promise<Role | any> {
    return this.roleService.findSpecificRole(id, isIncludePermission);
  }
}
