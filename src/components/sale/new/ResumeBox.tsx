import SaveButton from '@/components/form/SaveButton'
import ProcedureItem from './ProcedureItem'

interface Procedure {
  name: string
  value: string
  discount: string
  sessions: string
}

interface NewSale {
  protocolName: string
  protocolDesc: string
  procedures: Procedure[]
}

export default function ResumeBox() {
  const handleSaveSale = () => {}

  return (
    <div className="bg-white rounded w-full p-5">
      <h1 className="text-lg font py-3">Resumo da venda</h1>
      <div className="flex flex-col">
        <div className="flex">
          <span className="text-gray-400 text-sm">Protocolo:</span>
          <span>TesteTesteTesteTesteTeste</span>
        </div>
        <div className="flex">
          <span className="text-gray-400 text-sm">Descrição do protocolo:</span>
          <span>TesteTesteTeste</span>
        </div>
        <div className="flex">
          <span className="text-gray-400 text-sm">Procedimentos:</span>
        </div>
        <div>
          <ProcedureItem />
          <ProcedureItem />
          <ProcedureItem />
        </div>
        <div className="flex flex-col p-5 gap-2">
          <div className="flex justify-between">
            <span className="text-gray-400 text-sm">Desconto</span>
            <span className="text-gray-400 text-sm">R$ 100,00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-lg font-bold">Total</span>
            <span className="text-lg font-bold">R$ 100,00</span>
          </div>
        </div>
        <button
          onClick={handleSaveSale}
          className="px-10 py-3 font-bold border border-info rounded text-info hover:bg-info hover:text-white transition duration-200"
        >
          Finalizar venda
        </button>
      </div>
    </div>
  )
}
