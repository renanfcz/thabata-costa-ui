import Title from '@/components/modal/Title'
import { SessionForm } from '@/dtos/session/SessionForm'
import { Client } from '@/models/Client'
import { useState } from 'react'
import { RangeHour } from '../page'
import ConfirmCreateSession from './ConfirmCreateSession'
import FormSelectDate from './FormSelectDate'
import FormSelectProcedure from './FormSelectProcedure'

interface EditSessionProps {
  onClose(): void
  selectedRange: RangeHour | undefined
  selectedSession: SessionForm | undefined
  updateSelectedSession(sessionForm: SessionForm): void
  clients: Client[]
}

export default function EditSession({
  onClose,
  selectedRange,
  selectedSession,
  updateSelectedSession,
  clients,
}: EditSessionProps) {
  const [selectProcedureForm, setSelectProcedureForm] = useState(true)
  const [selectDateForm, setSelectDateForm] = useState(false)
  const [confirmPage, setConfirmPage] = useState(false)

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

  return (
    <div>
      <div className="flex flex-col gap-2">
        <Title>Dados da sessão</Title>
        <div className="flex flex-col gap-5 justify-center">
          {selectProcedureForm && (
            <FormSelectProcedure
              clients={clients}
              createSession={selectedSession}
              setCreateSession={updateSelectedSession}
              nextForm={openSelectDateForm}
              onClose={onClose}
            />
          )}
          {selectDateForm && (
            <FormSelectDate
              onClose={onClose}
              prevForm={openSelectProcedureForm}
              initDate={selectedRange?.start}
              finalDate={selectedRange?.end}
              createSession={selectedSession}
              setCreateSession={updateSelectedSession}
              openConfirmPage={openConfirmPage}
            />
          )}
          {confirmPage && (
            <ConfirmCreateSession
              createSession={selectedSession}
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
