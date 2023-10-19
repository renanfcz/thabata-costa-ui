'use client'
import { Client } from '@/models/Client'
import { FormEvent, useState } from 'react'
import Autosuggest from 'react-autosuggest'

interface SugestionInput {
  renderSuggestion(suggestion: Client): JSX.Element
  suggestionsList: Client[]
  onChange(
    event: FormEvent<HTMLElement>,
    { newValue }: Autosuggest.ChangeEvent,
  ): void
  onSuggestionsFetchRequested({
    value,
  }: Autosuggest.SuggestionsFetchRequestedParams): void
  onSuggestionsClearRequested(): void
  text: string
  label: string
}

export default function SugestionInput({
  renderSuggestion,
  suggestionsList,
  onChange,
  onSuggestionsFetchRequested,
  onSuggestionsClearRequested,
  text,
  label,
}: SugestionInput) {
  const [isFocused, setIsFocused] = useState(false)

  const inputProps = {
    value: text,
    onChange,
    onFocus: () => setIsFocused(true),
    onBlur: () => setIsFocused(false),
  }

  return (
    <div className="relative flex flex-col gap-1">
      <label
        className={`absolute transition-all duration-300 left-2 text-gray-600 ${
          isFocused || text ? '-top-4 text-xs font-bold' : 'top-3 text-sm'
        }
  `}
      >
        {label}
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
  )
}
