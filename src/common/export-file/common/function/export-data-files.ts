import * as ExcelJS from 'exceljs';
import { ExportFileDto } from '../../dto/export-file.dto';
import { FormatType } from '../enum/export.enum';
import { ColumnDefinitionDto } from '../../dto/column-definition.dto';
import { exportExcelFileStream, getRows } from './export-function';

export const exportDataFiles = async (
  exportType: string,
  dataTableName: string,
  exportFileDto: ExportFileDto,
  data: any
): Promise<void> => {
  const workbook: ExcelJS.Workbook = new ExcelJS.Workbook();
  const worksheet: ExcelJS.Worksheet = workbook.addWorksheet(
    dataTableName.toLocaleLowerCase()
  );

  // Add custom headers to the worksheet
  // Add "No" column definition as the first element
  const columnDefinitions = exportFileDto.headers;
  columnDefinitions.unshift({
    header: 'No',
    key: 'no'
  });
  const headers: string[] = columnDefinitions.map((column) => column.header);
  const headerRow = worksheet.addRow(headers);

  // Set properties for the header row
  headerRow.eachCell((cell) => {
    cell.font = { bold: true, size: 12 };
  });
  headerRow.alignment = {
    horizontal: 'center',
    vertical: 'middle'
  };
  headerRow.height = 25;
  const rows = getRows(data, columnDefinitions);
  const rowData = worksheet.addRows(rows);

  rowData.forEach((row) => {
    row.eachCell((cell, index: number) => {
      cell.alignment = {
        vertical: 'middle'
      };
      if (index === 1) {
        cell.alignment = {
          horizontal: 'center'
        };
      }
    });
  });

  // Format to currency.
  formatColumnsToCurrency(worksheet, exportFileDto);

  // Auto resize all columns
  worksheet.columns.forEach((column: Partial<ExcelJS.Column>) => {
    let maxLength: number = 4;
    column.eachCell((cell) => {
      const cellLength = cell.value ? String(cell.value).trim().length : 0;
      maxLength = Math.max(maxLength, cellLength);
    });
    column.width = maxLength + 2;
  });
  worksheet.eachRow((row) => (row.height = 20));
  return await exportExcelFileStream(exportType, data, workbook);
};

const formatColumnsToCurrency = (
  sheet: ExcelJS.Worksheet,
  exportDto: ExportFileDto
) => {
  const currencyDollarFormat: string = '"$ "#,##0.000';
  const currencyRielFormat: string = '"KHR "#,##0';
  const headers: ColumnDefinitionDto[] = exportDto.headers;
  const headerFormats = {};
  headers.forEach((header, index) => {
    const columnNumber: number = index + 1; // +1 Because index count from 0
    if (header.formatType === FormatType.USD) {
      headerFormats[columnNumber] = currencyDollarFormat;
    } else if (header.formatType === FormatType.KHR) {
      headerFormats[columnNumber] = currencyRielFormat;
    }
  });

  sheet.eachRow((row, rowNumber) => {
    if (rowNumber !== 1) {
      row.eachCell((cell, colNumber) => {
        if (headerFormats[colNumber] && cell.value !== '-') {
          cell.value = parseFloat(cell.value.toString());
          cell.numFmt = headerFormats[colNumber];
        }
      });
    }
  });
};
