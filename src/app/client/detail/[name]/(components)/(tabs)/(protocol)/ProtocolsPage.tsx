'use client'
import BackButton from '@/components/form/buttons/BackButton'
import { useClientContext } from '@/contexts/client/ClientContext'
import { Sale } from '@/models/Sale'
import { useEffect, useState } from 'react'

import ProtocolCard from '@/app/client/detail/[name]/(components)/(tabs)/(protocol)/ProtocolCard'
import ProtocolPageDetail from './ProtocolPageDetail'

export default function ProtocolsPage() {
  const { client } = useClientContext()
  const [openDatail, setOpenDetail] = useState(false)
  const [protocols, setProtocols] = useState<Sale[]>([])
  const [selectedProtocol, setSelectedProtocol] = useState<Sale>()

  const handleOpenDetail = (protocol: Sale) => {
    setSelectedProtocol(protocol)
    setOpenDetail(true)
  }

  const handleCloseDetail = () => {
    setSelectedProtocol(undefined)
    setOpenDetail(false)
  }

  const handleUpdateSelectedProtocol = (protocol: Sale) => {
    setSelectedProtocol(protocol)
  }

  useEffect(() => {
    setProtocols(client?.sales || [])
  }, [client])

  return (
    <div className="px-5">
      <div>
        {!openDatail ? (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-20">
            {protocols.map((protocol) => (
              <button
                onClick={() => handleOpenDetail(protocol)}
                key={protocol.id}
              >
                <ProtocolCard protocol={protocol} />
              </button>
            ))}
          </div>
        ) : (
          <div>
            <div className="flex justify-between w-full">
              <BackButton onClick={handleCloseDetail} />
            </div>
            <ProtocolPageDetail
              protocol={selectedProtocol}
              updateProtocol={handleUpdateSelectedProtocol}
            />
          </div>
        )}
      </div>
    </div>
  )
}
