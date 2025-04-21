import { ValueTransformer } from 'typeorm/decorator/options/ValueTransformer';
import { DateTimeUtilService } from '../utils/date-utils';
import {
  DEFAULT_DATE_FORMAT,
  DEFAULT_DATE_TIME_FORMAT
} from '../dto/default-date-format';

export class DateTimeTransformer implements ValueTransformer {
  from(value: string): string {
    if (value) {
      return DateTimeUtilService.formatDate(value, DEFAULT_DATE_TIME_FORMAT);
    }
    return value;
  }

  to(value: string): string {
    return value;
  }
}

export class DateTransformer implements ValueTransformer {
  from(value: string): string {
    if (value) {
      return DateTimeUtilService.formatDate(value, DEFAULT_DATE_FORMAT);
    }
    return value;
  }

  to(value: string): string {
    return value;
  }
}
