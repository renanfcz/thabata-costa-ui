'use client'
import CloseButton from './buttons/CloseButton'
import SaveButton from './hook-form/SaveButton'
import SelectInput from './hook-form/SelectInput'
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
import { toast } from 'react-toastify'
import { graphqlClient } from '@/server/graphql-client'
import { CREATE_SESSION, UPDATE_SESSION } from '@/server/mutations'
import AutosuggestField from './inputs/AutosuggestField'
import { useEffect, useState } from 'react'
import { GET_CLIENTS } from '@/server/queries'
import { Client } from '@/models/Client'
import Autosuggest from 'react-autosuggest'
import { RangeHour } from '@/app/schedule/page'
import {
  ResponseCreateSession,
  ResponseUpdateSession,
} from '@/server/mutations/responses/SessionResponses'
import { ResponseClients } from '@/server/queries/responses/ClientResponses'

interface FormEditSessionProps {
  onClose(): void
  session: Session | undefined
  updateSession(session: Session): void
  selectedRange: RangeHour | undefined
  showConfirmation(): void
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
  updateSession,
  selectedRange,
  showConfirmation,
}: FormEditSessionProps) {
  const { procedures } = useProceduresContext()
  const [clients, setClients] = useState<Client[]>([])
  const [suggestionsList, setSuggestionsList] = useState<Client[]>([])

  function buildHour(date: Date | undefined) {
    if (date !== undefined) {
      const data = new Date(date)
      const fullDate = new Date(
        data.getUTCFullYear(),
        data.getUTCMonth(),
        data.getUTCDate(),
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
    formState: { errors, dirtyFields },
  } = useForm<SessionFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      client: session?.saleItem.sale.client.name,
      procedure: session?.saleItem.procedure.name,
      sessionDate: buildDaySession(session?.initDate || selectedRange?.start),
      initHour: selectedRange?.start || buildHour(session?.initDate),
      finalHour:
        selectedRange?.end ||
        buildHour(session?.finalDate || selectedRange?.end),
      obs: session?.obs || '',
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

    return data
  }

  function getProcedureId(name: string) {
    if (procedures !== undefined) {
      const procedure = procedures.filter((p) => p.name === name)[0]
      return procedure.id
    }
  }

  function getClientId(name: string) {
    if (clients !== undefined) {
      const client = clients.filter((p) => p.name === name)[0]
      return client.id
    }
  }

  async function saveSession(input: SessionFormData) {
    if (session) {
      const loading = toast.loading('Salvando...')
      try {
        const updatedSession =
          await graphqlClient.request<ResponseUpdateSession>(UPDATE_SESSION, {
            updateSessionInput: {
              id: session?.id,
              initDate: buildDate(input.sessionDate, input.initHour),
              finalDate: buildDate(input.sessionDate, input.finalHour),
              obs: input.obs || '',
              saleItemId: session?.saleItem.id,
              procedureId: getProcedureId(input.procedure),
              procedureName: input.procedure,
            },
          })
        updateSession(updatedSession.updateSession)
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
    } else {
      const loading = toast.loading('Salvando...')
      try {
        const createdSession =
          await graphqlClient.request<ResponseCreateSession>(CREATE_SESSION, {
            createSessionInput: {
              initDate: buildDate(input.sessionDate, input.initHour),
              finalDate: buildDate(input.sessionDate, input.finalHour),
              obs: input.obs || '',
              clientId: getClientId(input.client),
              procedureId: getProcedureId(input.procedure),
            },
          })
        updateSession(createdSession.createSession)
        toast.update(loading, {
          render: 'Sessão criada com sucesso!',
          type: 'success',
          isLoading: false,
          autoClose: 5000,
        })
        onClose()
      } catch (error: any) {
        console.log(error)
        toast.update(loading, {
          render: error.response.errors[0].message,
          type: 'error',
          isLoading: false,
          autoClose: 5000,
        })
      }
    }
  }

  function getAllProceduresNames() {
    if (procedures === undefined) {
      return ['']
    }

    return procedures.map((p) => p.name)
  }

  async function getAllClients() {
    const data = await graphqlClient.request<ResponseClients>(GET_CLIENTS)
    setClients(data.findAllClients)
  }

  const onSuggestionsFetchRequested = ({
    value,
  }: Autosuggest.SuggestionsFetchRequestedParams) => {
    const inputValue = value.toLowerCase()
    const filteredSuggestions = clients.filter((client) =>
      client.name.toLowerCase().includes(inputValue),
    )
    if (filteredSuggestions.length > 5) {
      setSuggestionsList(filteredSuggestions.slice(0, 5))
    } else {
      setSuggestionsList(filteredSuggestions)
    }
  }

  const onSuggestionsClearRequested = () => {
    setSuggestionsList([])
  }

  const buildClientNameList = () => {
    return suggestionsList.map((suggestion) => {
      return suggestion.name
    })
  }

  useEffect(() => {
    getAllClients()
  }, [])

  return (
    <div className="px-2">
      <form
        onSubmit={handleSubmit(saveSession)}
        className="flex flex-col gap-10 justify-items-center"
      >
        <Title>Dados da sessão</Title>
        <div className="flex flex-col gap-5 justify-center h-full">
          <div className="flex gap-2">
            <Controller
              name="client"
              control={control}
              render={({ field: { value, onChange } }) => (
                <AutosuggestField
                  label="Nome do cliente"
                  onGetSuggestionValue={(suggestion: string) => suggestion}
                  onSuggestionsClearRequested={onSuggestionsClearRequested}
                  onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                  suggestionsList={buildClientNameList()}
                  updateContext={onChange}
                  value={value}
                />
              )}
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
          <div className="flex justify-between">
            <div>
              <button
                onClick={showConfirmation}
                className="px-10 py-3 font-bold border rounded border-white text-primary hover:text-dark-primary transition duration-200"
              >
                Excluir
              </button>
            </div>
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
