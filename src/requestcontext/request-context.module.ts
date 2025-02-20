import { Module } from '@nestjs/common';
import { RequestContextService } from './request-context.service';

@Module({
  providers: [RequestContextService]
})
export class RequestContextModule {}
