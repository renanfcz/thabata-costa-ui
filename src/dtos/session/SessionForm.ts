import { SessionStatusEnum } from '@/enum/SessionStatusEnum'

export type SessionForm = {
  id?: string
  initDate?: Date | undefined
  finalDate?: Date | undefined
  obs?: string | undefined
  clientName?: string | undefined
  protocol?: string | undefined
  procedure?: string | undefined
  status?: SessionStatusEnum
  saleItemId: string | undefined
}
