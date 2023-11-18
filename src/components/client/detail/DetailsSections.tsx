'use client'
import { useClientContext } from '@/contexts/client/ClientContext'
import { Client } from '@/models/Client'
import { graphqlClient } from '@/server/graphql-client'
import { GET_CLIENT_BY_NAME } from '@/server/queries'
import { ResponseFindClientByName } from '@/server/queries/responses/ClientResponses'
import React, { useEffect } from 'react'
import FinanceInfoPage from './FinanceInfoPage'
import IndicationPage from './IndicationPage'
import InfoPage from './InfoPage'
import ProtocolsPage from './ProtocolsPage'

interface DetailsSectionsProps {
  clientName: string
  info: boolean
  indication: boolean
  protocols: boolean
  financeInfo: boolean
}

export default function DetailsSections({
  clientName,
  info,
  indication,
  protocols,
  financeInfo,
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
    </div>
  )
}
