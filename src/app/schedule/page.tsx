'use client'
import FormEditSession from '@/components/form/FormEditSession'
import DetailSessionModal from '@/components/modal/DetailSessionModal'
import { useCallback, useEffect, useState } from 'react'
import BackArrow from '@/components/form/buttons/BackArrow'
import { graphqlClient } from '@/server/graphql-client'
import { Session } from '@/models/Session'
import { GET_ALL_SCHEDULE } from '@/server/queries'
import {
  Calendar,
  EventPropGetter,
  momentLocalizer,
  SlotInfo,
} from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'
import 'moment/locale/pt-br'
import { convertDateToTimezone } from '@/utils/converter'
import { ResponseFindAllSessions } from '@/server/queries/responses/SessionResponses'
import ConfirmationForm from '@/components/form/FormRemoveSessionConfirmation'
import { REMOVE_SESSION } from '@/server/mutations'
import { toast } from 'react-toastify'

const localizer = momentLocalizer(moment)

const messages = {
  allDay: 'Dia Inteiro',
  previous: '<',
  next: '>',
  today: 'Hoje',
  month: 'Mês',
  week: 'Semana',
  day: 'Dia',
  agenda: 'Agenda',
  date: 'Data',
  time: 'Hora',
  event: 'Evento',
  showMore: (total: number) => `+ (${total}) Eventos`,
}

export interface RangeHour {
  start: Date
  end: Date
}

export default function Schedule() {
  const [modalOpen, setModalOpen] = useState(false)
  const [sessions, setSessions] = useState<Session[]>([])
  const [selectedSession, setSelectedSession] = useState<Session | undefined>()
  const [selectedRange, setSelectedRange] = useState<RangeHour | undefined>()
  const [showConfirmationForm, setShowConfirmationForm] = useState(false)

  const handleOpenModal = () => {
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
  }

  const handleEventClick = (event: Session) => {
    handleOpenModal()
    setSelectedSession(event)
  }

  const handleSelect = ({ start, end }: SlotInfo) => {
    handleOpenModal()
    const session: RangeHour = {
      start,
      end,
    }
    setSelectedSession(undefined)
    setSelectedRange(session)
  }

  const getAllSchedule = useCallback(async () => {
    const data = await graphqlClient.request<ResponseFindAllSessions>(
      GET_ALL_SCHEDULE,
    )

    setSessions(data.findAllSessions)
  }, [])

  const updateSession = (session: Session) => {
    const hasThatSession = sessions.find((s) => s.id === session.id)
    if (!hasThatSession) {
      setSessions((prev) => [...prev, session])
    } else {
      const newList = sessions.map((s) => (s.id === session.id ? session : s))
      setSessions(newList)
    }
  }

  function buildSessionTitle(session: Session) {
    const procedure = session.saleItem.procedure.name
    const client = session.saleItem.sale.client.name

    return procedure.concat(' - ', client)
  }

  const handleSetEventColor: EventPropGetter<Session> = (event: Session) => {
    return {
      style: {
        backgroundColor: event.saleItem.procedure.color,
        color: 'white',
        borderColor: event.saleItem.procedure.color,
      },
    }
  }

  const handleRemoveSession = async (id: string | undefined) => {
    const loading = toast.loading('Removendo...')
    try {
      if (id !== undefined) {
        await graphqlClient.request(REMOVE_SESSION, {
          removeSessionId: id,
        })
        setSessions((prevState) =>
          prevState.filter((session) => session.id !== id),
        )
        toast.update(loading, {
          render: 'Sessão removida com sucesso!',
          type: 'success',
          isLoading: false,
          autoClose: 5000,
        })
        setShowConfirmationForm(false)
        handleCloseModal()
      } else {
        toast.update(loading, {
          render: 'Ocorreu um erro ao tentar passar o ID da sessão!',
          type: 'error',
          isLoading: false,
          autoClose: 5000,
        })
      }
    } catch (error: any) {
      console.log(error)
      toast.update(loading, {
        render: error.response.errors[0].message,
        type: 'error',
        isLoading: false,
        autoClose: 5000,
      })
    }
  }

  useEffect(() => {
    getAllSchedule()
  }, [getAllSchedule, sessions])

  return (
    <div className="mx-10">
      <div className="flex justify-between items-center py-3">
        <BackArrow />
        <h1 className="text-2xl py-3">Agenda</h1>
        <div></div>
      </div>
      <div className=" bg-white py-2 px-5 rounded flex h-full w-full">
        <div className="w-full h-1/2">
          <Calendar
            views={['day', 'week', 'month']}
            selectable
            popup
            localizer={localizer}
            defaultView="week"
            titleAccessor={(event) => buildSessionTitle(event)}
            startAccessor={(event) => convertDateToTimezone(event.initDate)}
            endAccessor={(event) => convertDateToTimezone(event.finalDate)}
            events={sessions}
            style={{ height: 650 }}
            messages={messages}
            onSelectEvent={(event: Session) => handleEventClick(event)}
            onSelectSlot={handleSelect}
            eventPropGetter={handleSetEventColor}
          />
        </div>
      </div>
      <DetailSessionModal isOpen={modalOpen}>
        {showConfirmationForm ? (
          <ConfirmationForm
            label="Deseja mesmo remover a sessão abaixo?"
            session={selectedSession}
            onConfirm={handleRemoveSession}
            onClose={() => setShowConfirmationForm(false)}
          />
        ) : (
          <FormEditSession
            onClose={handleCloseModal}
            session={selectedSession}
            updateSession={updateSession}
            selectedRange={selectedRange}
            showConfirmation={() => setShowConfirmationForm(true)}
          />
        )}
      </DetailSessionModal>
    </div>
  )
}
