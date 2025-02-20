import * as dayjs from 'dayjs';
import { Dayjs } from 'dayjs';
import * as timezone from 'dayjs/plugin/timezone';
import * as utc from 'dayjs/plugin/utc';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';
import * as isBetween from 'dayjs/plugin/isBetween';
import * as duration from 'dayjs/plugin/duration';
import {
  DEFAULT_DATE_FORMAT,
  DEFAULT_DATE_TIME_FORMAT
} from '../dto/default-date-format';
import { TimeZoneEnum } from '../enums/date-time-zone.enum';

dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.extend(customParseFormat);
dayjs.extend(isBetween);
dayjs.extend(duration);
dayjs.tz.setDefault(TimeZoneEnum.PHNOM_PENH);

export class DateTimeUtilService {
  static getCurrentDate(): Dayjs {
    return dayjs().utc(true);
  }

  static getCurrentDateTime(): string {
    return DateTimeUtilService.getCurrentDate().format(
      DEFAULT_DATE_TIME_FORMAT
    );
  }

  static getCurrentDateWithFormat(): string {
    return DateTimeUtilService.getCurrentDate().format(DEFAULT_DATE_FORMAT);
  }

  static getCurrentYear(): number {
    return DateTimeUtilService.getCurrentDate().year();
  }

  static formatDate(date: string | Date, format: string): string {
    return dayjs(date).utc(true).format(format);
  }

  static formatDateOrNull(date: string | Date): string | null {
    const result: string = dayjs(date).utc(true).format(DEFAULT_DATE_FORMAT);
    return result === 'Invalid Date' ? null : result;
  }

  static toDateString(date: string | Date): string {
    return dayjs(date).format('YYYY-MM-DD');
  }

  static toDateTimeString(date: string | Date): string {
    return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
  }

  static toLocalTime(date: Date): Date {
    return dayjs(date).add(7, 'hour').toDate();
  }

  static startOfMonth(date?: Date | string): Date {
    return dayjs(date).startOf('month').toDate();
  }

  static endOfMonth(date?: Date | string): Date {
    return dayjs(date).endOf('month').toDate();
  }

  static firstDayOfMonth(): string {
    return DateTimeUtilService.getCurrentDate()
      .startOf('month')
      .format(DEFAULT_DATE_FORMAT);
  }

  static nextMonth(date?: Date | string): Date {
    return dayjs(date).add(1, 'month').toDate();
  }

  static previousMonth(date?: Date | string): Date {
    return dayjs(date).add(-1, 'month').toDate();
  }

  static getMonth(date?: Date | string): number {
    return dayjs(date).month() + 1;
  }

  static getMonthShort(date?: Date | string): string {
    return dayjs(date).format('MMM').toUpperCase();
  }

  static startOfYear(date?: Date | string): Date {
    return dayjs(date).startOf('year').toDate();
  }

  static endOfYear(date?: Date | string): Date {
    return dayjs(date).endOf('year').toDate();
  }

  static getYear(date?: Date | string): number {
    return dayjs(date).year();
  }

  static startOfDay(date?: Date | string): Date {
    return dayjs(date).startOf('day').toDate();
  }

  static endOfDay(date?: Date | string): Date {
    return dayjs(date).endOf('day').toDate();
  }

  static isSaturday(date: Date | string): boolean {
    return dayjs(date).day() === 6;
  }

  static isSunday(date: Date | string): boolean {
    return dayjs(date).day() === 0;
  }

  static getDurationInDays(start: string | Date, end: string | Date): number {
    return dayjs(end).diff(start, 'day');
  }

  static isSameDay(date1: string | Date, date2: string | Date): boolean {
    return dayjs(date1).isSame(date2, 'day');
  }

  static isSameMonth(date1: string | Date, date2: string | Date): boolean {
    return dayjs(date1).isSame(date2, 'month');
  }

  static minutesToHours(minutes: number): number {
    return Number((minutes / 60).toFixed(2));
  }

  static minutesToHHMM(minutes: number): string {
    return `${Math.floor(minutes / 60)}:${minutes % 60}`;
  }

  static getOverlapDuration(
    intervalAStart: Dayjs,
    intervalAEnd: Dayjs,
    intervalBStart: Dayjs,
    intervalBEnd: Dayjs
  ): number {
    if (
      intervalAEnd.isBefore(intervalBStart) ||
      intervalBEnd.isBefore(intervalAStart)
    ) {
      return dayjs.duration(0).asHours();
    }

    const overlayStart: Dayjs = intervalAStart.isAfter(intervalBStart)
      ? intervalAStart
      : intervalAStart;
    const overlayEnd: Dayjs = intervalAEnd.isBefore(intervalBEnd)
      ? intervalAEnd
      : intervalBEnd;

    return dayjs.duration(overlayEnd.diff(overlayStart)).asHours();
  }
}
