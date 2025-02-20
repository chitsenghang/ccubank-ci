import { AbstractForbiddenException } from './abstract';

export class ResourceSystemDefinedException extends AbstractForbiddenException {
  constructor(path: string, msg?: string) {
    super(
      path,
      msg ?? 'You are not allowed to make any changes due to system defined'
    );
  }
}
