import { CanActivate, Injectable, mixin, Type } from '@nestjs/common';
import { UserService } from '../../../user/service/user.service';
import { CurrentUserDto } from '../../dto/current-user.dto';
import { validatePermission } from './permission.service';

export const PermissionGuard = (permissionCode: string): Type<CanActivate> => {
  @Injectable()
  class PermissionGuardMixin implements CanActivate {
    constructor(private readonly userService: UserService) {}

    async canActivate(): Promise<boolean> {
      const currentUser: CurrentUserDto =
        await this.userService.findCurrentUser();
      return validatePermission(permissionCode, currentUser.permissions);
    }
  }

  return mixin(PermissionGuardMixin);
};
