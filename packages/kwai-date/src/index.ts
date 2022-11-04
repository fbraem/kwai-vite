import dayjs from 'dayjs';

// Load all necessary extensions
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import localeData from 'dayjs/plugin/localeData';
import weekday from 'dayjs/plugin/weekday';
import customParseFormat from 'dayjs/plugin/customParseFormat';

// Set the locale
import 'dayjs/locale/en';
import 'dayjs/locale/nl';
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localizedFormat);
dayjs.extend(localeData);
dayjs.extend(weekday);
dayjs.extend(customParseFormat);
// TODO: For now, use the nl locale, in the future this must be configurable.
dayjs.locale('nl');

interface DateType {
    format(format: string): string
}

export function createDate(value?: string, fmt: string = 'YYYY-MM-DD'): Readonly<DateType> {
  const d = value ? dayjs(value, fmt) : dayjs();

  function format(format: string = 'YYYY-MM-DD'): string {
    return d.format(format);
  }

  return Object.freeze({
    format,
  });
}

export function createDatetime(value?: string, fmt: string = 'YYYY-MM-DD HH:mm:ss'): Readonly<DateType> {
  return createDate(value, fmt);
}

export function now(): Readonly<DateType> {
  return createDate();
}
