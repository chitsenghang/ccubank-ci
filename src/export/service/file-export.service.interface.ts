import { FileExportDto, FileExportResult } from '../dto/file-export.dto';

export interface IFileExportService {
  generateFile(exportDto: FileExportDto): Promise<FileExportResult>;

  generateExcel(exportDto: FileExportDto): Promise<FileExportResult>;
}
