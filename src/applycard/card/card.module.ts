import { Module } from '@nestjs/common';
import { SelfCardController } from './self-card.controller';
import { CardService } from './service/card.service';

@Module({
  controllers: [SelfCardController],
  providers: [CardService]
})
export class CardModule {}
