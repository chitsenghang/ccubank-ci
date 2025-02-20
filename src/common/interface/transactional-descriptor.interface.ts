import { DataSource } from 'typeorm';

export interface TransactionDecorator {
  dataSource: DataSource;
}
