'use client'
import { useState } from 'react'
import Flatpickr from 'react-flatpickr'
import 'flatpickr/dist/themes/airbnb.css'
import { dateFormatter } from '@/utils/formatter'

interface DateTimeInputProps {
  label: string
  hasError?: boolean
  value: string
  setValue(date: string): void
}

export default function DateTimeInput({
  label,
  hasError,
  value,
  setValue,
  ...rest
}: DateTimeInputProps) {
  const [focused, setFocused] = useState(false)

  const handleUpdateDate = (dateArray: Date[]) => {
    const newDate = new Date(value)

    if (dateArray !== undefined && dateArray.length > 0) {
      newDate.setUTCFullYear(dateArray[0].getUTCFullYear())
      newDate.setUTCMonth(dateArray[0].getUTCMonth())
      newDate.setUTCDate(dateArray[0].getUTCDate())

      setValue(dateFormatter.format(newDate))
    } else {
      setValue('')
    }
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
      <Flatpickr
        key={value}
        onClose={handleUpdateDate}
        options={{
          dateFormat: 'd/m/Y',
          defaultDate: value,
        }}
        className={`w-full border-2 focus:outline-none rounded px-3 py-2 h-full transition duration-200 ${
          hasError
            ? 'border-danger'
            : 'border-gray-300/30 focus:border-secondary/60'
        }`}
        {...rest}
      />
    </div>
  )
}
