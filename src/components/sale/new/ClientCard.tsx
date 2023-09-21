'use client'
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
  const [name, setName] = useState('')
  const [clients, setClients] = useState<Client[]>([])
  const [suggestionsList, setSuggestionsList] = useState<Client[]>([])
  const [isFocused, setIsFocused] = useState(false)
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

  const inputProps = {
    value: name,
    onChange,
    onFocus: () => setIsFocused(true),
    onBlur: () => setIsFocused(false),
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
      <div className="relative flex flex-col gap-1">
        <label
          className={`absolute transition-all duration-300 left-2 text-gray-600 ${
            isFocused || name ? '-top-4 text-xs font-bold' : 'top-3 text-sm'
          }
        `}
        >
          Nome do Cliente
        </label>
        <Autosuggest
          suggestions={suggestionsList}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={(suggestion: Client) => suggestion.name}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          theme={{
            container: `w-full p-0 ${
              isFocused && 'border-secondary/60'
            } border-2 border-gray-300/30 rounded`,
            input: `w-full focus:outline-none px-3 py-2`,
            suggestionsContainer: `absolute z-10 bg-white w-full -ml-[2px] rounded-b-sm ${
              isFocused &&
              suggestionsList.length > 0 &&
              'border-2 border-secondary/60'
            }`,
            suggestion: 'p-2 hover:bg-gray-300/30 cursor-pointer',
          }}
        />
      </div>
    </div>
  )
}
