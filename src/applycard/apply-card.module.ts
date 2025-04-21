import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaService } from '../media/service/media.service';
import { MediaRepository } from '../media/repository/media.repository';
import { MediaValidation } from '../media/validators/media.validation';
import { FileExtensionValidationPipe } from '../media/validators/file-extension.validation';
import { EmailService } from '../otp/email/email.service';
import { ApplyCardService } from './service/apply-card.service';
import { SelfApplyCardController } from './self-apply-card.controller';
import { ApplyCard } from './entity/apply-card.entity';
import { ApplyCardRepository } from './repository/apply-card.repository';
import { ApplyCardDetail } from './applycarddetail/entity/apply-card-detail.entity';
import { ApplyCardDetailService } from './applycarddetail/service/apply-card-detail.service';
import { ApplyCardDetailRepository } from './applycarddetail/repository/apply-card-detail.repository';
import { CardService } from './card/service/card.service';
import { ApplyCardController } from './card.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ApplyCard, ApplyCardDetail])],
  providers: [
    ApplyCardService,
    ApplyCardRepository,
    ApplyCardDetailService,
    ApplyCardDetailRepository,
    MediaService,
    CardService,
    MediaRepository,
    MediaValidation,
    FileExtensionValidationPipe,
    EmailService
  ],
  controllers: [SelfApplyCardController, ApplyCardController]
})
export class ApplyCardModule {}
