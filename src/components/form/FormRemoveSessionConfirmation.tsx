import { Session } from '@/models/Session'
import { dateTimeFormatter, timeFormatter } from '@/utils/formatter'
import Title from '../modal/Title'
import BackButton from './buttons/BackButton'
import CloseButton from './buttons/CloseButton'
import RemoveButton from './buttons/RemoveButton'

interface FormRemoveSessionConfirmationProps {
  session: Session | undefined
  label: string
  onConfirm(id: string | undefined): void
  onClose(): void
}

export default function FormRemoveSessionConfirmation({
  session,
  label,
  onConfirm,
  onClose,
}: FormRemoveSessionConfirmationProps) {
  function getSessionDate(start: Date, end: Date) {
    const startSession = dateTimeFormatter.format(start)
    return startSession.toString() + ' - ' + timeFormatter.format(end)
  }

  return (
    <div className="flex flex-col gap-5">
      <BackButton onClick={onClose} />
      <div className="flex justify-center">
        <Title>{label}</Title>
      </div>
      <div className="flex flex-col">
        <span className="flex justify-center">
          Procedimento: {session?.saleItem.procedure.name}
        </span>
        <span className="flex justify-center">
          Cliente: {session?.saleItem.sale.client.name}
        </span>
        <span className="flex justify-center">
          Horário:{' '}
          {session
            ? getSessionDate(
                new Date(session.initDate),
                new Date(session.finalDate),
              )
            : ''}
        </span>
      </div>
      <div className="flex justify-end gap-2">
        <CloseButton onClose={onClose} />
        <RemoveButton onClick={() => onConfirm(session?.id)} />
      </div>
    </div>
  )
}
