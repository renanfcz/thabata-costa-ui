'use client'
import { TimePicker, TimePickerProps } from 'antd'
import { CSSProperties, useState } from 'react'
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'

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
}: TimeInputProps) {
  const [focused, setFocused] = useState(false)
  const [selectedTime, setSelectedTime] = useState(new Date())

  const handleUpdateTime = (timeArray: Date[]) => {
    if (timeArray === undefined || timeArray.length === 0)
      timeArray.push(new Date())

    const newDate = value ? new Date(value) : new Date()

    newDate.setHours(timeArray[0].getHours())
    newDate.setMinutes(timeArray[0].getMinutes())

    setValue(newDate)
  }

  const handleOnChange: TimePickerProps['onChange'] = (date, dateString) => {
    console.log(date)
    if (date?.toDate() !== undefined) setValue(date?.toDate())
  }

  const onChange = (time: Dayjs) => {
    if (time?.toDate() !== undefined) setValue(time.toDate())
  }

  const inputStyle: CSSProperties = {
    padding: '8px',
    border: `2px solid ${
      focused ? 'rgb(249 115 22 / 0.6)' : 'rgb(209 213 219 / 0.3)'
    }`,
    borderRadius: '4px',
    outline: 'none',
    transition: 'border-color 0.2s ease-in-out',
  }

  function handleFocus() {
    setFocused(true)
  }

  function handleBlur() {
    setFocused(false)
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
      <TimePicker
        value={dayjs(value)}
        format="HH:mm"
        onChange={handleOnChange}
        onSelect={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={inputStyle}
        minuteStep={15}
        className={`w-full border-2 focus:outline-none rounded px-3 py-2 h-full`}
      />
    </div>
  )
}
