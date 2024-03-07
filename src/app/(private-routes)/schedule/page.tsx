'use client'
import DetailSessionModal from '@/components/modal/DetailSessionModal'
import { useCallback, useEffect, useState } from 'react'
import BackArrow from '@/components/form/buttons/BackArrow'
import { graphqlClient } from '@/server/graphql-client'
import { Session } from '@/models/Session'
import {
  Calendar,
  EventPropGetter,
  SlotInfo,
  momentLocalizer,
} from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'moment/locale/pt-br'
import {
  convertDateToTimezone,
  convertManuallyToBrazilTimezone,
  unconvertManuallyToBrazilTimezone,
} from '@/utils/converter'
import { ResponseFindAllSessions } from '@/server/queries/responses/SessionResponses'
import { toast } from 'react-toastify'
import { GET_ALL_SCHEDULE } from '@/server/queries/requests/session/SessionQueries'
import { REMOVE_SESSION } from '@/server/mutations/requests/session/SessionMutations'
import { SessionForm } from '@/dtos/session/SessionForm'
import moment from 'moment'
import 'moment-timezone'
import { ResponseClients } from '@/server/queries/responses/ClientResponses'
import { GET_CLIENTS } from '@/server/queries/requests/client/ClientQueries'
import { Client } from '@/models/Client'
import EditSession from './(createSession)/EditSession'

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
  moment.tz.setDefault('America/Sao_Paulo')
  const localizer = momentLocalizer(moment)

  const [clients, setClients] = useState<Client[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [sessions, setSessions] = useState<Session[]>([])
  const [selectedSession, setSelectedSession] = useState<
    SessionForm | undefined
  >()
  const [selectedRange, setSelectedRange] = useState<RangeHour | undefined>()
  const [showConfirmationForm, setShowConfirmationForm] = useState(false)

  const handleOpenModal = () => {
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
  }

  async function getAllClients() {
    const data = await graphqlClient.request<ResponseClients>(GET_CLIENTS)
    setClients(data.findAllClients)
  }

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

  const handleEventClick = (event: Session) => {
    const buildEvent = { ...event }
    buildEvent.initDate = unconvertManuallyToBrazilTimezone(event.initDate)
    buildEvent.finalDate = unconvertManuallyToBrazilTimezone(event.finalDate)
    setSelectedSession(parseToSessionForm(buildEvent))
    setSelectedRange(undefined)
    handleOpenModal()
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
    const data =
      await graphqlClient.request<ResponseFindAllSessions>(GET_ALL_SCHEDULE)

    const sessionList: [Session] = data.findAllSessions

    setSessions(
      sessionList.map((s) => {
        const sessionBuild = { ...s }
        sessionBuild.initDate = convertManuallyToBrazilTimezone(s.initDate)
        sessionBuild.finalDate = convertManuallyToBrazilTimezone(s.finalDate)

        return sessionBuild
      }),
    )
  }, [])

  function buildSessionTitle(session: Session) {
    const procedure = session.saleItem.procedure.name
    const client = session.saleItem.protocol.sale.client.name

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
    getAllClients()
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
            scrollToTime={new Date()}
          />
        </div>
      </div>
      <DetailSessionModal isOpen={modalOpen}>
        <EditSession
          onClose={handleCloseModal}
          selectedRange={selectedRange}
          selectedSession={selectedSession}
          updateSelectedSession={setSelectedSession}
          clients={clients}
        />
      </DetailSessionModal>
    </div>
  )
}
