'use client'
import { Client } from '@/models/Client'
import { createContext, useContext, useState } from 'react'

interface ClientContextType {
  client: Client | undefined
  updateClient(client: Client | undefined): void
}

const ClientContext = createContext({} as ClientContextType)

export const useClientContext = () => useContext(ClientContext)

export const ClientProvider = ({ children }: { children: React.ReactNode }) => {
  const [client, setClient] = useState<Client | undefined>()

  const updateClient = (client: Client | undefined) => {
    setClient(client)
  }

  return (
    <ClientContext.Provider value={{ client, updateClient }}>
      {children}
    </ClientContext.Provider>
  )
}
