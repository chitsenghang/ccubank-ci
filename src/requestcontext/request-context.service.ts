import { AsyncLocalStorage } from 'async_hooks';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Request } from 'express';

export interface RequestContext {
  currentUserId?: number;
  requestContext: Request;
}
@Injectable()
export class RequestContextService implements OnModuleInit {
  private static storage: AsyncLocalStorage<RequestContext> =
    new AsyncLocalStorage<RequestContext>();

  static run(context: RequestContext, callback: () => void): void {
    RequestContextService.storage.run(context, callback);
  }

  static setCurrentUserId(userId: number): void {
    const store: RequestContext = RequestContextService.storage.getStore();
    if (store) {
      store.currentUserId = userId;
    }
  }

  static getCurrentUserId(): number | undefined {
    return RequestContextService.storage.getStore()?.currentUserId;
  }

  static getRequest(): Request | undefined {
    return RequestContextService.storage.getStore()?.requestContext;
  }

  onModuleInit(): void {
    RequestContextService.storage = new AsyncLocalStorage<RequestContext>();
  }
}
