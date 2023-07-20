'use client'

import { useState } from 'react'

interface TextInputProps {
  label: string
  value: string
  setValue(value: string): void
}

export default function TextInput({ label, value, setValue }: TextInputProps) {
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
        className="w-full border-4 border-gray-300/30 focus:border-primary/90 focus:outline-none rounded px-3 py-2 transition duration-200"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  )
}
