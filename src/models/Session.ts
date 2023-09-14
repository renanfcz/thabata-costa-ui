import { SaleItem } from './SaleItem'

export type Session = {
  id: string
  initDate: Date
  finalDate: Date
  saleItem: SaleItem
  obs?: string
}
