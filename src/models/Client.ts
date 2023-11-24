import { Anamnesis } from './Anamnesis'
import { Indication } from './Indication'
import { Sale } from './Sale'

export type Client = {
  id: string
  name: string
  cpf: string
  dateBirth: Date
  celphone: string
  state: string
  city: string
  street: string
  number: number
  complement: string
  indications: Indication[]
  createdAt: Date
  knowUs: string
  socialMediaId: string
  socialMedia: string
  sales: Sale[]
  clientStatus: string
  anamnesis: Anamnesis[]
}
