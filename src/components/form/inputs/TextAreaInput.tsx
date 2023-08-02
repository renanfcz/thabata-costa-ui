'use client'

import { useState } from 'react'

interface TextAreaProps {
  label: string
  hasError?: boolean
  value: string
  setValue(value: string): void
}

export default function TextAreaInput({
  label,
  hasError,
  value,
  setValue,
}: TextAreaProps) {
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
      <textarea
        className="resize-none w-full border-2 border-gray-300/30 focus:border-secondary/60 focus:outline-none rounded px-3 py-2 h-full transition duration-200"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      ></textarea>
    </div>
  )
}
