import {
  DEFAULT_DATE_FORMAT,
  DEFAULT_DATE_HOUR_MINUTE_FORMAT,
  DEFAULT_DATE_TIME_FORMAT,
  DEFAULT_TIME_FORMAT,
  DEFAULT_YEAR_FORMAT
} from '../dto/default-date-format';
import { ResourceBadRequestException } from '../exceptions/badRequest.exception';
import { DateTimeUtilService } from './date-utils';

const DATE_TIME = 'DateTime';

export function validateDateTime(date: string) {
  if (date) {
    isValidDate(date);
  }

  const result: boolean =
    DateTimeUtilService.formatDate(date, DEFAULT_DATE_FORMAT) === date;
  if (result !== true) {
    throw new ResourceBadRequestException(
      `DateTime ${date} doesn't match the format ${DEFAULT_DATE_FORMAT}`
    );
  }
  return DateTimeUtilService.formatDate(date, DEFAULT_DATE_FORMAT);
}

export function fromDateToDateConverter(dateTime: any, type: string) {
  if (dateTime) {
    isValidDate(dateTime);
  }
  const result: boolean =
    DateTimeUtilService.formatDate(dateTime, DEFAULT_DATE_FORMAT) === dateTime;
  if (result !== true) {
    throw new ResourceBadRequestException(
      DATE_TIME,
      `DateTime ${dateTime} doesn't match the format ${DEFAULT_DATE_FORMAT}`
    );
  }
  let temp: any;

  if (type === 'fromDate') {
    temp = dateTime + 'T:00:00:00';
  } else {
    temp = dateTime + 'T:23:59:59';
  }

  return temp;
}

export const customValidateDate = (date: any) => {
  if (date) {
    isValidDate(date);
  }
  const convertDate: boolean =
    DateTimeUtilService.formatDate(date, DEFAULT_DATE_FORMAT) === date;
  if (!convertDate) {
    throw new ResourceBadRequestException(
      DATE_TIME,
      `DateTime ${date} doesn't match the format ${DEFAULT_DATE_FORMAT}`
    );
  }
  return DateTimeUtilService.formatDate(date, DEFAULT_DATE_FORMAT);
};

export const customValidateDateWithDash = (date: string | Date) => {
  const convertDate: boolean =
    DateTimeUtilService.formatDate(date, DEFAULT_DATE_TIME_FORMAT) === date;
  if (!convertDate) {
    throw new ResourceBadRequestException(
      DATE_TIME,
      `DateTime ${date} doesn't match the format ${DEFAULT_DATE_TIME_FORMAT}`
    );
  }
  return (
    DateTimeUtilService.formatDate(date, DEFAULT_DATE_TIME_FORMAT) === date
  );
};

export const customValidationDateHourMinute = (date: string) => {
  const formattedDate: string = DateTimeUtilService.formatDate(
    date,
    DEFAULT_DATE_HOUR_MINUTE_FORMAT
  );

  if (!formattedDate) {
    throw new ResourceBadRequestException(
      DATE_TIME,
      `DateTime ${date} doesn't match the format ${DEFAULT_DATE_HOUR_MINUTE_FORMAT}`
    );
  }
  return formattedDate;
};

export const customValidateTime = (time: string) => {
  const convertCurrentDate = DateTimeUtilService.getCurrentDate();
  const getTime: string[] = time.split(':');
  const storeTime = getTime[0];
  const storeMinute = getTime[1];
  const defaultFormatTime = DEFAULT_TIME_FORMAT;
  // eslint-disable-next-line prettier/prettier
  const formatTime: string = DateTimeUtilService.formatDate(
    `${convertCurrentDate} ${storeTime}:${storeMinute}`,
    DEFAULT_TIME_FORMAT
  );
  if (formatTime !== time) {
    throw new ResourceBadRequestException(
      `Time`,
      `${time} doesn't match the format ${defaultFormatTime}`
    );
  }
  return formatTime;
};

export const checkIsValidYearFormat = (date: string, format?: string) => {
  const year: boolean =
    DateTimeUtilService.formatDate(date, format ?? DEFAULT_YEAR_FORMAT) ===
    date;

  if (year === false) {
    throw new ResourceBadRequestException(
      `Date`,
      `${date} doesn't match the format ${format ?? DEFAULT_YEAR_FORMAT}`
    );
  }
};

export const checkOnlyMonth = (month: number) => {
  if (month > 12) {
    throw new ResourceBadRequestException(
      'month',
      'There is only 12 months in a year'
    );
  }
};

export const isValidDate = (date: Date | string): string => {
  const formattedDate: string = DateTimeUtilService.formatDate(
    date,
    DEFAULT_DATE_FORMAT
  );
  const invalidate: string = DateTimeUtilService.formatDate(
    date,
    formattedDate
  );
  const newDate = new Date(invalidate);
  if (isNaN(newDate.getTime())) {
    throw new ResourceBadRequestException(`${date} Invalid Date`);
  }

  return invalidate;
};

export const validateDateTimeFormat = (
  date: string | Date,
  format?: string
) => {
  const dateTime: string = DateTimeUtilService.formatDate(
    date,
    format ?? DEFAULT_DATE_TIME_FORMAT
  );

  if (dateTime === 'Invalid Date') {
    throw new ResourceBadRequestException(
      'DateTime does not match default format',
      DEFAULT_DATE_TIME_FORMAT
    );
  }

  return dateTime;
};
