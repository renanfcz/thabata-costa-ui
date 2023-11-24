'use client'
import CloseButton from '@/components/form/buttons/CloseButton'
import SaveButton from '@/components/form/buttons/SaveButton'
import TextAreaInput from '@/components/form/inputs/TextAreaInput'
import Modal from '@/components/modal/Modal'
import Title from '@/components/modal/Title'
import TableDetailProtocolCard from '@/components/table/TableDetailProtocolCard'
import { Sale } from '@/models/Sale'
import { Session } from '@/models/Session'
import { graphqlClient } from '@/server/graphql-client'
import { UPDATE_PROTOCOL } from '@/server/mutations/requests/sale/SaleMutations'
import { ResponseUpdateSale } from '@/server/mutations/responses/SaleResponses'
import { Pencil } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'react-toastify'

interface ProtocolPageDetailProps {
  protocol: Sale | undefined
  updateProtocol(protocol: Sale): void
}

export default function ProtocolPageDetail({
  protocol,
  updateProtocol,
}: ProtocolPageDetailProps) {
  const [sessions, setSessions] = useState(
    protocol?.saleItems?.flatMap((item) => item.sessions),
  )
  const [isOpen, setIsOpen] = useState(false)
  const [description, setDescription] = useState(protocol?.protocolDesc || '')

  const handleOpenModal = () => {
    setIsOpen(true)
  }

  const handleCloseModal = () => {
    setIsOpen(false)
  }

  const handleUpdateSessions = (sessions: Session[]) => {
    setSessions(sessions)
  }

  const handleUpdateDescription = async () => {
    const loading = toast.loading('Salvando...')
    try {
      const data = await graphqlClient.request<ResponseUpdateSale>(
        UPDATE_PROTOCOL,
        {
          id: protocol?.id,
          sale: {
            protocolDesc: description,
          },
        },
      )
      toast.update(loading, {
        render: 'Descrição atualizada com sucesso!',
        type: 'success',
        isLoading: false,
        autoClose: 5000,
      })
      updateProtocol(data.updateSale)
      setIsOpen(false)
    } catch (error: any) {
      toast.update(loading, {
        render: error.response.errors[0].message,
        type: 'error',
        isLoading: false,
        autoClose: 5000,
      })
    }
  }

  return (
    <div>
      <div className="px-2 py-2">
        <h1 className="text-lg font-bold">
          Protocolo: {protocol?.protocolName}
        </h1>
      </div>
      <div className="p-2">
        <div className="flex gap-2">
          <strong>Observações do protocolo:</strong>
          <button className="text-gray-600" onClick={handleOpenModal}>
            <Pencil size={18} />
          </button>
        </div>
        <p>{protocol?.protocolDesc}</p>
      </div>
      <TableDetailProtocolCard
        sessions={sessions}
        updateSessions={handleUpdateSessions}
      />
      <Modal isOpen={isOpen}>
        <div className="flex flex-col gap-12">
          <Title>Descrição do protocolo</Title>
          <TextAreaInput
            label="Descrição"
            value={description}
            setValue={setDescription}
          />
          <div className="flex gap-2 justify-end">
            <CloseButton onClose={handleCloseModal} />
            <SaveButton onClick={handleUpdateDescription} />
          </div>
        </div>
      </Modal>
    </div>
  )
}
