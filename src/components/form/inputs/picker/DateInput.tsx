'use client'
import { useState } from 'react'
import Flatpickr from 'react-flatpickr'
import 'flatpickr/dist/themes/airbnb.css'
import { dateFormatter } from '@/utils/formatter'

interface DateInputProps {
  label: string
  hasError?: boolean
  value: string
  setValue(date: string): void
}

export default function DateInput({
  label,
  hasError,
  value,
  setValue,
  ...rest
}: DateInputProps) {
  const [focused, setFocused] = useState(false)

  const handleUpdateDate = (dateArray: Date[]) => {
    if (dateArray === undefined || dateArray.length === 0)
      dateArray.push(new Date())

    const newDate = value ? new Date(value) : new Date()

    newDate.setFullYear(dateArray[0].getUTCFullYear())
    newDate.setMonth(dateArray[0].getUTCMonth())
    newDate.setDate(dateArray[0].getUTCDate())

    setValue(dateFormatter.format(newDate))
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
          disableMobile: true,
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
