import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiBearerAuth } from '@nestjs/swagger';
import { FileExportDto } from './dto/file-export.dto';
import { FileExportService } from './service/file-export.service';

@ApiBearerAuth()
@Controller('export')
export class FileExportController {
  constructor(private readonly fileExportService: FileExportService) {}

  @Post()
  async exportFile(
    @Body() exportDto: FileExportDto,
    @Res() response: Response
  ): Promise<void> {
    const { stream, fileName } =
      await this.fileExportService.generateFile(exportDto);
    response.set({
      'Content-Disposition': `attachment; filename="${fileName}"`,
      'Content-Type': this.getContentType(exportDto.format)
    });

    stream.pipe(response);
  }

  private getContentType(format: string): string {
    switch (format) {
      case 'xlsx':
        return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      default:
        return 'application/octet-stream';
    }
  }
}
