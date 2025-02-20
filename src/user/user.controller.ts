import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PaginationResponse } from '../common/interface/response.interface';
import { ResponseMappingInterceptor } from '../common/interceptors/response-mapping.interceptor';
import { CurrentUserDto } from '../common/dto/current-user.dto';
import { PermissionGuard } from '../common/guards/permission/permission.guard';
// import { CacheCurrentUser } from '../common/decorators/cache-current-user.decorator';
import { UserService } from './service/user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/user.entity';
import { UserPaginationQueryDto } from './dto/pagination-query-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiBearerAuth()
@UseInterceptors(ResponseMappingInterceptor)
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  @Put(':id')
  updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<User> {
    return this.userService.updateUser(id, updateUserDto);
  }

  @UseGuards(PermissionGuard('READ'))
  @Get()
  findAllUser(
    @Query() pagination: UserPaginationQueryDto
  ): Promise<PaginationResponse<User>> {
    return this.userService.findAllUser(pagination);
  }

  @Get('current')
  findCurrentUser(): Promise<CurrentUserDto> {
    return this.userService.findCurrentUser();
  }

  @Get(':id')
  findOneUser(@Param('id') id: number): Promise<User> {
    return this.userService.findOneUserOrFail(id);
  }
}
