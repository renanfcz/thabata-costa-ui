'use client'
import { useState } from 'react'
import { PatternFormat } from 'react-number-format'

interface DocumentInputProps {
  label: string
  hasError?: boolean
  value: string
  setValue(): void
}

export default function DocumentInput({
  label,
  hasError,
  value,
  setValue,
  ...rest
}: DocumentInputProps) {
  const [focused, setFocused] = useState(false)
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
      <PatternFormat
        {...rest}
        format="###.###.###-##"
        mask="_"
        className={`w-full border-2 focus:outline-none rounded px-3 py-2 h-full transition duration-200 ${
          hasError
            ? 'border-danger'
            : 'border-gray-300/30 focus:border-secondary/60'
        }`}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        value={value}
        onChange={setValue}
      />
    </div>
  )
}
