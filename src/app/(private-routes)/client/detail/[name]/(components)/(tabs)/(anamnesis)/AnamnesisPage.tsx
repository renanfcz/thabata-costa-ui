import BackButton from '@/components/form/buttons/BackButton'
import { useClientContext } from '@/contexts/client/ClientContext'
import { Anamnesis } from '@/models/Anamnesis'
import { useState } from 'react'
import NewAnamnesis from './(new)/NewAnamnesis'
import AnamnesisCard from './AnamnesisCard'
import AnamnesisPageDetail from './AnamnesisPageDetail'

export default function AnamnesisPage() {
  const { client } = useClientContext()
  const [openAnamnesis, setOpenAnamnesis] = useState(false)
  const [selectedAnamnesis, setSelectedAnamnesis] = useState<Anamnesis>()
  const [newAnamnesis, setNewAnamnesis] = useState(false)

  const handleOpenDetail = (anamnesis: Anamnesis) => {
    setSelectedAnamnesis(anamnesis)
    setOpenAnamnesis(true)
  }

  const handleCloseDetail = () => {
    setSelectedAnamnesis(undefined)
    setOpenAnamnesis(false)
  }

  return (
    <div>
      {newAnamnesis ? (
        <NewAnamnesis backButton={() => setNewAnamnesis(false)} />
      ) : (
        <div className="px-5 flex flex-col gap-2">
          <div>
            <button
              className="px-8 py-4 text-primary bg-white border border-primary rounded hover:bg-primary hover:text-white font-bold transition duration-200"
              onClick={() => setNewAnamnesis(true)}
            >
              Nova Anamnese
            </button>
          </div>
          <div>
            {!openAnamnesis ? (
              <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-20">
                {client?.anamnesis.map((anamnesis) => (
                  <button
                    onClick={() => handleOpenDetail(anamnesis)}
                    key={anamnesis.id}
                  >
                    <AnamnesisCard anamnesis={anamnesis} />
                  </button>
                ))}
              </div>
            ) : (
              <div>
                <div className="flex justify-between w-full">
                  <BackButton onClick={handleCloseDetail} />
                </div>
                <AnamnesisPageDetail
                  anamnesis={selectedAnamnesis}
                  closeDetails={handleCloseDetail}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
