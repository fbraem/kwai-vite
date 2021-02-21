import dayjs from 'dayjs';

import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(timezone);
import localizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(localizedFormat);

// dayjs.utc();

import locale_en from 'dayjs/locale/en';
import locale_nl from 'dayjs/locale/nl';
dayjs.locale('nl');

export const createDateFromFormat = (date, format) => dayjs(date, format ?? 'YYYY-MM-DD');
export const createDatetimeFromFormat = (datetime, format) => dayjs(datetime, format ?? 'YYYY-MM-DD HH:mm:ss');
export const now = () => dayjs();
export const dateToTimezone = (datetime, timezone) => dayjs.tz(datetime, timezone);
export const formatDate = (date, format) => date.format(format ?? 'L LTS');
export const setUTCMode = () => dayjs.utc();
export const setLocalMode = () => dayjs.local();
export const months = () => dayjs.months();
