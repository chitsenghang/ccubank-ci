import { PassThrough } from 'stream';
import * as ExcelJS from 'exceljs';
import { Injectable } from '@nestjs/common';
import Worksheet from 'exceljs/index';
import { ResourceBadRequestException } from 'src/common/exceptions/badRequest.exception';
import { DateTimeUtilService } from '../../common/utils/date-utils';
import { FileExportDto, FileExportResult } from '../dto/file-export.dto';
import { IFileExportService } from './file-export.service.interface';

@Injectable()
export class FileExportService implements IFileExportService {
  async generateFile(exportDto: FileExportDto): Promise<FileExportResult> {
    const { data, format: fileFormat } = exportDto;
    if (!data || !Array.isArray(data) || data.length === 0) {
      throw new ResourceBadRequestException('Invalid or empty data provided');
    }

    switch (fileFormat) {
      case 'xlsx':
        return this.generateExcel(exportDto);
      default:
        throw new ResourceBadRequestException(
          `Unsupported format: ${fileFormat}`
        );
    }
  }

  async generateExcel(exportDto: FileExportDto): Promise<FileExportResult> {
    const { data, title } = exportDto;
    const workbook: ExcelJS.Workbook = new ExcelJS.Workbook();
    const worksheet: Worksheet = workbook.addWorksheet(title);

    if (data.length) {
      const flattenedData: Record<string, object>[] = data.map(
        (item: object): Record<string, object> => this.flattenObject(item)
      );
      const columns: string[] = [
        'No',
        ...new Set(flattenedData.flatMap(Object.keys))
      ];
      worksheet.columns = columns.map((key) => {
        const formattedHeader: string = this.formatHeaderName(key);
        const maxWidth: number = Math.max(
          formattedHeader.length,
          ...flattenedData.map((row): number => String(row[key] || '').length)
        );

        return {
          header: formattedHeader,
          key,
          width: maxWidth + 2
        };
      });

      worksheet.getRow(1).eachCell((cell: ExcelJS.Cell): void => {
        cell.font = { bold: true };
        cell.alignment = { horizontal: 'left' };
      });

      flattenedData.forEach((row, index): void => {
        const rowData = {
          No: index + 1,
          ...row
        };
        worksheet.addRow(rowData).eachCell((cell: ExcelJS.Cell): void => {
          cell.alignment = { horizontal: 'left' };
        });
      });

      const stream: PassThrough = new PassThrough();
      await workbook.xlsx.write(stream);
      stream.end();

      return {
        stream,
        fileName: `${title}_${DateTimeUtilService.getCurrentDate()}.xlsx`
      };
    }
  }

  private flattenObject = (obj: object, prefix = ''): Record<string, object> =>
    Object.entries(obj).reduce((acc, [key, value]) => {
      const newKey: string = prefix ? `${prefix}.${key}` : key;
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        return { ...acc, ...this.flattenObject(value, newKey) };
      }
      return { ...acc, [newKey]: value };
    }, {});

  private formatHeaderName = (key: string): string =>
    key
      .replace(/\./g, ' ')
      .replace(/([a-z])([A-Z])/g, '$1 $2') // Split camelCase
      .replace(/^./, (char): string => char.toUpperCase()); // Capitalize first letter
}
