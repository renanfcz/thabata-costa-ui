'use client'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import brLocale from '@fullcalendar/core/locales/pt-br'
import interactionPlugin from '@fullcalendar/interaction'
import { EventClickArg } from '@fullcalendar/core'
import FormEditSession from '@/components/form/FormEditSession'
import DetailSessionModal from '@/components/modal/DetailSessionModal'
import { useEffect, useState } from 'react'
import BackArrow from '@/components/form/buttons/BackArrow'
import { graphqlClient } from '@/server/graphql-client'
import { Session } from '@/models/Session'
import { GET_ALL_SCHEDULE } from '@/server/queries'

interface ResponseGetAllSchedule {
  findAllSessions: [Session]
}

export interface Event {
  id: string
  title: string
  start: string
  end: string
  color: string
}

export default function Schedule() {
  const [modalOpen, setModalOpen] = useState(false)
  const [sessions, setSessions] = useState<Session[]>()
  const [schedule, setSchedule] = useState<Event[]>()
  const [selectedSession, setSelectedSession] = useState<Session | undefined>()

  const handleOpenModal = () => {
    console.log('Is open')
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
  }

  const handleEventClick = (e: EventClickArg) => {
    handleOpenModal()
    const id = e.event.id
    const filteredSessions = sessions?.filter((session) => {
      return session.id === id
    })

    const session = filteredSessions ? filteredSessions[0] : undefined
    setSelectedSession(session)
  }

  function parseDateToString(date: Date) {
    const data = new Date(date)
    const fullDate = new Date(
      data.getUTCFullYear(),
      data.getUTCMonth(),
      data.getUTCDay() - 2,
      data.getUTCHours(),
      data.getUTCMinutes(),
    )
    return fullDate.toISOString()
  }

  async function getAllSchedule() {
    const data = await graphqlClient.request<ResponseGetAllSchedule>(
      GET_ALL_SCHEDULE,
    )

    setSessions(data.findAllSessions)

    const events = data.findAllSessions.map((session) => {
      const event: Event = {
        id: session.id,
        title: session.saleItem.procedure.name,
        start: parseDateToString(session.initDate),
        end: parseDateToString(session.finalDate),
        color: 'blue',
      }
      return event
    })

    setSchedule(events)
  }

  useEffect(() => {
    getAllSchedule()
  }, [])

  return (
    <div className="mx-10">
      <div className="flex justify-between items-center py-3">
        <BackArrow />
        <h1 className="text-2xl py-3">Agenda</h1>
        <div></div>
      </div>
      <div className=" bg-white py-2 px-5 rounded flex h-full w-full">
        <div className="w-full h-1/2">
          <FullCalendar
            timeZone="local"
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="timeGridWeek"
            locale={brLocale}
            events={schedule}
            nowIndicator={true}
            contentHeight={650}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek',
            }}
            editable={false}
            selectable={true}
            eventClick={(e: EventClickArg) => handleEventClick(e)}
            eventClassNames="cursor-pointer"
          />
        </div>
      </div>
      <DetailSessionModal isOpen={modalOpen}>
        <FormEditSession onClose={handleCloseModal} session={selectedSession} />
      </DetailSessionModal>
    </div>
  )
}
