import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { Request } from 'express';
import { map, Observable } from 'rxjs';
import {
  DEFAULT_PAGINATION_LIMIT,
  DEFAULT_PAGINATION_OFFSET
} from '../constants/pagination.constants';
import { ResourceInternalServerError } from '../exceptions/internal-server-error.exception';
import {
  isPaginationResponse,
  PageMeta,
  PaginationResponse,
  Response,
  ResponseData
} from '../interface/response.interface';
import { RequestMethodEnums } from '../enums/request-method.enum';

@Injectable()
export class ResponseMappingInterceptor<T extends ResponseData>
  implements NestInterceptor<T, Response>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<Response> {
    const Request: Request = context.switchToHttp().getRequest();
    const method = Request.method;

    const offset = Number(Request.query.offset) || DEFAULT_PAGINATION_OFFSET;
    const limit = Number(Request.query.limit) || DEFAULT_PAGINATION_LIMIT;
    const keywords = (Request.query.keywords as string) ?? '';

    return next.handle().pipe(
      map((payload: T | PaginationResponse<T>) => {
        if (isPaginationResponse(payload)) {
          const totalCount = payload?.totalCount ?? 0;
          const currentPage =
            offset >= totalCount ? 0 : Math.floor(offset / limit) + 1;
          const totalPage = Math.ceil(totalCount / limit);
          const lastPage = totalPage;
          const pageMeta: PageMeta = {
            keywords,
            totalCount,
            pageSize: limit,
            currentPage,
            nextPage:
              currentPage >= lastPage
                ? null
                : currentPage !== 0
                  ? currentPage + 1
                  : null,
            prevPage: currentPage <= 1 ? null : currentPage - 1,
            lastPage
          };
          const mappedData: Response = {
            data: payload?.data,
            pageMeta
          };
          return mappedData;
        }
        switch (method) {
          case RequestMethodEnums.POST:
            if (Buffer.isBuffer(payload)) {
              return instanceToPlain(payload);
            } else if (payload?.id) {
              return {
                data: { id: payload?.id }
              };
            } else {
              return {
                data: instanceToPlain(payload) as T
              };
            }
          case RequestMethodEnums.PUT:
          case RequestMethodEnums.PATCH: {
            return {
              data: { id: payload.id }
            };
          }
          case RequestMethodEnums.GET: {
            return {
              data: instanceToPlain(payload) as T
            };
          }

          case RequestMethodEnums.DELETE: {
            return;
          }

          default:
            throw new ResourceInternalServerError(`Interceptor gone wrong!`);
        }
      })
    );
  }
}
