import { CalendarCheck, ListOrdered } from 'lucide-react'

export default function ProtocolCard() {
  return (
    <div className="flex flex-col border border-2 border-warn rounded gap-5 shadow-md cursor-pointer">
      <div className="flex justify-between bg-warn items-center p-2">
        <strong className="text-white text-xl">Facial</strong>
        <span className="rounded-full bg-white w-4 h-4"></span>
      </div>
      <div className="p-4 flex flex-col gap-5">
        <div className="flex items-center gap-2">
          <ListOrdered className="text-warn" />
          <span className="text-gray-600 ">Sessões restantes: 5</span>
        </div>
        <div className="flex items-center gap-2">
          <CalendarCheck className="text-warn" />
          <span className="text-gray-600">Próxima sessão: 10/08/2023</span>
        </div>
        <div className="flex">
          <span className="text-gray-600">
            Status da próxima sessão: Agendado
          </span>
        </div>
      </div>
    </div>
  )
}
