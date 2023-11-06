import { NewSaleProvider } from '@/contexts/NewSaleContext'
import ClientCard from './ClientCard'
import PaymentCard from './PaymentCard'
import ProcedureCard from './ProcedureCard'
import ProtocolCard from './ProtocolCard'
import ResumeBox from './resume/ResumeBox'

export default function NewSale() {
  return (
    <div>
      <NewSaleProvider>
        <div className="flex lg:flex-row md:flex-col gap-3">
          <div className="flex flex-col w-full">
            <ClientCard />
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
