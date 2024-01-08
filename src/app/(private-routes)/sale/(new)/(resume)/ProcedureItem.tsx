import { useNewSaleContext } from '@/contexts/NewSaleContext'
import { useProceduresContext } from '@/contexts/ProcedureContext'
import { CreateSaleItem } from '@/dtos/saleItem/CreateSaleItem'
import { currencyFormatter } from '@/utils/formatter'
import { Trash2 } from 'lucide-react'

interface ProcedureItemProps {
  procedure: CreateSaleItem
  protocolIndex: number
  procedureIndex: number
}

export default function ProcedureItem({
  procedure,
  protocolIndex,
  procedureIndex,
}: ProcedureItemProps) {
  const { sale, updateSale } = useNewSaleContext()
  const { procedures } = useProceduresContext()

  const getValueWithDiscount = () => {
    return procedure.value - (procedure.value * procedure.discount) / 100
  }

  const removeProcedure = () => {
    const saleCopy = { ...sale }
    if (saleCopy.protocols) {
      saleCopy.protocols[protocolIndex].saleItems.splice(procedureIndex, 1)
      if (saleCopy.protocols[protocolIndex].saleItems.length === 0) {
        saleCopy.protocols.splice(protocolIndex, 1)
      }
      updateSale(saleCopy)
    }
  }

  function getProcedureName() {
    const procedureEntity = procedures.find(
      (p) => p.id === procedure.procedureId,
    )

    return procedureEntity ? procedureEntity.name : ''
  }

  return (
    <div className="p-5 flex justify-between items-center border-b-2 border-gray-100">
      <div className="flex flex-col">
        <div>
          <span>{getProcedureName()}</span>
        </div>
        <div>
          <span className="text-sm text-gray-400">Sessões: </span>
          <span>{procedure.sessionsNum}</span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {(procedure.discount || procedure.discount !== 0) && (
          <div className="flex justify-end">
            <span className="line-through text-gray-400 text-sm">
              {currencyFormatter.format(procedure.value)}
            </span>
          </div>
        )}
        <div className="flex gap-1 items-center">
          <span className="text-gray-600 font-bold text-lg">
            {currencyFormatter.format(getValueWithDiscount())}
          </span>
          {(procedure.discount || procedure.discount !== 0) && (
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
