import { Client } from './Client'

export type Anamnesis = {
  id: string
  protocolType: string
  client: Client
  createdAt: Date
  signedIn?: Date
  expriresIn?: Date
  data: string
}
