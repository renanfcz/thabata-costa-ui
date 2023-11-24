import { useState } from 'react'

interface TextInputAnamnesisProps {
  hasError?: boolean
  isDirty?: boolean
  setValue(value: string): void
}

export default function TextInputAnamnesis({
  hasError,
  isDirty,
  setValue,
}: TextInputAnamnesisProps) {
  const [focused, setFocused] = useState(false)
  return (
    <div className="w-full">
      <input
        type="text"
        className={`w-full border-2 focus:outline-none rounded px-3 py-2 h-full transition duration-200 ${
          hasError
            ? 'border-danger'
            : 'border-gray-300/30 focus:border-secondary/60'
        }`}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  )
}
