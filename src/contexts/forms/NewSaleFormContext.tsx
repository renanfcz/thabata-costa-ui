import { createContext, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const schema = z.object({
  protocolName: z.string().min(3),
  protocolDesc: z.string().min(3),
  paymentType: z.enum(['1', '2', '3']),
})

const NewSaleFormContext = createContext({} as any)
export const useNewSaleFormContext = () => useContext(NewSaleFormContext)

export const NewSaleFormProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const methods = useForm({
    resolver: zodResolver(schema),
  })

  return (
    <NewSaleFormContext.Provider value={methods}>
      {children}
    </NewSaleFormContext.Provider>
  )
}
