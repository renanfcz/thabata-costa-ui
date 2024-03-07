'use client'
import { Client } from '@/models/Client'
import { dateFormatter } from '@/utils/formatter'
import { Trash2 } from 'lucide-react'
import { useState } from 'react'
import CloseButton from '../form/buttons/CloseButton'
import RemoveButton from '../form/buttons/RemoveButton'
import { graphqlClient } from '@/server/graphql-client'
import { useRouter } from 'next/navigation'
import RemoveItemModal from '../modal/RemoveItemModal'
import { toast } from 'react-toastify'
import { REMOVE_CLIENT } from '@/server/mutations/requests/client/ClientMutations'

interface ActionGroupProps {
  client: Client
}

export function ActionGroup({ client }: ActionGroupProps) {
  const router = useRouter()
  const [modalOpen, setModalOpen] = useState(false)

  const handleOpenModal = () => {
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
  }

  const handleRemoveClient = async (id: string) => {
    try {
      await graphqlClient.request(REMOVE_CLIENT, {
        id,
      })
      handleCloseModal()
      router.refresh()
      toast.success('Cliente excluído com sucesso!')
    } catch (e) {
      toast.error('Ocorreu um erro ao tentar excluir o cliente!')
    }
  }

  return (
    <div className="flex gap-4 justify-end">
      <button onClick={handleOpenModal}>
        <Trash2 className="text-danger text-xs" />
      </button>
      <RemoveItemModal isOpen={modalOpen}>
        <div className="p-3 flex flex-col gap-8">
          <div>
            <h1 className="flex justify-center font-bold text-lg text-gray-600">
              Deseja mesmo excluir o cliente abaixo?
            </h1>
          </div>
          <div>
            <div className="flex gap-1">
              <b>Nome:</b>
              <span>{client.name}</span>
            </div>
            <div className="flex gap-1">
              <b>Telefone:</b>
              <span>{client.celphone}</span>
            </div>
            <div className="flex gap-1">
              <b>CPF:</b>
              <span>{client.cpf}</span>
            </div>
            <div className="flex gap-1">
              <b>Data de nascimento:</b>
              <span>{dateFormatter.format(new Date(client.dateBirth))}</span>
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <CloseButton onClose={handleCloseModal} />
            <RemoveButton onClick={() => handleRemoveClient(client.id)} />
          </div>
        </div>
      </RemoveItemModal>
    </div>
  )
}
