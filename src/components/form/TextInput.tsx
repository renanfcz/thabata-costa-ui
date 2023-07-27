'use client'
import { forwardRef, ForwardRefRenderFunction, useState } from 'react'

interface TextInputProps {
  label: string
  isDirdy: boolean
  hasError: boolean
}

const TextInput: ForwardRefRenderFunction<HTMLInputElement, TextInputProps> = (
  { label, isDirdy, hasError, ...rest },
  ref,
) => {
  const [focused, setFocused] = useState(false)
  return (
    <div className="relative w-full">
      <label
        className={`absolute transition-all duration-300 left-2 text-gray-600 ${
          focused || isDirdy ? '-top-4 text-xs font-bold' : 'top-3 text-sm'
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
        ref={ref}
        onFocus={() => setFocused(true)}
        {...rest}
        onBlur={() => setFocused(false)}
      />
    </div>
  )
}

export default forwardRef(TextInput)
