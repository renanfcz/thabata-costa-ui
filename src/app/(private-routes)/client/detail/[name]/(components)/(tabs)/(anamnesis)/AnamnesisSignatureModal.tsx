'use client'
import CloseButton from '@/components/form/buttons/CloseButton'
import Title from '@/components/modal/Title'
import { useClientContext } from '@/contexts/client/ClientContext'
import { graphqlClient } from '@/server/graphql-client'
import { SIGN_ANAMNESIS } from '@/server/mutations/requests/anamnesis/AnamnesisMutations'
import { ResponseSignAnamnesis } from '@/server/mutations/responses/AnamnesisResponse'
import { GET_CLIENT_BY_NAME } from '@/server/queries/requests/client/ClientQueries'
import { ResponseFindClientByName } from '@/server/queries/responses/ClientResponses'
import { useRef } from 'react'
import SignatureCanvas from 'react-signature-canvas'
import { toast } from 'react-toastify'

interface AnamnesisSignatureModalProps {
  isOpen: boolean
  onClose(): void
  closeDetails(): void
  idAnamnesis: string | undefined
}

export default function AnamnesisSignatureModal({
  isOpen,
  onClose,
  closeDetails,
  idAnamnesis,
}: AnamnesisSignatureModalProps) {
  const signatureRef = useRef<SignatureCanvas>(null)
  const { client, updateClient } = useClientContext()

  if (!isOpen) return null

  const clearSignature = () => {
    if (signatureRef.current) {
      signatureRef.current.clear()
    }
  }

  async function saveSignature() {
    if (signatureRef.current && !signatureRef.current.isEmpty()) {
      const signature = signatureRef.current.toDataURL()
      try {
        await graphqlClient.request<ResponseSignAnamnesis>(SIGN_ANAMNESIS, {
          input: {
            id: idAnamnesis,
            signature,
          },
        })
        const updatedClient =
          await graphqlClient.request<ResponseFindClientByName>(
            GET_CLIENT_BY_NAME,
            { name: client?.name },
          )
        updateClient(updatedClient.findClientByName)
        toast.success('Anamnese assinada com sucesso!')
        onClose()
        closeDetails()
      } catch (e) {
        toast.error('Ocorreu um erro ao tentar assinar a anamnese')
      }
    } else {
      toast.error('Coloque sua assinatura ou rubrica antes de confirmar!')
    }
  }

  return (
    <div className="fixed z-10 inset-0 flex items-center justify-center bg-black bg-opacity-50 w-full">
      <div className="bg-white p-4 rounded-lg shadow-md relative w-full h-72 mx-5 flex flex-col gap-4">
        <div className="flex">
          <Title>Assine seu nome completo ou uma rubrica</Title>
        </div>
        <div className="h-44 border-2 border-gray-400 rounded">
          <SignatureCanvas
            ref={signatureRef}
            canvasProps={{
              className: 'assinatura-canvas w-full h-full',
            }}
          />
        </div>
        <div className="flex w-full gap-2 justify-end">
          <CloseButton onClose={onClose} />
          <button
            className="px-10 py-3 font-bold border border-secondary rounded text-secondary hover:bg-secondary hover:text-white transition duration-200"
            onClick={clearSignature}
          >
            Corrigir
          </button>
          <button
            className="px-10 py-3 font-bold border border-info rounded text-info hover:bg-info hover:text-white transition duration-200"
            onClick={saveSignature}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  )
}
