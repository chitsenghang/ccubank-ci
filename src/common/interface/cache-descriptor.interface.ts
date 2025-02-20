import { CacheService } from '../../cache/cache.service';

export interface CacheServiceDecorator extends CacheService {
  cacheService: CacheService;
}
