import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { RequestMethodEnums } from '../../enums/request-method.enum';
import { AuditLogService } from '../../../audit-log/service/audit-log.service';
import { RequestContextService } from '../../../requestcontext/request-context.service';
import { UserService } from '../../../user/service/user.service';
import { User } from '../../../user/entity/user.entity';
import { AuditLog } from '../../../audit-log/entity/audit-log.entity';

@Injectable()
export class AuditLogMiddleware implements NestMiddleware {
  private readonly ignoreRoutes: string[] = [
    '/login',
    '/refresh-token',
    '/logout'
  ];

  constructor(
    private readonly auditLogService?: AuditLogService,
    private readonly userService?: UserService
  ) {}

  async use(req: Request, res: Response, next: NextFunction): Promise<void> {
    const startTime: number = Date.now();
    res.on('close', async (): Promise<void> => {
      const { ip, method, url, body } = req;
      const { statusCode } = res;
      const totalTime: number = Date.now() - startTime;
      let maskBody: string = JSON.stringify(body);
      const sensitiveFields: string[] = [
        'token',
        'refreshToken',
        'password',
        'accessToken',
        'email',
        'phone'
      ];
      for (const field of sensitiveFields) {
        const regex = new RegExp(
          field + '":[\\s\\t\\n]*[\\"\'][^\\"\']+[\\"\']'
        );
        maskBody = maskBody?.replace(regex, `${field}` + '":"******"');
      }

      Logger.log(
        method === RequestMethodEnums.GET
          ? `[ ipAddress=${ip}, method=${method}, url=${url}, status=${statusCode}, totalTime=${totalTime}ms ]`
          : `[ ipAddress=${ip}, method=${method}, url=${url}, status=${statusCode}, payload=${maskBody}, totalTime=${totalTime}ms ]`
      );

      const userId: number = RequestContextService.getCurrentUserId();
      await Promise.all([
        this.userService.findOneUserOrFail(userId).then(
          (user: User): Promise<AuditLog> =>
            this.auditLogService.saveAuditLog({
              requestMethod: method,
              requestUrl: url,
              requestJson: JSON.stringify(body),
              ipAddress: ip,
              resourceId: userId,
              createdBy: user
            })
        )
      ]);
    });
    next();
  }
}
