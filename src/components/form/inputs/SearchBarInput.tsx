'use client'
import { useState } from 'react'

interface SearchBarInputProps {
  label: string
  hasError?: boolean
  value: string
  setValue(value: string): void
  onBlur(): void
}

export function SearchBarInput({
  label,
  hasError,
  value,
  setValue,
  onBlur,
}: SearchBarInputProps) {
  const [focused, setFocused] = useState(false)

  const handleBlur = () => {
    setFocused(false)
    onBlur()
  }

  const handleFocused = () => {
    setFocused(true)
  }

  return (
    <div className="relative w-full">
      <label
        className={`absolute transition-all duration-300 left-2 text-gray-600 ${
          focused || value ? '-top-4 text-xs font-bold' : 'top-3 text-sm'
        }
        `}
      >
        {label}
      </label>
      <input
        type="text"
        className={`w-full border-2 focus:outline-none rounded px-3 py-2 h-full transition duration-200 ${
          hasError
            ? 'border-danger'
            : 'border-gray-300/30 focus:border-secondary/60'
        }`}
        onFocus={handleFocused}
        onBlur={handleBlur}
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
    </div>
  )
}
