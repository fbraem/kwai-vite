import dayjs from "dayjs";

// Load all necessary extensions
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)
import timezone from 'dayjs/plugin/timezone'
dayjs.extend(timezone)
import localizedFormat from 'dayjs/plugin/localizedFormat'
dayjs.extend(localizedFormat)
import localeData from 'dayjs/plugin/localeData'
dayjs.extend(localeData)
import weekday from 'dayjs/plugin/weekday'
dayjs.extend(weekday)
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)

// Set the locale
import 'dayjs/locale/en'
import 'dayjs/locale/nl'
//TODO: For now, use the nl locale, in the future this must be configurable.
dayjs.locale('nl')

interface DateType {
    format(format: string): string
}

export function createDate(value?: string, fmt: string = 'YYYY-MM-DD'): Readonly<DateType> {
    let d = value ? dayjs(value, fmt) : dayjs()

    function format(format: string = 'YYYY-MM-DD'): string {
        return d.format(format)
    }

    return Object.freeze({
        format
    })
}

export function createDatetime(value?: string, fmt: string = 'YYYY-MM-DD HH:mm:ss'): Readonly<DateType> {
    return createDate(value, fmt)
}

export function now(): Readonly<DateType> {
    return createDate()
}
