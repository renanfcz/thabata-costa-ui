import TextAreaInput from '@/components/form/TextAreaInput'
import TextInput from '@/components/form/TextInput'
import { useNewSaleContext } from '@/contexts/NewSaleContext'

export default function ProtocolCard() {
  const { sale, updateSale } = useNewSaleContext()

  const updateProtocolName = (value: string) => {
    const saleCopy = { ...sale }
    saleCopy.protocolName = value
    updateSale(saleCopy)
  }

  const updateProtocolDesc = (value: string) => {
    const saleCopy = { ...sale }
    saleCopy.protocolDesc = value
    updateSale(saleCopy)
  }

  return (
    <div className="bg-white rounded p-5 flex flex-col gap-3">
      <h2>Protocolo</h2>
      <div className="flex flex-col gap-5">
        <TextInput
          label="Protocolo"
          value={sale?.protocolName}
          setValue={updateProtocolName}
        />
        <TextAreaInput
          label="Descrição do protocolo"
          value={sale?.protocolDesc}
          setValue={updateProtocolDesc}
        />
      </div>
    </div>
  )
}
