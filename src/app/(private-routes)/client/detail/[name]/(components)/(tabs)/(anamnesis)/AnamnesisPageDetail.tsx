'use client'
import { Anamnesis } from '@/models/Anamnesis'
import { FacialAnamnesisFormData } from './(new)/(form)/FacialAnamnesisForm'
import { FacialAnamnesisFieldsEnum } from '@/enum/anamnesis/FacialAnamnesisFieldsEnum'
import { useState } from 'react'
import AnamnesisSignatureModal from './AnamnesisSignatureModal'

interface AnamnesisPageDetailProps {
  anamnesis: Anamnesis | undefined
  closeDetails(): void
}

export default function AnamnesisPageDetail({
  anamnesis,
  closeDetails,
}: AnamnesisPageDetailProps) {
  const anamnesisContent: FacialAnamnesisFormData = anamnesis
    ? JSON.parse(anamnesis?.data)
    : undefined

  const [isOpenModal, setIsOpenModal] = useState(false)
  const [disableSignatrue, setDisableSignatrue] = useState(
    !!anamnesis?.signedIn,
  )

  function handleSignature() {
    setIsOpenModal(true)
  }

  return (
    <div className="flex flex-col gap-3 p-5 lg:w-1/2">
      <div>
        <h1 className="flex gap-2">
          Protocolo:
          <span className="font-bold text-gray-600">
            {anamnesis?.protocolType}
          </span>
        </h1>
      </div>
      <div>
        {Object.entries(anamnesisContent).map(([key, value]) => (
          <div key={key} className="flex justify-between p-2 hover:bg-gray-200">
            <span className="text-gray-600">
              {FacialAnamnesisFieldsEnum.getValue(key)}
            </span>
            <span className="font-bold text-gray-600">{value}</span>
          </div>
        ))}
      </div>
      <button
        onClick={handleSignature}
        className="px-10 py-3 font-bold border rounded  transition duration-200 w-full disabled:bg-gray-200 disabled:border-gray-200 disabled:text-gray-600 text-info hover:bg-info hover:text-white border-info"
        disabled={disableSignatrue}
      >
        Assinar
      </button>
      <AnamnesisSignatureModal
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        closeDetails={closeDetails}
        idAnamnesis={anamnesis?.id}
      />
    </div>
  )
}
