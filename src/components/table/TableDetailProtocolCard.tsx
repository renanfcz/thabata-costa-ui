import { Info } from 'lucide-react'
import { useState } from 'react'
import FormEditProtocol from '../form/FormEditProtocol'
import EditModal from '../modal/EditModal'
import { TableData } from './TableData'
import { TableHead } from './TableHead'

export default function TableDetailProtocolCard() {
  const [modalOpen, setModalOpen] = useState(false)

  const handleOpenModal = () => {
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
  }

  return (
    <div className="mt-2">
      <table className="w-full divide-y divide-base-background">
        <thead>
          <tr>
            <TableHead>Nº da sessão</TableHead>
            <TableHead>Procedimento</TableHead>
            <TableHead>Data da sessão</TableHead>
            <TableHead>Observações</TableHead>
            <TableHead>Status</TableHead>
            <TableHead> </TableHead>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-primary">
            <TableData>1</TableData>
            <TableData>Drenagem</TableData>
            <TableData>20/07/2023</TableData>
            <TableData>OK</TableData>
            <TableData>Realizada</TableData>
            <TableData>
              <div className="flex">
                <button onClick={handleOpenModal}>
                  <Info className="text-info" />
                </button>
              </div>
            </TableData>
          </tr>
          <tr className="hover:bg-primary">
            <TableData>2</TableData>
            <TableData>Drenagem</TableData>
            <TableData>20/07/2023</TableData>
            <TableData>OK</TableData>
            <TableData>Agendada</TableData>
            <TableData>
              <div className="flex">
                <button onClick={handleOpenModal}>
                  <Info className="text-info" />
                </button>
              </div>
            </TableData>
          </tr>
          <tr className="hover:bg-primary">
            <TableData>3</TableData>
            <TableData>Drenagem</TableData>
            <TableData>20/07/2023</TableData>
            <TableData>OK</TableData>
            <TableData>Não agendada</TableData>
            <TableData>
              <div className="flex">
                <button onClick={handleOpenModal}>
                  <Info className="text-info" />
                </button>
              </div>
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
