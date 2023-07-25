'use client'
import { ChevronsLeft, Pencil } from 'lucide-react'
import { useState } from 'react'

import ProtocolCard from '../../card/ProtocolCard'
import TableDetailProtocolCard from '../../table/TableDetailProtocolCard'

export default function ProtocolsPage() {
  const [openDatail, setOpenDetail] = useState(false)

  const handleOpenDetail = () => {
    setOpenDetail(true)
  }

  const handleCloseDetail = () => {
    setOpenDetail(false)
  }

  return (
    <div className="px-5">
      <div>
        {!openDatail ? (
          <div className="grid grid-cols-3 gap-20">
            <button onClick={handleOpenDetail}>
              <ProtocolCard />
            </button>
            <button onClick={handleOpenDetail}>
              <ProtocolCard />
            </button>
            <button onClick={handleOpenDetail}>
              <ProtocolCard />
            </button>
          </div>
        ) : (
          <div>
            <div className="flex justify-between w-full">
              <button
                onClick={handleCloseDetail}
                className="flex text-gray-400 hover:text-gray-600"
              >
                <ChevronsLeft />
                Voltar
              </button>
            </div>
            <div className="px-2 py-2">
              <h1 className="text-lg font-bold">Protocolo: Facial</h1>
            </div>
            <div className="p-2">
              <div className="flex gap-2">
                <strong>Observações do protocolo:</strong>
                <button className="text-gray-600">
                  <Pencil size={18} />
                </button>
              </div>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam
                assumenda incidunt quidem atque ipsum, at dignissimos
                consequuntur temporibus cum? Ipsam rem ab perspiciatis error
                iusto quisquam harum unde nostrum debitis!
              </p>
            </div>
            <TableDetailProtocolCard />
          </div>
        )}
      </div>
    </div>
  )
}
