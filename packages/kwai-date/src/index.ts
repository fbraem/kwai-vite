import dayjs from 'dayjs';

// Load all necessary extensions
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';
import localizedFormat from 'dayjs/plugin/localizedFormat.js';
import localeData from 'dayjs/plugin/localeData.js';
import weekday from 'dayjs/plugin/weekday.js';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';

// Set the locale
import 'dayjs/locale/en.js';
import 'dayjs/locale/nl.js';
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localizedFormat);
dayjs.extend(localeData);
dayjs.extend(weekday);
dayjs.extend(customParseFormat);
// TODO: For now, use the nl locale, in the future this must be configurable.
dayjs.locale('nl');

export interface DateType {
    format(format: string): string
}

function wrapDayjs(d: dayjs.Dayjs): Readonly<DateType> {
  function format(format: string = 'YYYY-MM-DD'): string {
    return d.format(format);
  }

  return Object.freeze({
    format,
  });
}

export function createDate(value?: string, fmt: string = 'YYYY-MM-DD'): Readonly<DateType> {
  return wrapDayjs(value ? dayjs(value, fmt) : dayjs());
}

export function createDatetime(value?: string, fmt: string = 'YYYY-MM-DD HH:mm:ss'): Readonly<DateType> {
  return createDate(value, fmt);
}

export function createDateTimeFromUTC(value: string, timezone: string, fmt: string = 'YYYY-MM-DD HH:mm:ss'): Readonly<DateType> {
  return wrapDayjs(dayjs.utc(value, fmt).tz(timezone));
}

export function now(): Readonly<DateType> {
  return createDate();
}
