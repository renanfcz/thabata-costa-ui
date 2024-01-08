import { Sale } from './Sale'
import { SaleItem } from './SaleItem'

export type Protocol = {
  id: string
  protocolName: string
  protocolDesc?: string
  sale: Sale
  saleItems: SaleItem[]
}
