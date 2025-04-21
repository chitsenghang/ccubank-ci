import { DataSource, EntityManager, Repository } from 'typeorm';
import { TransactionDecorator } from '../interface/transactional-descriptor.interface';

export function Transactional() {
  // eslint-disable-next-line func-names
  return function (
    target: any,
    _propertyKey: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    const originalMethod = descriptor.value;

    // eslint-disable-next-line func-names
    descriptor.value = async function (...args: any[]) {
      const self = this as TransactionDecorator & {
        transactionManager?: EntityManager;
      };
      const dataSource: DataSource = self.dataSource;

      if (!dataSource) {
        throw new Error(
          `DataSource not found in ${target.constructor.name}. Ensure it is injected.`
        );
      }

      // Check if already in a transaction
      if (self.transactionManager) {
        return originalMethod.apply(this, args);
      }

      // Start a new transaction
      return dataSource.transaction(async (manager: EntityManager) => {
        try {
          self.transactionManager = manager;

          // Assign transaction manager to repositories
          Object.values(self).forEach((service) => {
            if (
              service instanceof Repository ||
              service?.constructor?.name.includes('Service')
            ) {
              (service as any).transactionManager = manager;
            }
          });

          return await originalMethod.apply(this, args);
        } finally {
          // Clean up only if we set the transaction manager
          if (self.transactionManager === manager) {
            self.transactionManager = undefined;

            // Cleanup repositories and services
            Object.values(self).forEach((service) => {
              if (
                service instanceof Repository ||
                service?.constructor?.name.includes('Service')
              ) {
                (service as any).transactionManager = undefined;
              }
            });
          }
        }
      });
    };

    return descriptor;
  };
}
