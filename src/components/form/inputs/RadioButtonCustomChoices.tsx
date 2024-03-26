import { useState } from 'react'

interface RadioButtonCustomChoicesProps {
  setValue(value: string): void
  choices: string[]
}

export default function RadioButtonCustomChoices({
  setValue,
  choices,
}: RadioButtonCustomChoicesProps) {
  const [selectedChoice, setSelectedChoice] = useState('')
  function handleCheckOption(choice: string) {
    setSelectedChoice(choice)
    setValue(choice)
  }
  return (
    <div className="flex gap-2 w-full">
      {choices.map((choice) => (
        <button
          type="button"
          key={choice}
          onClick={() => handleCheckOption(choice)}
          className={`flex justify-center gap-1 w-full md:px-3 px-5 py-2  border-2   rounded ${
            selectedChoice === choice
              ? 'border-info bg-info text-white'
              : 'text-gray-600 border-gray-200 bg-gray-200 hover:border-gray-300 hover:bg-gray-300'
          }`}
        >
          {choice}
        </button>
      ))}
    </div>
  )
}
