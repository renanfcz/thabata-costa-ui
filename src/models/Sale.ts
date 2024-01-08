import { PaymentTypeEnum } from '@/enum/PaymentTypeEnum'
import { Client } from './Client'
import { Protocol } from './Protocol'

export type Sale = {
  id: string
  protocols: Protocol[]
  createdAt: Date
  client: Client
  paymentType: PaymentTypeEnum
}
