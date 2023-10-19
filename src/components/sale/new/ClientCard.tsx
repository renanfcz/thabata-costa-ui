'use client'
import SugestionInput from '@/components/form/inputs/SugestionInput'
import { useNewSaleContext } from '@/contexts/NewSaleContext'
import { Client } from '@/models/Client'
import { graphqlClient } from '@/server/graphql-client'
import { GET_CLIENTS } from '@/server/queries'
import { FormEvent, useEffect, useState } from 'react'
import Autosuggest from 'react-autosuggest'

interface Response {
  findAllClients: Client[]
}

export default function ClientCard() {
  const [clients, setClients] = useState<Client[]>([])
  const [suggestionsList, setSuggestionsList] = useState<Client[]>([])
  const [name, setName] = useState('')
  const { sale, updateSale } = useNewSaleContext()

  async function getAllClients() {
    const data = await graphqlClient.request<Response>(GET_CLIENTS)
    setClients(data.findAllClients)
  }

  const renderSuggestion = (suggestion: Client) => <div>{suggestion.name}</div>

  const onChange = (
    event: FormEvent<HTMLElement>,
    { newValue }: Autosuggest.ChangeEvent,
  ) => {
    setName(newValue)
    updateSaleContext(newValue)
  }

  function updateSaleContext(newValue: string) {
    const saleCopy = { ...sale }
    const originalClient = clients.find((c) => c.name === newValue)
    saleCopy.clientId = originalClient ? originalClient.id : ''
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

  useEffect(() => {
    getAllClients()
  }, [])

  return (
    <div className="bg-white rounded p-5 flex flex-col gap-3">
      <h2>Cliente</h2>
      <SugestionInput
        text={name}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onChange={onChange}
        suggestionsList={suggestionsList}
        renderSuggestion={renderSuggestion}
        label="Nome do cliente"
      />
    </div>
  )
}
