import { useNewSaleContext } from '@/contexts/NewSaleContext'
import ClientCard from './ClientCard'
import PaymentCard from './PaymentCard'
import ProtocolCard from './ProtocolCard'
import ResumeBox from './(resume)/ResumeBox'

export default function NewSale() {
  const { sale, updateSale } = useNewSaleContext()

  return (
    <div>
      <div className="flex lg:flex-row md:flex-col gap-3">
        <div className="flex flex-col w-full">
          <ClientCard />
          <ProtocolCard />
          <PaymentCard />
        </div>
        <div className="flex w-full">
          <ResumeBox />
        </div>
      </div>
    </div>
  )
}
