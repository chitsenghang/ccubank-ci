import { resolve } from 'path';
import { EnvironmentEnum } from '../common/enums/environment.enum';

const envFile: string =
  process.env.NODE_ENV === EnvironmentEnum.LOCAL
    ? resolve(process.cwd(), '.env')
    : resolve(process.cwd(), `.env`);

export const loadEnvConfig: string = envFile;
