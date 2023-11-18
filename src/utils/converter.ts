import { utcToZonedTime } from 'date-fns-tz'

export function convertIsoToDate(date: Date) {
  const timeZone = 'America/Sao_Paulo'
  const brazilDate = utcToZonedTime(date, timeZone)
  return brazilDate
}

export function convertDateToTimezone(date: Date) {
  const newDate = new Date(date)
  return new Date(
    newDate.getUTCFullYear(),
    newDate.getUTCMonth(),
    newDate.getUTCDate(),
    newDate.getUTCHours(),
    newDate.getUTCMinutes(),
  )
}
