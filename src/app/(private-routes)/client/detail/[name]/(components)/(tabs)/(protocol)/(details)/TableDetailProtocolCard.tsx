import { Session } from '@/models/Session'
import { dateTimeFormatter, timeFormatter } from '@/utils/formatter'
import { useState } from 'react'
import { TableData } from '../../../../../../../../../components/table/TableData'
import { TableHead } from '../../../../../../../../../components/table/TableHead'
import { SessionStatusEnum } from '@/enum/SessionStatusEnum'
import { SessionForm } from '@/dtos/session/SessionForm'
import EditSessionPage from './EditSessionPage'

interface TableDetailProtocolCardProps {
  sessions: Session[] | undefined
}

export default function TableDetailProtocolCard({
  sessions,
}: TableDetailProtocolCardProps) {
  const [openEditSession, setOpenEditSession] = useState(false)
  const [selectedSession, setSelectedSession] = useState<SessionForm>()
  const [sessionsList, setSessionsList] = useState<Session[]>(sessions || [])

  function parseToSessionForm(session: Session) {
    const sessionForm: SessionForm = {
      id: session.id,
      clientName: session.saleItem.protocol.sale.client.name,
      procedure: session.saleItem.procedure.name,
      protocol: session.saleItem.protocol.protocolName,
      initDate: session.initDate,
      finalDate: session.finalDate,
      obs: session.obs,
      status: session.status,
      saleItemId: session.saleItem.id,
    }

    return sessionForm
  }

  const handleOpenEdition = (session: Session) => {
    setSelectedSession(parseToSessionForm(session))
    setOpenEditSession(true)
  }

  const handleCloseEdition = () => {
    setOpenEditSession(false)
  }

  function updateSession(session: Session) {
    const index = sessionsList.findIndex((s) => s.id === session.id)

    if (index !== -1) {
      setSessionsList([
        ...sessionsList.slice(0, index),
        session,
        ...sessionsList.slice(index + 1),
      ])
    }
  }

  function getSessionDate(start: Date, end: Date) {
    const startSession = dateTimeFormatter.format(start)
    return startSession.toString() + ' - ' + timeFormatter.format(end)
  }

  return (
    <div className="mt-2">
      {!openEditSession ? (
        <table className="w-full divide-y divide-base-background">
          <thead>
            <tr>
              <TableHead>Nº da sessão</TableHead>
              <TableHead>Procedimento</TableHead>
              <TableHead>Data da sessão</TableHead>
              <TableHead>Observações</TableHead>
              <TableHead>Status</TableHead>
              <TableHead> </TableHead>
            </tr>
          </thead>
          <tbody>
            {sessionsList?.map((session, index) => (
              <tr
                className="hover:bg-light-primary cursor-pointer"
                key={index}
                onClick={() => handleOpenEdition(session)}
              >
                <TableData>{index + 1}</TableData>
                <TableData>{session.saleItem.procedure.name}</TableData>
                <TableData>
                  {getSessionDate(
                    new Date(session.initDate),
                    new Date(session.finalDate),
                  )}
                </TableData>
                <TableData>{session.obs}</TableData>
                <TableData>
                  {SessionStatusEnum.getValue(session.status)}
                </TableData>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <EditSessionPage
          closeForm={handleCloseEdition}
          sessionForm={selectedSession}
          updateSession={updateSession}
        />
      )}
    </div>
  )
}
