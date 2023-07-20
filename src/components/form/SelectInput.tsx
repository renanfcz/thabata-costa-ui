'use client'

import { useState } from 'react'

interface SelectInputProps {
  label: string
  value: string
  setValue(value: string): void
  options: string[]
}

export default function SelectInput({
  label,
  value,
  options,
  setValue,
}: SelectInputProps) {
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
      <select
        value={value}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e) => setValue(e.target.value)}
        className="w-full border-4 border-gray-300/30 focus:border-primary/90 focus:outline-none rounded px-3 py-2 transition duration-200"
      >
        <option></option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}
