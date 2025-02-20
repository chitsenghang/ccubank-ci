import * as winston from 'winston';

export class BaseLogger {
  private readonly logger: winston.Logger;

  constructor(log: winston.Logger) {
    this.logger = log;
  }

  log(message: string) {
    this.logger.log('info', message);
  }

  error(message: string, trace: string) {
    this.logger.error(message, trace);
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }
}
