import { HttpStatus } from '@nestjs/common';
import { ConflictResourceExceptionMessage } from '../../interface/exception.message';
import { HttpMessage } from '../../enums/http-message.enum';
import { BaseCustomException } from './abstract-base.exception';

export abstract class AbstractConflictResourceException extends BaseCustomException {
  constructor(
    private readonly path: string,
    private readonly customMsg: string
  ) {
    super(HttpMessage.CONFLICT, HttpStatus.CONFLICT);
  }

  getError(): ConflictResourceExceptionMessage[] {
    const exceptionMessage = [];
    exceptionMessage.push({
      path: this.path,
      message: this.customMsg
    });
    return exceptionMessage;
  }
}
