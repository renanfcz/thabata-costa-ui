import { Protocol } from '@/models/Protocol'
import { Session } from '@/models/Session'
import { dateFormatter } from '@/utils/formatter'
import { CalendarCheck, ListOrdered } from 'lucide-react'

interface ProtocolCardProps {
  protocol: Protocol
}

export default function ProtocolCard({ protocol }: ProtocolCardProps) {
  function getNextSessionDate() {
    const now = new Date()
    const sessions = protocol.saleItems.flatMap((item) => {
      return item.sessions ? item.sessions : []
    })
    const futureSessions =
      sessions.length > 0
        ? sessions.filter((session) => session.initDate > now)
        : []

    if (futureSessions.length > 0) {
      futureSessions.sort(
        (a: Session, b: Session) => a.initDate.getTime() - b.initDate.getTime(),
      )

      return dateFormatter.format(futureSessions[0].initDate)
    }

    return '(Não agendado)'
  }

  function getProtocolProcedure() {
    const procedures = protocol.saleItems.map((item) => item.procedure)
    return procedures.slice(0, 3)
  }

  return (
    <div className="flex flex-col border-2 border-gray-600 rounded gap-5 shadow-md cursor-pointer max-h-52 h-52">
      <div className="flex justify-between bg-gray-600 items-center p-2">
        <strong className="text-white text-xl">{protocol.protocolName}</strong>
      </div>
      <div className="flex">
        <div className="p-4 flex flex-col gap-5">
          <div className="flex flex-col items-center gap-2">
            <div className="flex">
              <ListOrdered className="text-gray-600" />
              <span>Procedimentos:</span>
            </div>
            <div className="flex flex-col">
              {getProtocolProcedure().map((p) => (
                <div key={p.id} className="flex items-center gap-1">
                  <div
                    className={`rounded-full w-3 h-3`}
                    style={{ backgroundColor: p.color }}
                  ></div>
                  <span className="text-gray-600 text-left">{p.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="p-4 flex flex-col gap-5 border-l-2 border-gray-300">
          <div className="flex items-center gap-2">
            <CalendarCheck className="text-gray-600" />
            <span className="text-gray-600 text-left">
              Próxima sessão: {getNextSessionDate()}
            </span>
          </div>
          <div className="flex">
            <span className="text-gray-600 text-left">
              Status da próxima sessão: Agendado
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
