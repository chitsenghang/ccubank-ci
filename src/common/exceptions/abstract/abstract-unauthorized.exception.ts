import { HttpStatus } from '@nestjs/common';
import { UnauthorizedExceptionMessage } from '../../interface/exception.message';
import { HttpMessage } from '../../enums/http-message.enum';
import { BaseCustomException } from './abstract-base.exception';

export abstract class AbstractUnauthorizedException extends BaseCustomException {
  protected constructor(private readonly msg: any) {
    super(HttpMessage.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
  }

  getError(): UnauthorizedExceptionMessage[] {
    const exceptionMessage = [];
    if (this.msg) {
      exceptionMessage.push({
        message: `${this.msg}`
      });
    } else {
      exceptionMessage.push({
        message: HttpMessage.UNAUTHORIZED
      });
    }
    return exceptionMessage;
  }
}
