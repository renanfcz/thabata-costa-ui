import { createContext, useContext, useState } from 'react'

enum PaymentType {
  MONEY = 'money',
  PIX = 'pix',
  DEBIT = 'debit',
  CREDIT = 'credit',
}
interface Procedure {
  procedureId: string
  value: number
  discount: number
  sessionsNum: number
}

interface NewSale {
  clientId: string
  protocolName: string
  protocolDesc: string
  procedures: Procedure[]
  paymentType: PaymentType | undefined
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
    clientId: '',
    protocolName: '',
    protocolDesc: '',
    procedures: [],
    paymentType: undefined,
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
