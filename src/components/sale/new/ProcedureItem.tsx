import { Trash2 } from 'lucide-react'

export default function ProcedureItem() {
  return (
    <div className="p-5 flex justify-between items-center border-b-2 border-gray-100">
      <div className="flex flex-col">
        <div>
          <span>Limpeza de pele</span>
        </div>
        <div>
          <span className="text-sm text-gray-400">Sessões: </span>
          <span>5</span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-end">
          <span className="line-through text-gray-400 text-sm">R$ 100,00</span>
        </div>
        <div className="flex gap-1 items-center">
          <span className="text-gray-600 font-bold text-lg">R$ 90,00</span>
          <span className="text-gray-100 text-xs bg-dark-secondary rounded-lg p-1 font-bold">
            -10%
          </span>
        </div>
        <button className="p-1 flex justify-center items-center gap-1 bg-gray-100 rounded-lg">
          <Trash2 size={15} className="text-dark-secondary" />
          <span className="text-sm">Remover</span>
        </button>
      </div>
    </div>
  )
}
