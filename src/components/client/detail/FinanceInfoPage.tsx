import Accordion from '../../accordion/Accordion'
import TableFinanceAccordion from '../../accordion/TableFinanceAccordion'

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
