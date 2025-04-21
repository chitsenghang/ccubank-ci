import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { MediaService } from './service/media.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { Media } from './entity/media.entity';

@ApiBearerAuth()
@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body() createMediaDto: CreateMediaDto,
    @UploadedFile()
    file: Express.Multer.File
  ): Promise<Media> {
    return this.mediaService.upload(createMediaDto, file);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Media> {
    return this.mediaService.findOneIfExist(id);
  }

  @Get('/download/:filename')
  async download(@Param('filename') filename: string): Promise<string> {
    return this.mediaService.download(filename);
  }
}
