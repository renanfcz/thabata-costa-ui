import { PaymentTypeEnum } from '@/enum/PaymentTypeEnum'
import { createContext, useContext, useState } from 'react'

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
  paymentType: PaymentTypeEnum | undefined
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
