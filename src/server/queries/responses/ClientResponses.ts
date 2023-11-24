import { Client } from '@/models/Client'

export interface ResponseClients {
  findAllClients: Client[]
}

export interface ResponseFindClientByName {
  findClientByName: Client
}
