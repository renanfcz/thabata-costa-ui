'use client'

import { forwardRef, ForwardRefRenderFunction, useState } from 'react'

interface SelectInputProps {
  label: string
  options: string[]
  hasError?: boolean
  isDirty?: boolean
  value?: string
  setValue(value: string): void
  onChangeValue(selectedValue: string): void
}

const SelectInput: ForwardRefRenderFunction<
  HTMLSelectElement,
  SelectInputProps
> = (
  {
    label,
    options,
    hasError,
    isDirty,
    value,
    setValue,
    onChangeValue,
    ...rest
  },
  ref,
) => {
  const [focused, setFocused] = useState(false)

  function handleChangeValue(value: string) {
    onChangeValue(value)
    setValue(value)
  }

  return (
    <div className="relative w-full">
      <label
        className={`absolute transition-all duration-300 left-2 text-gray-600 ${
          focused || isDirty || value
            ? '-top-4 text-xs font-bold'
            : 'top-3 text-sm'
        }
        ${hasError ? 'text-danger' : ''}
        `}
      >
        {label}
      </label>
      <select
        onFocus={() => setFocused(true)}
        className={`w-full border-2  focus:outline-none rounded px-3 py-2 h-full transition duration-200 ${
          hasError
            ? 'border-danger'
            : 'border-gray-300/30 focus:border-secondary/60'
        }`}
        ref={ref}
        {...rest}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          handleChangeValue(e.target.value)
        }
        onBlur={() => setFocused(false)}
      >
        <option value={undefined}></option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

export default forwardRef(SelectInput)
