'use client'
import DetailsSections from '@/components/client/detail/DetailsSections'
import { ClientProvider } from '@/contexts/client/ClientContext'
import { ChevronsLeft } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

interface ClientDetailProps {
  params: {
    name: string
  }
}

export default function ClientDetail({ params }: ClientDetailProps) {
  const [info, setInfo] = useState(true)
  const [indication, setIndication] = useState(false)
  const [protocols, setProtocols] = useState(false)
  const [financeInfo, setFinanceInfo] = useState(false)

  const handleInfo = () => {
    setInfo(true)
    setIndication(false)
    setProtocols(false)
    setFinanceInfo(false)
  }

  const handleIndication = () => {
    setInfo(false)
    setIndication(true)
    setProtocols(false)
    setFinanceInfo(false)
  }

  const handleProtocols = () => {
    setInfo(false)
    setIndication(false)
    setProtocols(true)
    setFinanceInfo(false)
  }

  const handleFinanceInfo = () => {
    setInfo(false)
    setIndication(false)
    setProtocols(false)
    setFinanceInfo(true)
  }

  function decodeStringParams(param: string) {
    return decodeURIComponent(param)
  }

  return (
    <div className="flex flex-col h-full mx-10">
      <h1 className="text-2xl py-3">{decodeStringParams(params.name)}</h1>

      <div className="bg-white">
        <div className="flex">
          <Link
            href="/client"
            className="flex text-gray-400 hover:text-gray-600 px-4 py-2"
          >
            <ChevronsLeft />
            Voltar
          </Link>
        </div>
        <div className="flex p-4 gap-2 items-center">
          <span>Status: </span>
          <span className="rounded-full bg-success w-4 h-4"></span>
        </div>
        <div className="flex gap-10 p-4">
          <button
            onClick={handleInfo}
            className={`border-b-2 hover:border-b-light-secondary p-3 transition duration-200 ${
              info ? 'border-b-light-secondary font-bold' : 'border-b-gray-300'
            }`}
          >
            Informações
          </button>
          <button
            onClick={handleIndication}
            className={`border-b-2 hover:border-b-light-secondary p-3 transition duration-200 ${
              indication
                ? 'border-b-light-secondary font-bold'
                : 'border-b-gray-300'
            }`}
          >
            Indicações
          </button>
          <button
            onClick={handleProtocols}
            className={`border-b-2 hover:border-b-light-secondary p-3 transition duration-200 ${
              protocols
                ? 'border-b-light-secondary font-bold'
                : 'border-b-gray-300'
            }`}
          >
            Protocolos
          </button>
          <button
            onClick={handleFinanceInfo}
            className={`border-b-2 hover:border-b-light-secondary p-3 transition duration-200 ${
              financeInfo
                ? 'border-b-light-secondary font-bold'
                : 'border-b-gray-300'
            }`}
          >
            Dados financeiros
          </button>
        </div>
        <div className="py-5">
          <ClientProvider>
            <DetailsSections
              clientName={decodeStringParams(params.name)}
              info={info}
              indication={indication}
              protocols={protocols}
              financeInfo={financeInfo}
            />
          </ClientProvider>
        </div>
      </div>
    </div>
  )
}
