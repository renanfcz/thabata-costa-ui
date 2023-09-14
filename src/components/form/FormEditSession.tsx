import CloseButton from './buttons/CloseButton'
import SaveButton from './hook-form/SaveButton'
import SelectInput from './hook-form/SelectInput'
import TextInput from './hook-form/TextInput'
import DateTimeInput from './inputs/picker/DateInput'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import * as z from 'zod'
import TextAreaInput from './inputs/TextAreaInput'
import Title from '../modal/Title'

interface FormEditSessionProps {
  onClose(): void
}

const schema = z.object({
  client: z.string(),
  procedure: z.string(),
  sessionDate: z.string(),
  obs: z.string(),
})

type SessionFormData = z.infer<typeof schema>

export default function FormEditSession({ onClose }: FormEditSessionProps) {
  const procedures = ['Drenagem', 'Massagem', 'Sobrancelha']

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, dirtyFields },
  } = useForm<SessionFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      procedure: undefined,
      sessionDate: undefined,
      obs: undefined,
    },
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  })

  function saveSession(data: SessionFormData) {
    console.log(data)
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
            <TextInput label="Nome do cliente" disabled={true} />
            <Controller
              name="sessionDate"
              control={control}
              render={({ field: { value, onChange } }) => (
                <DateTimeInput
                  label="Data da sessão"
                  hasError={!!errors.sessionDate}
                  value={value}
                  setValue={onChange}
                />
              )}
            />
          </div>
          <div className="flex flex-col gap-5">
            <SelectInput
              label="Procedimento"
              options={procedures}
              isDirty={!!dirtyFields.procedure}
              hasError={!!errors.procedure}
              {...register('procedure')}
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
        </div>
        <div className="flex justify-end">
          <div className="flex gap-2">
            <CloseButton onClose={onClose} />
            <SaveButton />
          </div>
        </div>
      </form>
    </div>
  )
}
