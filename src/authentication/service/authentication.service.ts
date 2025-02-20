import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../../user/entity/user.entity';
import { UnauthorizedResourceException } from '../../common/exceptions';
import { SetPasswordOption } from '../../common/enums/set-password-option';
import { LoginDto } from '../dto/login.dto';
import { JwtPayload } from '../dto/jwt-payload';
import { UserService } from '../../user/service/user.service';
import { IAuthenticationService } from './authentication.service.interface';

@Injectable()
export class AuthenticationService implements IAuthenticationService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async login(
    loginDto: LoginDto
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user: User = await this.userService.findIfExistUser(loginDto);
    const isMatch: boolean = await bcrypt.compare(
      loginDto.password,
      user.password
    );

    if (!isMatch) {
      throw new UnauthorizedResourceException(
        `Username or password is invalid`
      );
    }
    const payload: JwtPayload = {
      userId: user.id,
      phoneNumber: user.phone,
      email: user.email,
      setPasswordOption: SetPasswordOption.EMAIL,
      isRefreshToken: false
    };
    const accessToken: string = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRE
    });
    const refreshToken: string = await this.jwtService.signAsync(
      { ...payload, isRefreshToken: true },
      {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRE
      }
    );
    return { accessToken, refreshToken };
  }

  async generateNewTokenByRefreshToken(
    bearerToken: string
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const bearerTokenSplit: string[] = bearerToken.split(' ');
    if (bearerTokenSplit.length !== 2 || bearerTokenSplit[0] !== 'Bearer') {
      throw new UnauthorizedResourceException('Invalid token format');
    }
    const refreshToken: string = bearerTokenSplit[1];
    const jwtPayload: JwtPayload = await this.jwtService.verifyAsync(
      refreshToken,
      {
        secret: process.env.JWT_SECRET
      }
    );
    if (!jwtPayload || !jwtPayload.isRefreshToken) {
      throw new UnauthorizedResourceException('Invalid refresh token');
    }
    const newAccessToken: string = await this.jwtService.signAsync(jwtPayload, {
      secret: process.env.JWT_SECRET
    });
    return { accessToken: newAccessToken, refreshToken: refreshToken };
  }
}
