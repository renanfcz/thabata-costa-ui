export const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
  timeZone: 'UTC',
})

export const dateTimeFormatter = new Intl.DateTimeFormat('pt-BR', {
  timeZone: 'UTC',
  dateStyle: 'short',
  timeStyle: 'short',
})

export const timeFormatter = new Intl.DateTimeFormat('pt-BR', {
  timeZone: 'UTC',
  timeStyle: 'short',
})

export const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

export function formatDateString(inputDate: string) {
  const parts = inputDate.split('/')
  const [day, month, year] = parts
  return `${year}-${month}-${day}`
}
