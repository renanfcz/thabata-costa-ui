import { Procedure } from './Procedure'
import { Protocol } from './Protocol'
import { Session } from './Session'

export type SaleItem = {
  id: string
  value: number
  discount: number
  procedure: Procedure
  sessions: Session[]
  sessionsNum: number
  protocol: Protocol
}
