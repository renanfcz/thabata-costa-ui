'use client'

import { forwardRef, ForwardRefRenderFunction, useState } from 'react'

interface TextAreaProps {
  label: string
  isDirdy?: boolean
  hasError?: boolean
}

const TextAreaInput: ForwardRefRenderFunction<
  HTMLTextAreaElement,
  TextAreaProps
> = ({ label, isDirdy, hasError, ...rest }, ref) => {
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
      <textarea
        className="resize-none w-full border-2 border-gray-300/30 focus:border-secondary/60 focus:outline-none rounded px-3 py-2 h-full transition duration-200"
        onFocus={() => setFocused(true)}
        ref={ref}
        {...rest}
        onBlur={() => setFocused(false)}
      ></textarea>
    </div>
  )
}

export default forwardRef(TextAreaInput)
