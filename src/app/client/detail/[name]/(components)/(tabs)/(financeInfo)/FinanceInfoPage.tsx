import Accordion from '@/components/accordion/Accordion'
import TableFinanceAccordion from '@/components/accordion/TableFinanceAccordion'

export default function FinanceInfoPage() {
  return (
    <div>
      <Accordion>
        <TableFinanceAccordion />
      </Accordion>
      <Accordion>
        <TableFinanceAccordion />
      </Accordion>
      <Accordion>
        <TableFinanceAccordion />
      </Accordion>
    </div>
  )
}
