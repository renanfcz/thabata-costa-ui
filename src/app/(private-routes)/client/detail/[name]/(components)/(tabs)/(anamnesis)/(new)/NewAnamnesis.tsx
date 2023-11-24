'use client'
import BackButton from '@/components/form/buttons/BackButton'
import RadioButton from '@/components/form/inputs/RadioButton'
import { AnamnesisTypeEnum } from '@/enum/AnamnesisTypeEnum'
import { useState } from 'react'
import CorporalAnamnesisForm from './(form)/CorporalAnamnesisForm'
import FacialAnamnesisForm from './(form)/FacialAnamnesisForm'

interface NewAnamnesisProps {
  backButton(): void
}

export default function NewAnamnesis({ backButton }: NewAnamnesisProps) {
  const [facialButtonClicked, setFacialButtonClicked] = useState(false)
  const [corporalButtonClicked, setCorporalButtonClicked] = useState(false)

  function handleAnamnesisType(type: AnamnesisTypeEnum) {
    if (type === AnamnesisTypeEnum.FACIAL) {
      setFacialButtonClicked(true)
      setCorporalButtonClicked(false)
    } else if (type === AnamnesisTypeEnum.BODY) {
      setFacialButtonClicked(false)
      setCorporalButtonClicked(true)
    }
  }

  return (
    <div className="px-5 lg:w-1/2">
      <BackButton onClick={backButton} />
      <div className="flex justify-center">
        <h1 className="text-gray-600 text-xl font-bold">Nova Anamnese</h1>
      </div>
      <div className="flex gap-2">
        <RadioButton
          isClicked={facialButtonClicked}
          onClick={() => handleAnamnesisType(AnamnesisTypeEnum.FACIAL)}
        >
          Facial
        </RadioButton>
        <RadioButton
          isClicked={corporalButtonClicked}
          onClick={() => handleAnamnesisType(AnamnesisTypeEnum.BODY)}
        >
          Corporal
        </RadioButton>
      </div>
      <div className="pt-5">
        {facialButtonClicked && <FacialAnamnesisForm />}
        {corporalButtonClicked && <CorporalAnamnesisForm />}
      </div>
    </div>
  )
}
