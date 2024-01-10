import Title from '@/components/modal/Title'
import { SessionForm } from '@/dtos/session/SessionForm'
import { Client } from '@/models/Client'
import { graphqlClient } from '@/server/graphql-client'
import { GET_CLIENTS } from '@/server/queries/requests/client/ClientQueries'
import { ResponseClients } from '@/server/queries/responses/ClientResponses'
import { useEffect, useState } from 'react'
import { RangeHour } from '../page'
import ConfirmCreateSession from './ConfirmCreateSession'
import FormSelectDate from './FormSelectDate'
import FormSelectProcedure from './FormSelectProcedure'

interface CreateSessionPageProps {
  onClose(): void
  selectedRange: RangeHour | undefined
  selectedSession: SessionForm | undefined
}

export default function CreateSessionPage({
  onClose,
  selectedRange,
  selectedSession,
}: CreateSessionPageProps) {
  const [clients, setClients] = useState<Client[]>([])
  const [createSession, setCreateSession] = useState<SessionForm | undefined>(
    selectedSession,
  )
  const [selectProcedureForm, setSelectProcedureForm] = useState(true)
  const [selectDateForm, setSelectDateForm] = useState(false)
  const [confirmPage, setConfirmPage] = useState(false)

  async function getAllClients() {
    const data = await graphqlClient.request<ResponseClients>(GET_CLIENTS)
    setClients(data.findAllClients)
  }

  function openSelectDateForm() {
    setSelectProcedureForm(false)
    setSelectDateForm(true)
    setConfirmPage(false)
  }

  function openSelectProcedureForm() {
    setSelectProcedureForm(true)
    setSelectDateForm(false)
    setConfirmPage(false)
  }

  function openConfirmPage() {
    setSelectProcedureForm(false)
    setSelectDateForm(false)
    setConfirmPage(true)
  }

  useEffect(() => {
    getAllClients()
  }, [])

  return (
    <div>
      <div className="flex flex-col gap-2">
        <Title>Dados da sessão</Title>
        <div className="flex flex-col gap-5 justify-center">
          {selectProcedureForm && (
            <FormSelectProcedure
              clients={clients}
              createSession={createSession}
              setCreateSession={setCreateSession}
              nextForm={openSelectDateForm}
              onClose={onClose}
            />
          )}
          {selectDateForm && (
            <FormSelectDate
              onClose={onClose}
              prevForm={openSelectProcedureForm}
              initDate={selectedRange?.start || createSession?.initDate}
              finalDate={selectedRange?.end || createSession?.finalDate}
              createSession={createSession}
              setCreateSession={setCreateSession}
              openConfirmPage={openConfirmPage}
            />
          )}
          {confirmPage && (
            <ConfirmCreateSession
              createSession={createSession}
              clients={clients}
              onClose={onClose}
              prevForm={openSelectDateForm}
            />
          )}
        </div>
      </div>
    </div>
  )
}
