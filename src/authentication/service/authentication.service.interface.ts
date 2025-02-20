import { LoginDto } from '../dto/login.dto';

export interface IAuthenticationService {
  login(
    loginDto: LoginDto
  ): Promise<{ accessToken: string; refreshToken: string }>;

  generateNewTokenByRefreshToken(
    bearerToken: string
  ): Promise<{ accessToken: string; refreshToken: string }>;
}
