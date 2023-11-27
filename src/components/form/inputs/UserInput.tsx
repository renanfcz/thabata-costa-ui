'use client'
import React, { useState } from 'react'

interface UserInputProps {
  label: string
  hasError?: boolean
  value: string
  setValue(value: string): void
}

export default function UserInput({
  label,
  hasError,
  value,
  setValue,
}: UserInputProps) {
  const [focused, setFocused] = useState(false)

  return (
    <div className="relative w-full">
      <label
        className={`absolute transition-all duration-300 left-2 text-gray-600 ${
          focused || value
            ? '-top-4 text-xs font-bold text-info'
            : 'top-3 text-sm'
        }
          `}
      >
        {label}
      </label>
      <input
        type="text"
        className={`w-full border-b-2 focus:outline-none px-3 py-2 h-full transition duration-200 ${
          hasError ? 'border-danger' : 'border-info/50 focus:border-info'
        }`}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
    </div>
  )
}
