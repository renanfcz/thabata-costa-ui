import TextAreaInput from '@/components/form/inputs/TextAreaInput'
import TextInput from '@/components/form/inputs/TextInput'
import { useState } from 'react'
import ProcedureCard from './ProcedureCard'

export default function ProtocolCard() {
  const [protocol, setProtocol] = useState({
    protocolName: '',
    protocolDesc: '',
    saleItems: [],
  })

  const updateProtocolName = (value: string) => {
    const protocolCopy = { ...protocol }
    protocolCopy.protocolName = value
    setProtocol(protocolCopy)
  }

  const updateProtocolDesc = (value: string) => {
    const protocolCopy = { ...protocol }
    protocolCopy.protocolDesc = value
    setProtocol(protocolCopy)
  }

  return (
    <div className="bg-white rounded p-5 flex flex-col gap-3">
      <h2>Protocolo</h2>
      <div className="flex flex-col gap-5">
        <TextInput
          label="Protocolo"
          value={protocol.protocolName}
          setValue={updateProtocolName}
        />
        <TextAreaInput
          label="Descrição do protocolo"
          value={protocol.protocolDesc}
          setValue={updateProtocolDesc}
        />
      </div>
      <ProcedureCard protocol={protocol} />
    </div>
  )
}
