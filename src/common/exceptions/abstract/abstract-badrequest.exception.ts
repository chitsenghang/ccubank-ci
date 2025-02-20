import { HttpStatus } from '@nestjs/common';
import { BadRequestExceptionMessage } from '../../interface/exception.message';
import { HttpMessage } from '../../enums/http-message.enum';
import { BaseCustomException } from './abstract-base.exception';

export abstract class AbstractBadRequestException extends BaseCustomException {
  constructor(
    private readonly path: string,
    private readonly customMsg: string | number
  ) {
    super(HttpMessage.BAD_REQUEST, HttpStatus.BAD_REQUEST);
  }

  getError(): BadRequestExceptionMessage[] {
    const exceptionMessage = [];
    exceptionMessage.push({
      path: this.path,
      message: this.customMsg
    });
    return exceptionMessage;
  }
}
