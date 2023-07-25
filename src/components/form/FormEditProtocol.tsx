'use client'
import { useState } from 'react'
import CloseButton from './CloseButton'
import SaveButton from './SaveButton'
import SelectInput from './SelectInput'
import TextAreaInput from './TextAreaInput'
import TextInput from './TextInput'

interface FormEditProtocolProps {
  onClose(): void
}

export default function FormEditProtocol({ onClose }: FormEditProtocolProps) {
  const procedures = ['Drenagem', 'Massagem', 'Sobrancelha']

  const [procedure, setProcedure] = useState('')
  const [sessionData, setSessionData] = useState('')
  const [obs, setObs] = useState('')

  return (
    <div className="p-5 h-full">
      <h1 className="font-bold text-lg">Dados da sessão</h1>
      <form className="h-full">
        <div className="flex flex-col gap-5 justify-center h-full">
          <div className="flex gap-2">
            <SelectInput
              label="Procedimento"
              options={procedures}
              value={procedure}
              setValue={setProcedure}
            />
            <TextInput
              label="Data da sessão"
              setValue={setSessionData}
              value={sessionData}
            />
          </div>
          <div>
            <TextAreaInput label="Observações" value={obs} setValue={setObs} />
          </div>
          <div className="flex gap-2 justify-end items-end w-full">
            <SaveButton />
            <CloseButton onClose={onClose} />
          </div>
        </div>
      </form>
    </div>
  )
}
