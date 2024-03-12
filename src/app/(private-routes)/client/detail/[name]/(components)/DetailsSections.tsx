'use client'
import { useClientContext } from '@/contexts/client/ClientContext'
import { graphqlClient } from '@/server/graphql-client'
import { GET_CLIENTS } from '@/server/queries/requests/client/ClientQueries'
import { ResponseClients } from '@/server/queries/responses/ClientResponses'
import React, { useEffect, useState } from 'react'
import AnamnesisPage from './(tabs)/(anamnesis)/AnamnesisPage'
import FinanceInfoPage from './(tabs)/(financeInfo)/FinanceInfoPage'
import IndicationPage from './(tabs)/(indication)/IndicationPage'

import InfoPage from './(tabs)/(info)/InfoPage'
import ProtocolsPage from './(tabs)/(protocol)/ProtocolsPage'
import { Client } from '@/models/Client'

interface DetailsSectionsProps {
  clientName: string
  info: boolean
  indication: boolean
  protocols: boolean
  financeInfo: boolean
  anamnesis: boolean
}

export default function DetailsSections({
  clientName,
  info,
  indication,
  protocols,
  financeInfo,
  anamnesis,
}: DetailsSectionsProps) {
  const { client, updateClient } = useClientContext()
  const [clients, setClients] = useState<Client[]>([])

  async function getAllClientsAndFindSelectedClient() {
    const data = await graphqlClient.request<ResponseClients>(GET_CLIENTS)
    const clients = data.findAllClients
    setClients(clients)
    const selectedClient = clients.find((c) => c.name === clientName)
    updateClient(selectedClient)
  }

  useEffect(() => {
    getAllClientsAndFindSelectedClient()
  }, [])
  return (
    <div>
      {info && <InfoPage clients={clients} />}
      {indication && <IndicationPage />}
      {protocols && <ProtocolsPage />}
      {financeInfo && <FinanceInfoPage />}
      {anamnesis && <AnamnesisPage />}
    </div>
  )
}
