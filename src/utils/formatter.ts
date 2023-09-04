export const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
  timeZone: 'UTC',
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
