'use client'
import { Client } from '@/models/Client'
import { graphqlClient } from '@/server/graphql-client'
import { GET_CLIENTS } from '@/server/queries'
import { ResponseClients } from '@/server/queries/responses/ClientResponses'
import { Check } from 'lucide-react'
import { useEffect, useState } from 'react'
import { SearchBarInput } from '../form/inputs/SearchBarInput'
import { SearchBoxList } from '../form/SearchBoxList'
import Title from './Title'

interface SearchClientFormProps {
  setName(name: string): void
  onClose(): void
}

export default function SearchClientForm({
  setName,
  onClose,
}: SearchClientFormProps) {
  const [clientName, setClientName] = useState('')
  const [clients, setClients] = useState<Client[]>([])
  const [filteredClients, setFilteredClients] = useState<Client[]>([])
  const [showList, setShowList] = useState(false)

  async function getAllClients() {
    const data = await graphqlClient.request<ResponseClients>(GET_CLIENTS)
    setClients(data.findAllClients)
  }

  const handleSetName = (name: string) => {
    setClientName(clientName)
    if (clients !== undefined) {
      const filteredList = clients.filter((c) =>
        c.name.toLowerCase().includes(name.toLowerCase()),
      )

      if (filteredList.length > 0) {
        setFilteredClients(filteredList)
        setShowList(true)
      } else {
        setFilteredClients([])
        setShowList(false)
      }
    } else {
      setShowList(false)
    }
  }

  const handleShowList = () => {
    setShowList(false)
  }

  const handleConfirmClient = () => {
    setName(clientName)
    onClose()
  }

  useEffect(() => {
    getAllClients()
  }, [])

  return (
    <div>
      <Title>Busca de Cliente</Title>
      <div>
        <SearchBarInput
          label="Nome do Cliente"
          value={clientName}
          setValue={handleSetName}
          onBlur={handleShowList}
        />
        <button onClick={handleConfirmClient}>
          <Check />
        </button>
      </div>
      {showList && (
        <SearchBoxList filteredList={filteredClients} setName={setClientName} />
      )}
    </div>
  )
}
