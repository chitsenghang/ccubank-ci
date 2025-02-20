import { SPECIAL_PERMISSION } from '../../enums/permission';
import { ResourceForbiddenException } from '../../exceptions/forbidden.exception';

const validatePermission = (
  permissionCode: string,
  permissions: string[]
): boolean => {
  let allowForPermissions: string[] = [
    SPECIAL_PERMISSION.ALL_FUNCTION,
    permissionCode
  ];

  if (permissionCode.startsWith('READ_')) {
    allowForPermissions = [
      SPECIAL_PERMISSION.ALL_FUNCTION,
      SPECIAL_PERMISSION.READ_ALL_FUNCTION,
      permissionCode
    ];
  }

  const isIncludePermission: boolean = allowForPermissions.some(
    (allowForPermission: string) => permissions.includes(allowForPermission)
  );

  if (isIncludePermission) {
    return true;
  } else {
    throw new ResourceForbiddenException(
      `You don't have permission of ${permissionCode}`
    );
  }
};

export { validatePermission };
