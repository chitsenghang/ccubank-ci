import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
import { RequestContextService } from '../../../requestcontext/request-context.service';
import { JwtPayload } from '../../../authentication/dto/jwt-payload';
import { UnauthorizedResourceException } from '../../exceptions';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const token: string = req.headers.authorization?.split(' ')[1];
      const jwtPayload: JwtPayload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET
      });
      if (jwtPayload) {
        RequestContextService.setCurrentUserId(+jwtPayload.userId);
      }
      next();
    } catch (error) {
      throw new UnauthorizedResourceException();
    }
  }
}
