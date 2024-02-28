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

export function convertManuallyToBrazilTimezone(date: Date) {
  const buildDate = new Date(date)
  buildDate.setHours(buildDate.getHours() - 3)

  return buildDate
}

export function unconvertManuallyToBrazilTimezone(date: Date) {
  const buildDate = new Date(date)
  buildDate.setHours(buildDate.getHours() + 3)

  return buildDate
}
