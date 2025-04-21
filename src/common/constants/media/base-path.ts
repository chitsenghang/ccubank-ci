import { resolve } from 'path';
import { EnvironmentEnum } from '../../enums/environment.enum';

export const basePath: string =
  process.env.NODE_ENV === EnvironmentEnum.LOCAL
    ? resolve(process.cwd(), 'public')
    : resolve(process.cwd(), 'public');
