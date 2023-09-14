import { utcToZonedTime } from 'date-fns-tz'

export function convertIsoToDate(date: Date) {
  const timeZone = 'America/Sao_Paulo'
  const brazilDate = utcToZonedTime(date, timeZone)
  return brazilDate
}
