import { Session } from './Session'

export type Procedure = {
  id: string
  name: string
  price: number
  sessions: Session[]
}
