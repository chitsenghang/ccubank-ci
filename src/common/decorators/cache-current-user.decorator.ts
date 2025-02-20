import { RequestContextService } from '../../requestcontext/request-context.service';
import { CacheServiceDecorator } from '../interface/cache-descriptor.interface';
import { CacheService } from '../../cache/cache.service';

export const CacheCurrentUser =
  () =>
  (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    // eslint-disable-next-line func-names
    descriptor.value = async function (...args: any[]) {
      const cacheService: CacheService = (this as CacheServiceDecorator)
        .cacheService;
      const userId: number = RequestContextService.getCurrentUserId();
      const currentUserKey = `current_user:${userId}`;
      const cachedData = await cacheService.getCache(currentUserKey);
      if (cachedData) {
        return cachedData;
      }
      const result = await originalMethod.apply(this, args);
      await cacheService.setCache(
        currentUserKey,
        result,
        +process.env.CACHE_TTL
      );
      return result;
    };

    return descriptor;
  };
