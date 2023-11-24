import { AnamnesisField } from './AnamnesisField'

export type Anamnesis = {
  id: string
  type: string
  createdAt: Date
  anamnesisFields: AnamnesisField[]
}
