'use client'
import { useState } from 'react'
import Flatpickr from 'react-flatpickr'
import 'flatpickr/dist/themes/airbnb.css'

interface DateTimeInputProps {
  label: string
  hasError?: boolean
  value: string
  setValue(): void
}

export default function DateTimeInput({
  label,
  hasError,
  value,
  setValue,
  ...rest
}: DateTimeInputProps) {
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
      <Flatpickr
        value={value}
        onChange={setValue}
        options={{
          enableTime: true,
          time_24hr: true,
          dateFormat: 'd/m/Y H:i',
        }}
        className={`w-full border-2 focus:outline-none rounded px-3 py-2 h-full transition duration-200 ${
          hasError
            ? 'border-danger'
            : 'border-gray-300/30 focus:border-secondary/60'
        }`}
      />
    </div>
  )
}
