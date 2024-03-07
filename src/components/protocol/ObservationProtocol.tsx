'use client'

import { Pencil } from 'lucide-react'
import { useState } from 'react'
import Modal from '../modal/Modal'
import Title from '../modal/Title'
import TextAreaInput from '../form/inputs/TextAreaInput'
import CloseButton from '../form/buttons/CloseButton'
import SaveButton from '../form/buttons/SaveButton'
import { toast } from 'react-toastify'
import { graphqlClient } from '@/server/graphql-client'
import { ResponseUpdateSale } from '@/server/mutations/responses/SaleResponses'
import { UPDATE_PROTOCOL } from '@/server/mutations/requests/sale/SaleMutations'
import { Protocol } from '@/models/Protocol'

interface ObservationProtocol {
  protocol: Protocol | undefined
}

export default function ObservationProtocol({ protocol }: ObservationProtocol) {
  const [isOpen, setIsOpen] = useState(false)
  const [description, setDescription] = useState(protocol?.protocolDesc || '')

  const handleOpenModal = () => {
    setIsOpen(true)
  }

  const handleCloseModal = () => {
    setIsOpen(false)
  }

  const handleUpdateDescription = async () => {
    const loading = toast.loading('Salvando...')
    try {
      await graphqlClient.request<ResponseUpdateSale>(UPDATE_PROTOCOL, {
        id: protocol?.id,
        sale: {
          protocolDesc: description,
        },
      })
      toast.update(loading, {
        render: 'Descrição atualizada com sucesso!',
        type: 'success',
        isLoading: false,
        autoClose: 5000,
      })
      // updateProtocol(data.updateSale)
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
      <div className="flex gap-2">
        <strong>Observações do protocolo:</strong>
        <button className="text-gray-600" onClick={handleOpenModal}>
          <Pencil size={18} />
        </button>
      </div>
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
