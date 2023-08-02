'use client'
import CloseButton from './buttons/CloseButton'
import SelectInput from './hook-form/SelectInput'
import TextAreaInput from './inputs/TextAreaInput'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import * as z from 'zod'
import SaveButton from './hook-form/SaveButton'
import DateTimeInput from './inputs/DateTimeInput'

interface FormEditProtocolProps {
  onClose(): void
}

const schema = z.object({
  procedure: z.string(),
  sessionDate: z.string().min(1),
  obs: z.string(),
})

type ProtocolFormData = z.infer<typeof schema>

export default function FormEditProtocol({ onClose }: FormEditProtocolProps) {
  const procedures = ['Drenagem', 'Massagem', 'Sobrancelha']

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, dirtyFields },
  } = useForm<ProtocolFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      procedure: undefined,
      sessionDate: undefined,
      obs: undefined,
    },
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  })

  function saveProtocol(data: ProtocolFormData) {
    console.log(data)
  }

  return (
    <div className="p-5 h-full">
      <h1 className="font-bold text-lg">Dados da sessão</h1>
      <form onSubmit={handleSubmit(saveProtocol)} className="h-full">
        <div className="flex flex-col gap-5 justify-center h-full">
          <div className="flex gap-2">
            <SelectInput
              label="Procedimento"
              options={procedures}
              isDirty={!!dirtyFields.procedure}
              hasError={!!errors.procedure}
              {...register('procedure')}
            />
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
          <div>
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
          <div className="flex gap-2 justify-end items-end w-full">
            <SaveButton />
            <CloseButton onClose={onClose} />
          </div>
        </div>
      </form>
    </div>
  )
}
