import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ResponseMappingInterceptor } from '../../common/interceptors/response-mapping.interceptor';
import { CardService } from './service/card.service';
import { ICardData } from './mock/card.interface';

@UseInterceptors(ResponseMappingInterceptor)
@ApiTags('ApplyCard')
@Controller('self/card')
export class SelfCardController {
  constructor(private readonly cardService: CardService) {}

  @Get()
  findAllCard(): ICardData[] {
    return this.cardService.findAllCard();
  }

  @Get(':id')
  findOneCard(@Param('id') id: number): ICardData {
    return this.cardService.findOneCard(id);
  }
}
