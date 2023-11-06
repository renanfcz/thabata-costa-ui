import CloseButton from './buttons/CloseButton'
import SaveButton from './hook-form/SaveButton'
import SelectInput from './hook-form/SelectInput'
import TextInput from './hook-form/TextInput'
import DateInput from './inputs/picker/DateInput'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import * as z from 'zod'
import TextAreaInput from './inputs/TextAreaInput'
import Title from '../modal/Title'
import { useProceduresContext } from '@/contexts/ProcedureContext'
import TimeInput from './inputs/picker/TimeInput'
import { Session } from '@/models/Session'
import { dateFormatter } from '@/utils/formatter'

interface FormEditSessionProps {
  onClose(): void
  session: Session | undefined
}

const schema = z.object({
  client: z.string(),
  procedure: z.string(),
  sessionDate: z.string(),
  initHour: z.date(),
  finalHour: z.date(),
  obs: z.string(),
})

type SessionFormData = z.infer<typeof schema>

export default function FormEditSession({
  onClose,
  session,
}: FormEditSessionProps) {
  const { procedures } = useProceduresContext()

  function buildHour(date: Date | undefined) {
    if (date !== undefined) {
      const data = new Date(date)
      const fullDate = new Date(
        data.getUTCFullYear(),
        data.getUTCMonth(),
        data.getUTCDay(),
        data.getUTCHours(),
        data.getUTCMinutes(),
      )
      return fullDate
    }
    return undefined
  }

  function buildDaySession(date: Date | undefined) {
    if (date !== undefined) {
      const data = new Date(date)
      return dateFormatter.format(data)
    }
    return undefined
  }

  const {
    handleSubmit,
    control,
    register,
    formState: { errors, dirtyFields },
  } = useForm<SessionFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      client: session?.saleItem.sale.client.name,
      procedure: session?.saleItem.procedure.name,
      sessionDate: buildDaySession(session?.initDate),
      initHour: buildHour(session?.initDate),
      finalHour: buildHour(session?.finalDate),
      obs: session?.obs,
    },
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  })

  function saveSession(data: SessionFormData) {
    console.log(data)
  }

  function getAllProceduresNames() {
    if (procedures === undefined) {
      return ['']
    }

    return procedures.map((p) => p.name)
  }

  return (
    <div className="px-2">
      <form
        onSubmit={handleSubmit(saveSession)}
        className="flex flex-col gap-10 justify-items-center"
      >
        <Title>Dados da sessão</Title>
        <div className="flex flex-col gap-5 justify-center h-full">
          <div className="flex gap-2">
            <TextInput
              label="Nome do cliente"
              isDirty={
                !!dirtyFields.client || !!session?.saleItem.sale.client.name
              }
              hasError={!!errors.client}
              {...register('client')}
            />
            <Controller
              name="sessionDate"
              control={control}
              render={({ field: { value, onChange } }) => (
                <DateInput
                  label="Data da sessão"
                  hasError={!!errors.sessionDate}
                  value={value}
                  setValue={onChange}
                />
              )}
            />
          </div>
          <div className="flex gap-2">
            <Controller
              name="initHour"
              control={control}
              render={({ field: { value, onChange } }) => (
                <TimeInput
                  label="De"
                  hasError={!!errors.initHour}
                  value={value}
                  setValue={onChange}
                />
              )}
            />
            <Controller
              name="finalHour"
              control={control}
              render={({ field: { value, onChange } }) => (
                <TimeInput
                  label="Até"
                  hasError={!!errors.finalHour}
                  value={value}
                  setValue={onChange}
                />
              )}
            />
          </div>
          <div className="flex flex-col gap-5">
            <Controller
              name="procedure"
              control={control}
              render={({ field: { onChange, value } }) => (
                <SelectInput
                  label="Procedimento"
                  options={getAllProceduresNames()}
                  isDirty={!!dirtyFields.procedure}
                  hasError={!!errors.procedure}
                  onChangeValue={onChange}
                  setValue={() => null}
                  value={value}
                />
              )}
            />
            <Controller
              name="obs"
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextAreaInput
                  label="Observações"
                  value={value}
                  setValue={onChange}
                />
              )}
            />
          </div>
          <div className="flex justify-end">
            <div className="flex gap-2">
              <CloseButton onClose={onClose} />
              <SaveButton />
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
