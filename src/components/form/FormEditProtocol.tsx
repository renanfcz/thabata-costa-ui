'use client'
import { useProceduresContext } from '@/contexts/ProcedureContext'
import { Session } from '@/models/Session'
import { graphqlClient } from '@/server/graphql-client'
import { UPDATE_SESSION } from '@/server/mutations'
import { dateFormatter } from '@/utils/formatter'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as z from 'zod'

import Title from '../modal/Title'
import CloseButton from './buttons/CloseButton'
import SaveButton from './hook-form/SaveButton'
import SelectInput from './hook-form/SelectInput'
import DateInput from './inputs/picker/DateInput'
import TimeInput from './inputs/picker/TimeInput'
import TextAreaInput from './inputs/TextAreaInput'

interface FormEditProtocolProps {
  onClose(): void
  session: Session | undefined
  updateSession(session: Session): void
}

interface ResponseUpdateSession {
  updateSession: Session
}

const schema = z.object({
  procedure: z.string(),
  dateSession: z.string(),
  initHour: z.date(),
  finalHour: z.date(),
  obs: z.string(),
})

type ProtocolFormData = z.infer<typeof schema>

export default function FormEditProtocol({
  onClose,
  session,
  updateSession,
}: FormEditProtocolProps) {
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
    setValue,
    reset,
    formState: { errors, dirtyFields },
  } = useForm<ProtocolFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      procedure: session?.saleItem.procedure.name,
      dateSession: buildDaySession(session?.initDate),
      initHour: buildHour(session?.initDate),
      finalHour: buildHour(session?.finalDate),
      obs: session?.obs,
    },
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  })

  function buildDate(date: string, hour: Date) {
    const [dia, mes, ano] = date.split('/').map(Number)
    const dateTime = new Date(hour)
    const hora = dateTime.getHours()
    const minuto = dateTime.getMinutes()

    const data = new Date()
    data.setUTCFullYear(ano)
    data.setUTCMonth(mes - 1)
    data.setUTCDate(dia)
    data.setUTCHours(hora)
    data.setUTCMinutes(minuto)

    return data.toISOString()
  }

  function getProcedureId(name: string) {
    if (procedures !== undefined) {
      const procedure = procedures.filter((p) => p.name === name)[0]
      return procedure.id
    }
  }

  async function saveProtocol(input: ProtocolFormData) {
    const loading = toast.loading('Salvando...')
    console.log(input)
    try {
      const data = await graphqlClient.request<ResponseUpdateSession>(
        UPDATE_SESSION,
        {
          updateSessionInput: {
            id: session?.id,
            initDate: buildDate(input.dateSession, input.initHour),
            finalDate: buildDate(input.dateSession, input.finalHour),
            obs: input.obs,
            saleItemId: session?.saleItem.id,
            procedureId: getProcedureId(input.procedure),
            procedureName: input.procedure,
          },
        },
      )
      updateSession(data.updateSession)
      toast.update(loading, {
        render: 'Sessão atualizada com sucesso!',
        type: 'success',
        isLoading: false,
        autoClose: 5000,
      })
      onClose()
    } catch (error: any) {
      toast.update(loading, {
        render: error.response.errors[0].message,
        type: 'error',
        isLoading: false,
        autoClose: 5000,
      })
    }
  }

  function getAllProceduresNames() {
    if (procedures === undefined) {
      return ['']
    }

    return procedures.map((p) => p.name)
  }

  useEffect(() => {
    reset({
      procedure: session?.saleItem.procedure.name,
      dateSession: buildDaySession(session?.initDate),
      initHour: buildHour(session?.initDate),
      finalHour: buildHour(session?.finalDate),
      obs: session?.obs,
    })
  }, [])

  console.log(errors)

  return (
    <div className="px-2">
      <form onSubmit={handleSubmit(saveProtocol)}>
        <div className="flex flex-col gap-4 justify-center">
          <Title> Dados da sessão</Title>
          <div className="flex flex-col gap-4">
            <Controller
              name="procedure"
              control={control}
              render={({ field: { onChange, value } }) => (
                <SelectInput
                  label="Procedimento"
                  options={getAllProceduresNames()}
                  isDirty={
                    !!dirtyFields.procedure ||
                    !!session?.saleItem.procedure.name
                  }
                  hasError={!!errors.procedure}
                  value={value}
                  onChangeValue={onChange}
                  setValue={(selectedValue: string) =>
                    setValue('procedure', selectedValue)
                  }
                />
              )}
            />
            <Controller
              name="dateSession"
              control={control}
              render={({ field: { value, onChange } }) => (
                <DateInput
                  label="Data da sessão"
                  hasError={!!errors.dateSession}
                  value={value}
                  setValue={onChange}
                />
              )}
            />
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
          </div>
          <div className="flex gap-2 justify-end items-end w-full lg:mt-0 md:-mt-2 xl:-mt-2">
            <CloseButton onClose={onClose} />
            <SaveButton />
          </div>
        </div>
      </form>
    </div>
  )
}
