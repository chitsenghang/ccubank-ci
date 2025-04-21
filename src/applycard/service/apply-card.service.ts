import { Injectable, Logger } from '@nestjs/common';
import { Express } from 'express';
import { DataSource } from 'typeorm';
import * as _ from 'lodash';
import { ApplyCard } from '../entity/apply-card.entity';
import { ApplyCardPaginationQueryDto } from '../dto/apply-card-pagination-query.dto';
import { PaginationResponse } from '../../common/interface/response.interface';
import { ApplyCardRepository } from '../repository/apply-card.repository';
import { CreateApplyCardDto } from '../dto/create-apply-card.dto';
import { MediaService } from '../../media/service/media.service';
import { Media } from '../../media/entity/media.entity';
import { EmailService } from '../../otp/email/email.service';
import { ApplyCardDetail } from '../applycarddetail/entity/apply-card-detail.entity';
import { ApplyCardDetailService } from '../applycarddetail/service/apply-card-detail.service';
import { Transactional } from '../../common/decorators/transactional.decorator';
import { CreateMediaDto } from '../../media/dto/create-media.dto';
import { MediaEntityTypeEnum } from '../../common/enums/media-entity-type.enum';
import { SubCardTypeEnum } from '../enum/card-type.enum';
import { applyCardValidation } from '../validator/apply-card.validation';
import { CardService } from '../card/service/card.service';
import { ModuleTypeEnum } from '../../otp/enum/module-type';
import { ICardData } from '../card/mock/card.interface';
import { formatBalance } from '../../common/utils/format-balance';
import { ApplyCardDetailRepository } from '../applycarddetail/repository/apply-card-detail.repository';
import { IApplyCardService } from './apply-card.service.interface';

@Injectable()
export class ApplyCardService implements IApplyCardService {
  private readonly ENTITY_NAME = 'apply card';

  constructor(
    private readonly dataSource: DataSource,
    private readonly applyCardDetailRepository: ApplyCardDetailRepository,
    private readonly applyCardRepository: ApplyCardRepository,
    private readonly applyCardDetailService: ApplyCardDetailService,
    private readonly cardService: CardService,
    private readonly mediaService: MediaService,
    private readonly emailService: EmailService
  ) {}

  @Transactional()
  async createApplyCard(
    subCardType: SubCardTypeEnum,
    createApplyCardDto: CreateApplyCardDto,
    file: Express.Multer.File
  ): Promise<ApplyCard> {
    applyCardValidation(
      subCardType,
      createApplyCardDto.alreadyHaveAccount,
      createApplyCardDto.enterAccountLinkWithCard
    );
    const applyCard: ApplyCard =
      await this.applyCardRepository.saveApplyCard(createApplyCardDto);

    const details: ApplyCardDetail[] = createApplyCardDto.cardIds.map(
      (cardId: number): ApplyCardDetail => {
        this.cardService.findOneCard(cardId);
        return this.applyCardDetailService.createApplyCardDetail({
          applyCard: { id: applyCard.id },
          cardId
        });
      }
    );
    await this.applyCardDetailService.saveAllApplyCardDetail(details);

    if (file) {
      const createMediaDto: CreateMediaDto = {
        entityId: +applyCard.id,
        entityType: MediaEntityTypeEnum.APPLY_CARD,
        file: createApplyCardDto.file
      };
      const media: Media = await this.mediaService.upload(createMediaDto, file);
      applyCard.documentIncome = media.name;
      await this.applyCardRepository.saveWithCreateEntity(applyCard);
    }

    const applyCardCreated: ApplyCard = await this.findOneApplyCard(
      applyCard.id
    );
    const applyCardForMailTemplate = this.transformApplyCardForMailTemplate(
      applyCardCreated,
      subCardType
    );

    this.emailService
      .sendEmailByModule(applyCardForMailTemplate, ModuleTypeEnum.APPLY_CARD)
      .catch((error): void => {
        Logger.error(`Failed to send email:`, error);
      });

    return applyCardCreated;
  }

  async findAllApplyCard(
    applyCardPaginationDto: ApplyCardPaginationQueryDto
  ): Promise<PaginationResponse<ApplyCard>> {
    const { data } = await this.applyCardRepository.findAllApplyCard(
      applyCardPaginationDto
    );

    const transformedData = await Promise.all(
      data.map((card) => this.transformApplyCard(card))
    );

    return {
      data: transformedData
    } as any;
  }

  async findOneApplyCard(id: number): Promise<ApplyCard> {
    return this.applyCardRepository.findOneApplyCard(id, this.ENTITY_NAME);
  }

  private async transformApplyCard(applyCard: ApplyCard) {
    const applyCardDetail = await Promise.all(
      applyCard.applyCardDetail.map((data) =>
        this.cardService.findOneCard(data.cardId)
      )
    );

    return {
      ...applyCard,
      applyCardDetail
    };
  }

  private transformApplyCardForMailTemplate(
    applyCard: ApplyCard,
    subCardType: SubCardTypeEnum
  ) {
    const cardDetails = applyCard.applyCardDetail.map((data) => {
      const card: ICardData = this.cardService.findOneCard(data.cardId);
      return {
        title: card.title,
        type: _.capitalize(card.type)
      };
    });
    const groupedCards = _.groupBy(cardDetails, 'type');
    const groupedCardArray = Object.keys(groupedCards).map((type) => ({
      type,
      cards: groupedCards[type]
    }));

    return {
      ...applyCard,
      requestCreditAmount: formatBalance(applyCard.requestCreditAmount),
      incomeMonthly: formatBalance(applyCard.incomeMonthly),
      subCardType: subCardType,
      groupedCardDetail: groupedCardArray
    };
  }
}
