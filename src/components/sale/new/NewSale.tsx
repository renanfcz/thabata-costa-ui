import { NewSaleFormProvider } from '@/contexts/forms/NewSaleFormContext'
import { NewSaleProvider, useNewSaleContext } from '@/contexts/NewSaleContext'
import { FormProvider } from 'react-hook-form'
import PaymentCard from './PaymentCard'
import ProcedureCard from './ProcedureCard'
import ProtocolCard from './ProtocolCard'
import ResumeBox from './resume/ResumeBox'

export default function NewSale() {
  return (
    <div>
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
    </div>
  )
}
