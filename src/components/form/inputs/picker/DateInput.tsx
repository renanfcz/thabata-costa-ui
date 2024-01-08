'use client'
import { CSSProperties, useState } from 'react'
import { DatePicker, DatePickerProps } from 'antd'
import dayjs from 'dayjs'
import ptBR from 'antd/es/date-picker/locale/pt_BR'
import { RangePickerProps } from 'antd/es/date-picker'

interface DateInputProps {
  label: string
  hasError?: boolean
  value: Date
  setValue(date: Date): void
}

export default function DateInput({
  label,
  hasError,
  value,
  setValue,
}: DateInputProps) {
  const [focused, setFocused] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())

  const handleUpdateDate = (dateArray: Date[]) => {
    if (dateArray === undefined || dateArray.length === 0)
      dateArray.push(new Date())

    const newDate = value ? new Date(value) : new Date()

    if (dateArray !== undefined && dateArray.length > 0) {
      newDate.setUTCFullYear(dateArray[0].getUTCFullYear())
      newDate.setUTCMonth(dateArray[0].getUTCMonth())
      newDate.setUTCDate(dateArray[0].getUTCDate())

      setValue(newDate)
    } else {
      setValue(new Date())
    }
  }

  const handleOnChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date)
    if (date?.toDate() !== undefined) setValue(date?.toDate())
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

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    return current && current < dayjs().startOf('day')
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
      <DatePicker
        format={'DD/MM/YYYY'}
        onChange={handleOnChange}
        locale={ptBR}
        value={dayjs(value)}
        style={inputStyle}
        onFocus={handleFocus}
        onBlur={handleBlur}
        disabledDate={disabledDate}
        className={`w-full border-2 focus:outline-none rounded px-3 py-2 h-full`}
      />
    </div>
  )
}
