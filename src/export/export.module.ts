import { Module } from '@nestjs/common';
import { FileExportController } from './file-export.controller';
import { FileExportService } from './service/file-export.service';

@Module({
  controllers: [FileExportController],
  providers: [FileExportService]
})
export class ExportModule {}
