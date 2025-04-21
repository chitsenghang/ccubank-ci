import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { LoginDto } from './dto/login.dto';
import { AuthenticationService } from './service/authentication.service';

@ApiTags('Authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Get('health/check')
  getAuthHealthCheck(): string {
    return 'OK';
  }

  @Throttle({ default: { limit: 1, ttl: +process.env.RATE_LIMIT_TTL } })
  @Post('token')
  login(
    @Body() loginDto: LoginDto
  ): Promise<{ accessToken: string; refreshToken: string }> {
    return this.authenticationService.login(loginDto);
  }

  @Post('refresh-token')
  @ApiBearerAuth()
  getNewToken(
    @Headers('Authorization') bearerToken: string
  ): Promise<{ accessToken: string; refreshToken: string }> {
    return this.authenticationService.generateNewTokenByRefreshToken(
      bearerToken
    );
  }
}
