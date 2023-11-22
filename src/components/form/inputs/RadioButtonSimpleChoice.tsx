import React, { useState } from 'react'

interface RadioButtonSimpleChoice {
  setValue(value: string): void
}

export default function RadioButtonSimpleChoice({
  setValue,
}: RadioButtonSimpleChoice) {
  const [yesChecked, setYesChecked] = useState(false)
  const [noChecked, setNoChecked] = useState(false)

  function handleYesChecked() {
    setYesChecked(true)
    setNoChecked(false)
    setValue('Sim')
  }

  function handleNoChecked() {
    setYesChecked(false)
    setNoChecked(true)
    setValue('Não')
  }

  return (
    <div className="flex gap-2 w-full">
      <button
        onClick={handleYesChecked}
        className={`flex justify-center gap-1 w-full px-5 py-2  border-2   rounded ${
          yesChecked
            ? 'border-success bg-success text-white'
            : 'text-gray-600 border-gray-200 bg-gray-200 hover:border-gray-300 hover:bg-gray-300'
        }`}
      >
        Sim
      </button>
      <button
        onClick={handleNoChecked}
        className={`flex justify-center gap-1 w-full px-5 py-2  border-2   rounded ${
          noChecked
            ? 'border-danger bg-danger text-white'
            : 'text-gray-600 border-gray-200 bg-gray-200 hover:border-gray-300 hover:bg-gray-300'
        }`}
      >
        Não
      </button>
    </div>
  )
}
