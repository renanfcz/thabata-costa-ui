import { CreateProtocol } from '@/dtos/protocol/CreateProtocol'
import { currencyFormatter } from '@/utils/formatter'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import ProcedureItem from './ProcedureItem'

interface ProtocolItemProps {
  protocol: CreateProtocol
  protocolIndex: number
}

export default function ProtocolItem({
  protocol,
  protocolIndex,
}: ProtocolItemProps) {
  const [isOpen, setIsOpen] = useState(true)

  const toggleAccordion = () => {
    setIsOpen(!isOpen)
  }

  const getSubtotal = (value: number, discount: number) => {
    return value - (value * discount) / 100
  }

  const getTotalProtocol = () => {
    const valueWithDiscount = protocol.saleItems?.map((item) =>
      getSubtotal(item.value, item.discount),
    )
    return valueWithDiscount?.reduce((acc, cur) => acc + cur, 0) || 0
  }
  return (
    <div className="flex flex-col border-2 border-info rounded">
      <div className="flex justify-between bg-info px-5 py-3">
        <div className="flex flex-col">
          <span className="text-white text-lg font-bold">
            {protocol.protocolName}
          </span>
          <span className="text-gray-200">{protocol.protocolDesc}</span>
        </div>
        <div className="flex gap-2 justify-center items-center">
          <span className="text-white font-bold text-lg">
            {currencyFormatter.format(getTotalProtocol())}
          </span>
          <button onClick={toggleAccordion}>
            <ChevronDown
              className={`text-white transition duration-300 transform ${
                isOpen ? 'rotate-180' : 'rotate-0'
              }`}
            />
          </button>
        </div>
      </div>
      <div
        className={`overflow-hidden duration-200 transition-max-h ${
          isOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        {protocol.saleItems.map((procedure, index) => (
          <ProcedureItem
            key={index}
            procedure={procedure}
            protocolIndex={protocolIndex}
            procedureIndex={index}
          />
        ))}
      </div>
    </div>
  )
}
