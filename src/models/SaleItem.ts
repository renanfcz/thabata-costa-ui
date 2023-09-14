import { Procedure } from './Procedure'
import { Sale } from './Sale'
import { Session } from './Session'

export type SaleItem = {
  id: string
  value: number
  discount: number
  procedure: Procedure
  sale: Sale
  sessions: Session[]
  sessionsNum: number
}
