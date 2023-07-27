import {
  NewSaleFormProvider,
  useNewSaleFormContext,
} from '@/contexts/forms/NewSaleFormContext'
import { NewSaleProvider } from '@/contexts/NewSaleContext'
import PaymentCard from './PaymentCard'
import ProcedureCard from './ProcedureCard'
import ProtocolCard from './ProtocolCard'
import ResumeBox from './resume/ResumeBox'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

interface Procedure {
  name: string
  value: string
  discount: string
  sessions: string
}

interface NewSale {
  protocolName: string
  protocolDesc: string
  procedures: Procedure[]
  paymentType: number
}

const procedureSchema = z.object({
  name: z.string().min(3),
  sessions: z.number().min(0),
  value: z.number(),
  discount: z.number(),
})

const schema = z.object({
  protocolName: z.string().min(3),
  protocolDesc: z.string().min(3),
  procedures: z.array(z.object({ procedureSchema })),
  paymentType: z.enum(['1', '2', '3']),
})

export default function NewSale() {
  return (
    <div>
      <NewSaleFormProvider>
        <NewSaleProvider>
          <div className="flex gap-3">
            <div className="flex flex-col w-full gap-5">
              <ProtocolCard />
              <ProcedureCard />
              <PaymentCard />
            </div>
            <div className="flex w-full">
              <ResumeBox />
            </div>
          </div>
        </NewSaleProvider>
      </NewSaleFormProvider>
    </div>
  )
}
