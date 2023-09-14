import { Session } from '@/models/Session'
import { dateTimeFormatter, timeFormatter } from '@/utils/formatter'
import { Info } from 'lucide-react'
import { useState } from 'react'
import FormEditProtocol from '../form/FormEditProtocol'
import Modal from '../modal/EditProtocolModal'
import { TableData } from './TableData'
import { TableHead } from './TableHead'

interface TableDetailProtocolCardProps {
  sessions: Session[] | undefined
  updateSessions(sessions: Session[]): void
}

export default function TableDetailProtocolCard({
  sessions,
  updateSessions,
}: TableDetailProtocolCardProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedSession, setSelectedSession] = useState<Session>()

  const handleOpenModal = (session: Session) => {
    setSelectedSession(session)
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
  }

  function getSessionStatus(session: Session) {
    const now = new Date()
    if (new Date(session.finalDate) < now) {
      return 'Concluída'
    } else {
      return 'Agendado'
    }
  }

  function handleUpdateSession(newSession: Session) {
    if (sessions !== undefined) {
      const updatedSessions = sessions.map((oldSession) => {
        if (newSession.id === oldSession.id) {
          return newSession
        } else {
          return oldSession
        }
      })
      updateSessions(updatedSessions)
    }
  }

  function getSessionDate(start: Date, end: Date) {
    const startSession = dateTimeFormatter.format(start)
    return startSession.toString() + ' - ' + timeFormatter.format(end)
  }

  return (
    <div className="mt-2">
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
          {sessions?.map((session, index) => (
            <tr className="hover:bg-light-primary" key={index}>
              <TableData>{index + 1}</TableData>
              <TableData>{session.saleItem.procedure.name}</TableData>
              <TableData>
                {getSessionDate(
                  new Date(session.initDate),
                  new Date(session.finalDate),
                )}
              </TableData>
              <TableData>{session.obs}</TableData>
              <TableData>{getSessionStatus(session)}</TableData>
              <TableData>
                <div className="flex">
                  <button onClick={() => handleOpenModal(session)}>
                    <Info className="text-info" />
                  </button>
                </div>
              </TableData>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal isOpen={modalOpen}>
        <FormEditProtocol
          onClose={handleCloseModal}
          session={selectedSession}
          updateSession={handleUpdateSession}
        />
      </Modal>
    </div>
  )
}
