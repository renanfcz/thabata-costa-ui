'use client'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import brLocale from '@fullcalendar/core/locales/pt-br'
import { useEffect, useState } from 'preact/hooks'
import Modal from '@/components/modal/Modal'

interface Event {
  id: string
  title: string
  start: string
  end: string
  color: string
}

export default function Schedule() {
  const [modalOpen, setModalOpen] = useState(false)

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
      start: '2023-08-01T16:30:33',
      end: '2023-08-01T17:00:33',
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

  return (
    <div className="mx-10">
      <h1 className="text-2xl py-3">Agenda</h1>
      <div className=" bg-white py-2 px-5 rounded flex h-full w-full">
        <div className="w-full h-1/2">
          <FullCalendar
            timeZone="local"
            plugins={[dayGridPlugin, timeGridPlugin]}
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
            editable={true}
            selectable={true}
          />
        </div>
      </div>
      <Modal isOpen={modalOpen}></Modal>
    </div>
  )
}
