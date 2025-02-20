import { resolve } from 'path';
import { EnvironmentEnum } from '../common/enums/environment.enum';

const envFile =
  process.env.NODE_ENV === EnvironmentEnum.LOCAL
    ? resolve(process.cwd(), '.env')
    : resolve(process.cwd(), `.env.${process.env.NODE_ENV}`);

export const loadEnvConfig: string = envFile;
