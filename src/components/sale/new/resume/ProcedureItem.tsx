import { useNewSaleContext } from '@/contexts/NewSaleContext'
import { Trash2 } from 'lucide-react'

interface Procedure {
  name: string
  value: string
  discount: string
  sessions: string
}

interface ProcedureItemProps {
  procedure: Procedure
  key: number
}

export default function ProcedureItem({ procedure, key }: ProcedureItemProps) {
  const { sale, updateSale } = useNewSaleContext()

  const getValueWithDiscount = () => {
    const valueNum = parseFloat(procedure.value)
    const discountNum = parseFloat(procedure.discount)
    return valueNum - (valueNum * discountNum) / 100
  }

  const removeProcedure = () => {
    const saleCopy = { ...sale }
    saleCopy.procedures.splice(key, 1)
    updateSale(saleCopy)
  }

  return (
    <div className="p-5 flex justify-between items-center border-b-2 border-gray-100">
      <div className="flex flex-col">
        <div>
          <span>{procedure.name}</span>
        </div>
        <div>
          <span className="text-sm text-gray-400">Sessões: </span>
          <span>{procedure.sessions}</span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {procedure.discount && (
          <div className="flex justify-end">
            <span className="line-through text-gray-400 text-sm">
              R$ {procedure.value}
            </span>
          </div>
        )}
        <div className="flex gap-1 items-center">
          <span className="text-gray-600 font-bold text-lg">
            R$ {getValueWithDiscount()}
          </span>
          {procedure.discount && (
            <span className="text-gray-100 text-xs bg-dark-primary rounded-lg p-1 font-bold">
              -{procedure.discount}%
            </span>
          )}
        </div>
        <button
          onClick={removeProcedure}
          className="p-1 flex justify-center items-center gap-1 bg-gray-100 rounded-lg"
        >
          <Trash2 size={15} className="text-dark-primary" />
          <span className="text-sm">Remover</span>
        </button>
      </div>
    </div>
  )
}
