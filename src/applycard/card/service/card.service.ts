import { Injectable } from '@nestjs/common';
import { ICardData } from '../mock/card.interface';
import { cards } from '../mock/card.mock.constant';
import { ResourceNotFoundException } from '../../../common/exceptions';
import { ICardService } from './card.service.interface';

@Injectable()
export class CardService implements ICardService {
  findAllCard(): ICardData[] {
    return cards;
  }

  findOneCard(id: number): ICardData {
    const card: ICardData | undefined = cards.find(
      (value): boolean => value.id === id
    );
    if (!card) {
      throw new ResourceNotFoundException('card', id);
    }

    return card;
  }
}
