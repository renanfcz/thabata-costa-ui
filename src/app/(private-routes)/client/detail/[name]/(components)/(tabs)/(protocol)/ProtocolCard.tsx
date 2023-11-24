import { Sale } from '@/models/Sale'
import { Session } from '@/models/Session'
import { dateFormatter } from '@/utils/formatter'
import { CalendarCheck, ListOrdered } from 'lucide-react'

interface ProtocolCardProps {
  protocol: Sale
}

export default function ProtocolCard({ protocol }: ProtocolCardProps) {
  function getRemainingSessions() {
    const now = new Date()
    const paidSessions = protocol.saleItems.reduce((acc, item) => {
      return acc + item.sessionsNum
    }, 0)
    const futureSessions = protocol.saleItems
      .map((item) => item.sessions.filter((session) => session.finalDate < now))
      .reduce((accumulator, sessions) => {
        return accumulator + sessions.length
      }, 0)
    return paidSessions - futureSessions
  }

  function getNextSessionDate() {
    const now = new Date()
    const sessions = protocol.saleItems.flatMap((item) => item.sessions)
    const futureSessions = sessions.filter((session) => session.initDate > now)

    if (futureSessions.length > 0) {
      futureSessions.sort(
        (a: Session, b: Session) => a.initDate.getTime() - b.initDate.getTime(),
      )

      return dateFormatter.format(futureSessions[0].initDate)
    }

    return '(Não agendado)'
  }

  return (
    <div className="flex flex-col border-2 border-primary rounded gap-5 shadow-md cursor-pointer">
      <div className="flex justify-between bg-primary items-center p-2">
        <strong className="text-white text-xl">{protocol.protocolName}</strong>
        <span className="rounded-full bg-white w-4 h-4"></span>
      </div>
      <div className="p-4 flex flex-col gap-5">
        <div className="flex items-center gap-2">
          <ListOrdered className="text-primary" />
          <span className="text-gray-600 text-left">
            Sessões restantes: {getRemainingSessions()}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <CalendarCheck className="text-primary" />
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
  )
}
