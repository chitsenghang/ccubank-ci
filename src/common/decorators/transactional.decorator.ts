import { DataSource, EntityManager } from 'typeorm';
import { TransactionDecorator } from '../interface/transactional-descriptor.interface';

export function Transactional() {
  // eslint-disable-next-line func-names
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    const originalMethod = descriptor.value;

    // eslint-disable-next-line func-names
    descriptor.value = async function (...args: any[]) {
      const dataSource: DataSource = (this as TransactionDecorator).dataSource;
      if (!dataSource) {
        throw new Error(
          `DataSource not found in ${target.constructor.name}. Ensure it is injected.`
        );
      }

      const transactionManager: EntityManager = (this as any)
        .transactionManager;
      if (transactionManager) {
        return originalMethod.apply(this, args);
      }

      return dataSource.transaction(async (manager: EntityManager) => {
        (this as any).transactionManager = manager;
        try {
          return await originalMethod.apply(this, args);
        } finally {
          (this as any).transactionManager = null;
        }
      });
    };

    return descriptor;
  };
}
