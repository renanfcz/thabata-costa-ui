'use client'
import AutosuggestField from '@/components/form/inputs/AutosuggestField'
import { useNewSaleContext } from '@/contexts/NewSaleContext'
import { Client } from '@/models/Client'
import { graphqlClient } from '@/server/graphql-client'
import { GET_CLIENTS } from '@/server/queries/requests/client/ClientQueries'
import { ResponseClients } from '@/server/queries/responses/ClientResponses'
import { useEffect, useState } from 'react'
import Autosuggest from 'react-autosuggest'

export default function ClientCard() {
  const [clients, setClients] = useState<Client[]>([])
  const [suggestionsList, setSuggestionsList] = useState<Client[]>([])
  const { sale, updateSale } = useNewSaleContext()

  async function getAllClients() {
    const data = await graphqlClient.request<ResponseClients>(GET_CLIENTS)
    setClients(data.findAllClients)
  }

  function updateSaleContext(newValue: string) {
    const saleCopy = { ...sale }
    const originalClient = clients.find((c) => c.name === newValue)
    saleCopy.clientId = originalClient?.id
    updateSale(saleCopy)
  }

  const onSuggestionsFetchRequested = ({
    value,
  }: Autosuggest.SuggestionsFetchRequestedParams) => {
    const inputValue = value.toLowerCase()
    const filteredSuggestions = clients.filter((client) =>
      client.name.toLowerCase().includes(inputValue),
    )
    if (filteredSuggestions.length > 5) {
      setSuggestionsList(filteredSuggestions.slice(0, 5))
    } else {
      setSuggestionsList(filteredSuggestions)
    }
  }

  const onSuggestionsClearRequested = () => {
    setSuggestionsList([])
  }

  const buildClientNameList = () => {
    return suggestionsList.map((suggestion) => {
      return suggestion.name
    })
  }

  useEffect(() => {
    getAllClients()
  }, [])

  return (
    <div className="bg-white rounded p-5 flex flex-col gap-3">
      <h2>Cliente</h2>
      <div className="relative flex flex-col gap-1">
        <AutosuggestField
          label="Nome do cliente"
          onGetSuggestionValue={(suggestion: string) => suggestion}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          suggestionsList={buildClientNameList()}
          updateContext={updateSaleContext}
        />
      </div>
    </div>
  )
}
