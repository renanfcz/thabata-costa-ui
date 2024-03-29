'use client'
import { useState } from 'react'

interface TextInputProps {
  label: string
  hasError?: boolean
  value: string
  setValue(value: string): void
  disable?: boolean
}

export default function TextInput({
  label,
  hasError,
  value,
  setValue,
  disable,
}: TextInputProps) {
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
      <input
        type="text"
        className={`w-full border-2 focus:outline-none rounded px-3 py-2 h-full transition duration-200 ${
          hasError
            ? 'border-danger'
            : 'border-gray-300/30 focus:border-secondary/60'
        }`}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e) => setValue(e.target.value)}
        value={value}
        disabled={disable}
      />
    </div>
  )
}
