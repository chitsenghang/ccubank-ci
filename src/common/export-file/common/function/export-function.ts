/* eslint-disable no-case-declarations */
/* eslint-disable no-fallthrough */
import * as ExcelJS from 'exceljs';
import { Response } from 'express';
import { ResourceBadRequestException } from '../../../exceptions/badRequest.exception';
import { ExportDataTypeEnum } from '../enum/export.enum';
import { ColumnDefinitionDto } from '../../dto/column-definition.dto';

export const exportExcelFileStream = async (
  exportType: string,
  _data: any,
  wb: ExcelJS.Workbook,
  res?: Response
): Promise<void> => {
  try {
    switch (exportType) {
      case ExportDataTypeEnum.EXCEL:
        res.setHeader(
          'Content-Type',
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        );
        await wb.xlsx.write(res);
        break;
      case ExportDataTypeEnum.CSV:
        await wb.csv.write(res);
        break;
      default:
        throw new ResourceBadRequestException(
          exportType,
          `export type ${exportType} not supported`
        );
    }
  } catch (error: any) {
    res.status(400).json({ message: `Error exporting file: ${error.message}` });
  }
};

const getValueFromProp = (keys: string[], data: any): any => {
  const arrayNestedObjectRex = /\[\d+\]/;
  let nestedValue: any = data;
  for (const key of keys) {
    if (arrayNestedObjectRex.test(key)) {
      const index: string = key.match(/\d+/)[0];
      const arrayKey: string = key.split('[')[0];
      nestedValue = nestedValue[arrayKey][index] ?? '-';
    } else if (key.match(/`|'/) && key.match(/ /)) {
      return key.at(1); // get space
    } else if (key.match(/`|'/)) {
      return key.replace(/['|`]/g, ``); // remove `` and ''
    } else {
      nestedValue = nestedValue[key] ?? '-';
    }
  }
  return nestedValue;
};

const splitProperty = (path: string, commaRegex: RegExp): string[] => {
  if (commaRegex.test(path)) {
    return path.split(',');
  } else {
    return path.split('.');
  }
};

const getNestedProperty = (data: any, path: string): string => {
  const commaRegex = /,/;
  const keys: string[] = splitProperty(path, commaRegex);
  let result = ``;
  if (keys.length) {
    if (commaRegex.test(path)) {
      const concatKeys: string[][] = keys.map((path) =>
        splitProperty(path, commaRegex)
      );
      for (const concatKey of concatKeys) {
        result += getValueFromProp([...concatKey], data);
      }
    } else {
      result = getValueFromProp(keys, data);
    }
  }
  return result;
};

export const getRows = (
  data: any,
  columnDefinitions: ColumnDefinitionDto[]
): any => {
  const rows = [];
  data.forEach((item: any) => {
    rows.push(generateColumns(columnDefinitions, item));
  });
  return rows;
};

const generateColumns = (
  columnDefinitions: ColumnDefinitionDto[],
  parentData: any
): any => {
  return columnDefinitions.map((column: ColumnDefinitionDto) => {
    return getNestedProperty(parentData, column.key);
  });
};
