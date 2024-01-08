import { CreateSaleItem } from '../saleItem/CreateSaleItem'

export type CreateProtocol = {
  protocolName: string
  protocolDesc: string
  saleItems: CreateSaleItem[]
}
