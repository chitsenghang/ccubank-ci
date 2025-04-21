import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplyCardDetail } from './entity/apply-card-detail.entity';
import { ApplyCardDetailService } from './service/apply-card-detail.service';
import { ApplyCardDetailRepository } from './repository/apply-card-detail.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ApplyCardDetail])],
  providers: [ApplyCardDetailService, ApplyCardDetailRepository]
})
export class ApplyCardDetailModule {}
