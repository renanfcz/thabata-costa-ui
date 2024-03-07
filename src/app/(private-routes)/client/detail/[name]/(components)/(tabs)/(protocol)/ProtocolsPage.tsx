'use client'
import BackButton from '@/components/form/buttons/BackButton'
import { useClientContext } from '@/contexts/client/ClientContext'
import { useEffect, useState } from 'react'

import ProtocolCard from '@/app/(private-routes)/client/detail/[name]/(components)/(tabs)/(protocol)/ProtocolCard'
import ProtocolPageDetail from './(details)/ProtocolPageDetail'
import { Protocol } from '@/models/Protocol'

export default function ProtocolsPage() {
  const { client } = useClientContext()
  const [openDatail, setOpenDetail] = useState(false)
  const [protocols, setProtocols] = useState<Protocol[]>([])
  const [selectedProtocol, setSelectedProtocol] = useState<Protocol>()

  const handleOpenDetail = (protocol: Protocol) => {
    setSelectedProtocol(protocol)
    setOpenDetail(true)
  }

  const handleCloseDetail = () => {
    setSelectedProtocol(undefined)
    setOpenDetail(false)
  }

  useEffect(() => {
    const protocols = client?.sales.flatMap((sale) => sale.protocols)
    setProtocols(protocols || [])
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
            <ProtocolPageDetail protocol={selectedProtocol} />
          </div>
        )}
      </div>
    </div>
  )
}
