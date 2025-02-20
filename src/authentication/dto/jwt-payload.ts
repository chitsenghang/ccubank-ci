import { SetPasswordOption } from '../../common/enums/set-password-option';

export interface JwtPayload {
  userId: number;
  phoneNumber: string;
  email: string;
  setPasswordOption: SetPasswordOption;
  isRefreshToken: boolean;
}
