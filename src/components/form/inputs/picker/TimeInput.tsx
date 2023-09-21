'use client'
import { useState } from 'react'
import Flatpickr from 'react-flatpickr'
import 'flatpickr/dist/themes/airbnb.css'
import { dateTimeFormatter, timeFormatter } from '@/utils/formatter'

interface TimeInputProps {
  label: string
  hasError?: boolean
  value: Date
  setValue(time: Date): void
}

export default function TimeInput({
  label,
  hasError,
  value,
  setValue,
  ...rest
}: TimeInputProps) {
  const [focused, setFocused] = useState(false)

  const handleUpdateTime = (timeArray: Date[]) => {
    const newDate = new Date(value)

    newDate.setHours(timeArray[0].getHours())
    newDate.setMinutes(timeArray[0].getMinutes())

    setValue(newDate)
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
        key={value.toISOString()}
        onClose={handleUpdateTime}
        options={{
          enableTime: true,
          noCalendar: true,
          time_24hr: true,
          dateFormat: 'H:i',
          defaultDate: value,
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
