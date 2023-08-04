'use client'
import { Info } from 'lucide-react'
import { useState } from 'react'

import FormEditProtocol from '../form/FormEditProtocol'
import EditModal from '../modal/EditProtocolModal'
import { TableData } from '../table/TableData'
import { TableHead } from '../table/TableHead'

export default function TableFinanceAccordion() {
  const [modalOpen, setModalOpen] = useState(false)

  const handleOpenModal = () => {
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
  }
  return (
    <div className="border-2 border-primary">
      <table className="w-full divide-y divide-base-background">
        <thead>
          <tr>
            <TableHead>Nº</TableHead>
            <TableHead>Procedimento</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Desconto (%)</TableHead>
            <TableHead>Nº de sessões</TableHead>
            <TableHead> </TableHead>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-light-primary">
            <TableData>1</TableData>
            <TableData>Sobrancelha</TableData>
            <TableData>R$ 100,00</TableData>
            <TableData>10</TableData>
            <TableData>5</TableData>
            <TableData>
              <span className="flex justify-end">
                <Info className="text-info text-xs" />
              </span>
            </TableData>
          </tr>
          <tr className="hover:bg-light-primary">
            <TableData>2</TableData>
            <TableData>Sobrancelha</TableData>
            <TableData>R$ 100,00</TableData>
            <TableData>10</TableData>
            <TableData>3</TableData>
            <TableData>
              <span className="flex justify-end">
                <Info className="text-info text-xs" />
              </span>
            </TableData>
          </tr>
          <tr className="hover:bg-light-primary">
            <TableData>3</TableData>
            <TableData>Sobrancelha</TableData>
            <TableData>R$ 100,00</TableData>
            <TableData>10</TableData>
            <TableData>3</TableData>
            <TableData>
              <span className="flex justify-end">
                <Info className="text-info text-xs" />
              </span>
            </TableData>
          </tr>
        </tbody>
      </table>
      <EditModal isOpen={modalOpen}>
        <FormEditProtocol onClose={handleCloseModal} />
      </EditModal>
    </div>
  )
}
