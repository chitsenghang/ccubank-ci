import { HttpStatus } from '@nestjs/common';
import { RequestTimeoutExceptionMessage } from '../../interface/exception.message';
import { HttpMessage } from '../../enums/http-message.enum';
import { BaseCustomException } from './abstract-base.exception';

export abstract class AbstractTooManyRequestException extends BaseCustomException {
  constructor(private readonly msg: string) {
    super(HttpMessage.TOO_MANY_REQUEST, HttpStatus.TOO_MANY_REQUESTS);
  }

  getError(): RequestTimeoutExceptionMessage[] {
    const exceptionMessage = [];
    exceptionMessage.push({
      message: this.msg
    });
    return exceptionMessage;
  }
}
