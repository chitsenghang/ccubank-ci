import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { DataSource } from 'typeorm';
import { Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { loadEnvConfig } from './config/env.config';

dotenv.config({
  path: loadEnvConfig
});
const AppDataSource = new DataSource({
  migrationsTableName: 'migrations',
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  logging: false,
  synchronize: false,
  entities: [__dirname + '/entity/*.entity{.ts,.js}'],
  migrations: [__dirname + '/database/**/*{.ts,.js}'],
  namingStrategy: new SnakeNamingStrategy(),
  poolSize: 10,
  cache: {
    type: 'redis',
    options: {
      socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT)
      }
    },
    ignoreErrors: true
  }
});

AppDataSource.initialize()
  .then(() => {
    Logger.log('Data Source has been initialized!');
  })
  .catch((err) => {
    Logger.error('Error during Data Source initialization', err);
  });

export default AppDataSource;
