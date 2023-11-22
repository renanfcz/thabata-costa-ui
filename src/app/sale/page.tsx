'use client'
import BackArrow from '@/components/form/buttons/BackArrow'
import HistSale from '@/app/sale/(hist)/HistSale'
import NewSale from '@/app/sale/(new)/NewSale'
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
    <div className="flex flex-col mx-10">
      <div className="flex justify-between items-center py-3">
        <BackArrow />
        <h1 className="text-2xl py-3">Vendas</h1>
        <div></div>
      </div>

      <div className="flex gap-5">
        <div className="flex flex-col gap-3 w-full">
          <div className="bg-white w-full">
            <div className="flex gap-10 p-4">
              <button
                onClick={showNewSale}
                className={`border-b-2 hover:border-b-light-secondary p-3 transition duration-200 ${
                  newSale
                    ? 'border-b-light-secondary font-bold'
                    : 'border-b-gray-300'
                }`}
              >
                Nova venda
              </button>
              <button
                onClick={showHistSale}
                className={`border-b-2 hover:border-b-light-secondary p-3 transition duration-200 ${
                  histSale
                    ? 'border-b-light-secondary font-bold'
                    : 'border-b-gray-300'
                }`}
              >
                Histórico de vendas
              </button>
            </div>
          </div>
          <div className="">
            <div className="py-3">
              {newSale && <NewSale />}
              {histSale && <HistSale />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
