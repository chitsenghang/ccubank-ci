import { ExceptionMessage } from '../../interface/exception.message';

export abstract class BaseCustomException extends Error {
  readonly status: number;

  constructor(mes: string, status: number) {
    super(mes);
    this.status = status;
  }

  abstract getError(): ExceptionMessage[];
}
