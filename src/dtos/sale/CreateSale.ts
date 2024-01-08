import { PaymentTypeEnum } from '@/enum/PaymentTypeEnum'
import { CreateProtocol } from './../protocol/CreateProtocol'
export type CreateSale = {
  clientId?: string
  paymentType?: PaymentTypeEnum
  protocols?: CreateProtocol[]
}
