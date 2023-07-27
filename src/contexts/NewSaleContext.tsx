import { createContext, useContext, useState } from 'react'

interface Procedure {
  name: string
  value: number
  discount: number
  sessions: number
}

interface NewSale {
  protocolName: string
  protocolDesc: string
  procedures: Procedure[]
  paymentMethod: number
}

interface NewSaleContextType {
  sale: NewSale
  updateSale(sale: NewSale): void
}

const NewSaleContext = createContext({} as NewSaleContextType)

export const useNewSaleContext = () => useContext(NewSaleContext)

export const NewSaleProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [sale, setSale] = useState<NewSale>({
    protocolName: '',
    protocolDesc: '',
    procedures: [],
    paymentMethod: 0,
  })
  const updateSale = (sale: NewSale) => {
    setSale(sale)
  }

  return (
    <NewSaleContext.Provider value={{ sale, updateSale }}>
      {children}
    </NewSaleContext.Provider>
  )
}
