'use client'
import { ChevronDown } from 'lucide-react'
import React, { useState } from 'react'

export default function Accordion({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleAccordion = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="px-3 py-4">
      <button
        onClick={toggleAccordion}
        className={`px-3 py-4 w-full flex justify-between bg-primary rounded ${
          isOpen ? 'rounded-b-none' : ''
        }`}
      >
        <div>
          <span className="text-white">Protocolo: Facial</span>
        </div>

        <div className="flex">
          <span className="text-white">Data de compra: 20/07/2023</span>

          <span
            className={`px-3 ml-auto transition duration-300 transform ${
              isOpen ? 'rotate-180' : 'rotate-0'
            }`}
          >
            <ChevronDown className="text-white" />
          </span>
        </div>
      </button>
      <div
        className={`overflow-hidden duration-200 transition-max-h ${
          isOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        {children}
      </div>
    </div>
  )
}
