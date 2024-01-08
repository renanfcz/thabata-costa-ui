import { CreateSale } from '@/dtos/sale/CreateSale'
import { createContext, useContext, useState } from 'react'

interface NewSaleContextType {
  sale: CreateSale | undefined
  updateSale(sale: CreateSale): void
}

const NewSaleContext = createContext({} as NewSaleContextType)

export const useNewSaleContext = () => useContext(NewSaleContext)

export const NewSaleProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [sale, setSale] = useState<CreateSale>()

  const updateSale = (sale: CreateSale) => {
    setSale(sale)
  }

  return (
    <NewSaleContext.Provider value={{ sale, updateSale }}>
      {children}
    </NewSaleContext.Provider>
  )
}
