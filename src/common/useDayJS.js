import dayjs from 'dayjs';

import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(timezone);
import localizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(localizedFormat);
import localeData from 'dayjs/plugin/localeData';
dayjs.extend(localeData);
import weekday from 'dayjs/plugin/weekday';
dayjs.extend(weekday);
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

import 'dayjs/locale/en';
import 'dayjs/locale/nl';
dayjs.locale('nl');

export const createDateFromFormat = (date, format) => dayjs(date, format ?? 'YYYY-MM-DD');
export const createDatetimeFromFormat = (datetime, format) => dayjs(datetime, format ?? 'YYYY-MM-DD HH:mm:ss');
export const now = () => dayjs();
export const dateToTimezone = (datetime, timezone) => dayjs.tz(datetime, timezone);
export const formatDate = (date, format) => date.format(format ?? 'L LTS');
export const setUTCMode = () => dayjs.utc();
export const setLocalMode = () => dayjs.local();
export const months = () => dayjs.months();
export const daysInMonths = () => dayjs.daysInMonth();
export const startOfMonth = (date) => date.startOf('M');
export const weekdays = () => dayjs.weekdays(true);
export const monthsShort = () => dayjs.monthsShort();
export const weekdaysShort = () => dayjs.weekdaysShort(true);
// TODO: Remove all functions above

export default dayjs;
