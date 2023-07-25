'use client'
import HistSale from '@/components/sale/HistSale'
import NewSale from '@/components/sale/NewSale'
import { useState } from 'react'

export default function Sale() {
  const [newSale, setNewSale] = useState(true)
  const [histSale, setHistSale] = useState(false)

  const showNewSale = () => {
    setNewSale(true)
    setHistSale(false)
  }

  const showHistSale = () => {
    setNewSale(false)
    setHistSale(true)
  }

  return (
    <div className="flex flex-col h-full mx-10">
      <h1 className="text-2xl py-3">Vendas</h1>

      <div className="bg-white">
        <div className="flex gap-10 p-4">
          <button
            onClick={showNewSale}
            className={`border-b-2 hover:border-b-dark-primary p-3 transition duration-200 ${
              newSale ? 'border-b-dark-primary font-bold' : 'border-b-gray-300'
            }`}
          >
            Nova venda
          </button>
          <button
            onClick={showHistSale}
            className={`border-b-2 hover:border-b-dark-primary p-3 transition duration-200 ${
              histSale ? 'border-b-dark-primary font-bold' : 'border-b-gray-300'
            }`}
          >
            Histórico de vendas
          </button>
        </div>
        <div className="py-5">
          {newSale && <NewSale />}
          {histSale && <HistSale />}
        </div>
      </div>
    </div>
  )
}
