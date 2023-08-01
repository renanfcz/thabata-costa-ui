'use client'
import { forwardRef, ForwardRefRenderFunction, useState } from 'react'

interface TextInputProps {
  label: string
  hasError?: boolean
  isDirty?: boolean
}

const TextInput: ForwardRefRenderFunction<HTMLInputElement, TextInputProps> = (
  { label, hasError, isDirty, ...rest },
  ref,
) => {
  const [focused, setFocused] = useState(false)

  return (
    <div className="relative w-full">
      <label
        className={`absolute transition-all duration-300 left-2 text-gray-600 ${
          focused || isDirty ? '-top-4 text-xs font-bold' : 'top-3 text-sm'
        }
        `}
      >
        {label}
      </label>
      <input
        type="text"
        className={`w-full border-2 focus:outline-none rounded px-3 py-2 h-full transition duration-200 ${
          hasError
            ? 'border-danger'
            : 'border-gray-300/30 focus:border-secondary/60'
        }`}
        onFocus={() => setFocused(true)}
        ref={ref}
        {...rest}
        onBlur={() => setFocused(false)}
      />
    </div>
  )
}

export default forwardRef(TextInput)
