import { SessionStatusEnum } from '@/enum/SessionStatusEnum'
import { SaleItem } from './SaleItem'

export type Session = {
  id: string
  initDate: Date
  finalDate: Date
  saleItem: SaleItem
  status: SessionStatusEnum
  obs?: string
}
