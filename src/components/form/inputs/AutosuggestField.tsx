'use client'
import { FormEvent, useState } from 'react'
import Autosuggest from 'react-autosuggest'

interface AutosuggestFieldProps {
  label: string
  updateContext(value: string): void
  suggestionsList: string[]
  onSuggestionsFetchRequested(
    value: Autosuggest.SuggestionsFetchRequestedParams,
  ): void
  onSuggestionsClearRequested(): void
  onGetSuggestionValue(sugestion: any): string
  value?: string
}

export default function AutosuggestField({
  label,
  updateContext,
  suggestionsList,
  onSuggestionsFetchRequested,
  onSuggestionsClearRequested,
  onGetSuggestionValue,
  value,
}: AutosuggestFieldProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [text, setText] = useState('')

  const onChange = (
    event: FormEvent<HTMLElement>,
    { newValue }: Autosuggest.ChangeEvent,
  ) => {
    setText(newValue)
    updateContext(newValue)
  }

  const inputProps = {
    value: value || text,
    onChange,
    onFocus: () => setIsFocused(true),
    onBlur: () => setIsFocused(false),
  }

  const renderSuggestion = (suggestion: string) => <div>{suggestion}</div>

  return (
    <div className="relative w-full">
      <label
        className={`absolute transition-all duration-300 left-2 text-gray-600 ${
          isFocused || value || text
            ? '-top-4 text-xs font-bold'
            : 'top-3 text-sm'
        }
  `}
      >
        {label}
      </label>
      <Autosuggest
        suggestions={suggestionsList}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={onGetSuggestionValue}
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
            'border-2 border-t-0 border-secondary/60'
          }`,
          suggestion: 'p-2 hover:bg-gray-300/30 cursor-pointer',
        }}
      />
    </div>
  )
}
