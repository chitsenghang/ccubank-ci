import { HttpStatus } from '@nestjs/common';
import { RequestTimeoutExceptionMessage } from '../../interface/exception.message';
import { HttpMessage } from '../../enums/http-message.enum';
import { BaseCustomException } from './abstract-base.exception';

export abstract class AbstractRequestTimeoutException extends BaseCustomException {
  constructor(private readonly resource: string) {
    super(HttpMessage.REQUEST_TIMEOUT, HttpStatus.REQUEST_TIMEOUT);
  }

  getError(): RequestTimeoutExceptionMessage[] {
    const exceptionMessage = [];
    exceptionMessage.push({
      message: `Resource ${this.resource} timeout`
    });
    return exceptionMessage;
  }
}
