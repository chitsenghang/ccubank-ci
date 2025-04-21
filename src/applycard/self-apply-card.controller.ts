import {
  Body,
  Controller,
  Post,
  Query,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { ResponseMappingInterceptor } from '../common/interceptors/response-mapping.interceptor';
import { ApplyCardService } from './service/apply-card.service';
import { CreateApplyCardDto } from './dto/create-apply-card.dto';
import { ApplyCard } from './entity/apply-card.entity';
import { SubCardTypeEnum } from './enum/card-type.enum';

@UseInterceptors(ResponseMappingInterceptor)
@ApiTags('ApplyCard')
@Controller('self/apply-card')
export class SelfApplyCardController {
  constructor(private readonly applyCardService: ApplyCardService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  applyForCard(
    @Query('subCardType') subCardType: SubCardTypeEnum,
    @Body() createApplyCardDto: CreateApplyCardDto,
    @UploadedFile() file: Express.Multer.File
  ): Promise<ApplyCard> {
    return this.applyCardService.createApplyCard(
      subCardType,
      createApplyCardDto,
      file
    );
  }
}
