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
import { useProceduresContext } from '@/contexts/ProcedureContext'
import SugestionInput from './inputs/SugestionInput'
import { FormEvent, useEffect, useState } from 'react'
import { Client } from '@/models/Client'
import { graphqlClient } from '@/server/graphql-client'
import { GET_CLIENTS } from '@/server/queries'
import Autosuggest from 'react-autosuggest'
import TimeInput from './inputs/picker/TimeInput'
import { dateFormatter, timeFormatter } from '@/utils/formatter'

interface FormEditSessionProps {
  onClose(): void
  date: Date | undefined
}

interface Response {
  findAllClients: Client[]
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
  date,
}: FormEditSessionProps) {
  const { procedures } = useProceduresContext()
  const [clients, setClients] = useState<Client[]>([])
  const [suggestionsList, setSuggestionsList] = useState<Client[]>([])
  const [name, setName] = useState('')
  // const [calendarDate, setCalendarDate] = useState(date)

  async function getAllClients() {
    const data = await graphqlClient.request<Response>(GET_CLIENTS)
    setClients(data.findAllClients)
  }

  const renderSuggestion = (suggestion: Client) => <div>{suggestion.name}</div>

  const onChange = (
    event: FormEvent<HTMLElement>,
    { newValue }: Autosuggest.ChangeEvent,
  ) => {
    setName(newValue)
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

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, dirtyFields },
  } = useForm<SessionFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      procedure: undefined,
      sessionDate: dateFormatter.format(date),
      initHour: buildHour(date),
      finalHour: undefined,
      obs: undefined,
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

  useEffect(() => {
    getAllClients()
    reset({
      procedure: undefined,
      sessionDate: dateFormatter.format(date),
      initHour: buildHour(date),
      finalHour: undefined,
      obs: undefined,
    })
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
            <div className="w-full">
              <SugestionInput
                text={name}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onChange={onChange}
                suggestionsList={suggestionsList}
                renderSuggestion={renderSuggestion}
                label="Nome do cliente"
              />
            </div>
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
              render={({ field: { onChange } }) => (
                <SelectInput
                  label="Procedimento"
                  options={getAllProceduresNames()}
                  isDirty={!!dirtyFields.procedure}
                  hasError={!!errors.procedure}
                  onChangeValue={onChange}
                  setValue={() => null}
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
