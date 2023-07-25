'use client'
import FinanceInfoPage from '@/components/client/detail/FinanceInfoPage'
import IndicationPage from '@/components/client/detail/IndicationPage'
import InfoPage from '@/components/client/detail/InfoPage'
import ProtocolsPage from '@/components/client/detail/ProtocolsPage'
import { useState } from 'react'

export default function ClientDetail() {
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

  return (
    <div className="flex flex-col h-full mx-10">
      <h1 className="text-2xl py-3">Renan França da Costa</h1>

      <div className="flex bg-white rounded p-4 gap-2 items-center">
        <span>Status: </span>
        <span className="rounded-full bg-success w-4 h-4"></span>
      </div>

      <div className="bg-white">
        <div className="flex gap-10 p-4">
          <button
            onClick={handleInfo}
            className={`border-b-2 hover:border-b-dark-primary p-3 transition duration-200 ${
              info ? 'border-b-dark-primary font-bold' : 'border-b-gray-300'
            }`}
          >
            Informações
          </button>
          <button
            onClick={handleIndication}
            className={`border-b-2 hover:border-b-dark-primary p-3 transition duration-200 ${
              indication
                ? 'border-b-dark-primary font-bold'
                : 'border-b-gray-300'
            }`}
          >
            Indicações
          </button>
          <button
            onClick={handleProtocols}
            className={`border-b-2 hover:border-b-dark-primary p-3 transition duration-200 ${
              protocols
                ? 'border-b-dark-primary font-bold'
                : 'border-b-gray-300'
            }`}
          >
            Protocolos
          </button>
          <button
            onClick={handleFinanceInfo}
            className={`border-b-2 hover:border-b-dark-primary p-3 transition duration-200 ${
              financeInfo
                ? 'border-b-dark-primary font-bold'
                : 'border-b-gray-300'
            }`}
          >
            Dados financeiros
          </button>
        </div>
        <div className="py-5">
          {info && <InfoPage />}
          {indication && <IndicationPage />}
          {protocols && <ProtocolsPage />}
          {financeInfo && <FinanceInfoPage />}
        </div>
      </div>
    </div>
  )
}
