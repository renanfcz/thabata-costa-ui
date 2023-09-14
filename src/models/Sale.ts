import { Client } from './Client'
import { SaleItem } from './SaleItem'

export type Sale = {
  id: string
  protocolName: string
  protocolDesc: string
  createdAt: Date
  saleItems: SaleItem[]
  client: Client
}
