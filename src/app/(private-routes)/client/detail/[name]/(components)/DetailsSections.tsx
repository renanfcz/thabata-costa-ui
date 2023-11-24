'use client'
import { useClientContext } from '@/contexts/client/ClientContext'
import { graphqlClient } from '@/server/graphql-client'
import { GET_CLIENT_BY_NAME } from '@/server/queries/requests/client/ClientQueries'
import { ResponseFindClientByName } from '@/server/queries/responses/ClientResponses'
import React, { useEffect } from 'react'
import AnamnesisPage from './(tabs)/(anamnesis)/AnamnesisPage'
import FinanceInfoPage from './(tabs)/(financeInfo)/FinanceInfoPage'
import IndicationPage from './(tabs)/(indication)/IndicationPage'

import InfoPage from './(tabs)/(info)/InfoPage'
import ProtocolsPage from './(tabs)/(protocol)/ProtocolsPage'

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

  async function getClientByName() {
    const data = await graphqlClient.request<ResponseFindClientByName>(
      GET_CLIENT_BY_NAME,
      {
        name: clientName,
      },
    )
    updateClient(data.findClientByName)
  }

  useEffect(() => {
    getClientByName()
  }, [])
  return (
    <div>
      {info && <InfoPage />}
      {indication && <IndicationPage />}
      {protocols && <ProtocolsPage />}
      {financeInfo && <FinanceInfoPage />}
      {anamnesis && <AnamnesisPage />}
    </div>
  )
}
