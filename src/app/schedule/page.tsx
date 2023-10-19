'use client'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import brLocale from '@fullcalendar/core/locales/pt-br'
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction'
import { EventClickArg } from '@fullcalendar/core'
import FormEditSession from '@/components/form/FormEditSession'
import DetailSessionModal from '@/components/modal/DetailSessionModal'
import { useState } from 'react'
import { createRef } from '@fullcalendar/core/preact'

export default function Schedule() {
  const calendarRef = createRef()
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>()

  const handleOpenModal = () => {
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
  }
  const events = [
    {
      id: '1',
      title: 'Evento1',
      start: '2023-08-31T12:00:00',
      end: '2023-08-31T12:30:00',
      color: 'green',
    },
    {
      id: '3',
      title: 'Evento3',
      start: '2023-08-01T16:30:33',
      end: '2023-08-01T17:00:33',
      color: 'green',
    },
    {
      id: '2',
      title: 'Evento2',
      start: '2023-08-02T16:30:33',
      end: '2023-08-02T17:00:33',
      color: 'blue',
    },
  ]

  const handleEventClick = (e: EventClickArg) => {
    handleOpenModal()
  }

  const handleDateClick = (info: DateClickArg) => {
    if (
      calendarRef.current &&
      calendarRef.current.getApi().view.type === 'dayGridMonth'
    ) {
      calendarRef.current.getApi().changeView('timeGridWeek', info.dateStr)
    }

    if (
      calendarRef.current &&
      calendarRef.current.getApi().view.type === 'timeGridWeek'
    ) {
      handleOpenModal()
      setSelectedDate(info.date)
    }
  }

  return (
    <div className="mx-10">
      <h1 className="text-2xl py-3">Agenda</h1>
      <div className=" bg-white py-2 px-5 rounded flex h-full w-full">
        <div className="w-full h-1/2">
          <FullCalendar
            ref={calendarRef}
            timeZone="local"
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="timeGridWeek"
            locale={brLocale}
            events={events}
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
            dateClick={handleDateClick}
          />
        </div>
      </div>
      <DetailSessionModal isOpen={modalOpen}>
        <FormEditSession onClose={handleCloseModal} date={selectedDate} />
      </DetailSessionModal>
    </div>
  )
}
