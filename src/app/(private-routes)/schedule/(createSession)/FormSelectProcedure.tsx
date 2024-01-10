import CloseButton from '@/components/form/buttons/CloseButton'
import SelectInput from '@/components/form/hook-form/SelectInput'
import AutosuggestField from '@/components/form/inputs/AutosuggestField'
import { SessionForm } from '@/dtos/session/SessionForm'
import { SessionStatusEnum } from '@/enum/SessionStatusEnum'
import { Client } from '@/models/Client'
import { Procedure } from '@/models/Procedure'
import { Protocol } from '@/models/Protocol'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import Autosuggest from 'react-autosuggest'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

interface FormSelectProcedureProps {
  clients: Client[]
  createSession: SessionForm | undefined
  setCreateSession(session: SessionForm | undefined): void
  nextForm(): void
  onClose(): void
}

const schema = z.object({
  clientName: z.string().refine((data) => data.trim() !== ''),
  protocol: z.string().refine((data) => data.trim() !== ''),
  procedure: z.string().refine((data) => data.trim() !== ''),
})

type FormData = z.infer<typeof schema>

export default function FormSelectProcedure({
  clients,
  createSession,
  setCreateSession,
  nextForm,
  onClose,
}: FormSelectProcedureProps) {
  const [suggestionsList, setSuggestionsList] = useState<Client[]>([])
  const [protocols, setProtocols] = useState<Protocol[]>()
  const [procedures, setProcedures] = useState<Procedure[]>()

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors, dirtyFields },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      clientName: createSession?.clientName,
      procedure: createSession?.procedure,
      protocol: createSession?.protocol,
    },
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  })

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

  function getOnlyInProgressProtocols(protocols: Protocol[]) {
    return protocols.filter((p) => {
      const items = p.saleItems.filter((item) => {
        const sessions = item.sessions?.filter(
          (s) =>
            s.status === SessionStatusEnum.FINISHED ||
            s.status === SessionStatusEnum.SCHEDULED,
        )

        return sessions === undefined || sessions.length < item.sessionsNum
      })
      return items
    })
  }

  function updateClient(clientName: string) {
    setValue('clientName', clientName)
    const client = clients.find((c) => c.name === clientName)
    const protocols = client?.sales.flatMap((s) => s.protocols) || []
    setProtocols(getOnlyInProgressProtocols(protocols))
  }

  function updateProtocol(protocolName: string) {
    setValue('protocol', protocolName)
    if (protocolName === '') {
      setProcedures([])
    } else {
      const protocol = protocols?.find((p) => p.protocolName === protocolName)
      const procedures = protocol?.saleItems.flatMap((s) => s.procedure)
      setProcedures(procedures)
    }
  }

  function getAllProtocolNames() {
    if (protocols === undefined) {
      return ['']
    }

    return protocols.map((p) => p.protocolName)
  }

  function getAllProcedureNames() {
    if (procedures === undefined) {
      return ['']
    }

    return procedures.map((p) => p.name)
  }

  function handleContinue(input: FormData) {
    const newSession: SessionForm = {
      clientName: input.clientName,
      protocol: input.protocol,
      procedure: input.procedure,
      initDate: createSession?.initDate || undefined,
      finalDate: createSession?.finalDate || undefined,
      obs: createSession?.obs || undefined,
    }

    setCreateSession(newSession)

    nextForm()
  }

  useEffect(() => {
    if (
      createSession !== undefined &&
      createSession.clientName !== undefined &&
      createSession.protocol !== undefined &&
      createSession.procedure !== undefined
    ) {
      updateClient(createSession.clientName)
      updateProtocol(createSession.protocol)
    }
  }, [createSession, updateClient, updateProtocol])

  return (
    <div>
      <form
        onSubmit={handleSubmit(handleContinue)}
        className="flex flex-col gap-7 py-3"
      >
        <Controller
          name="clientName"
          control={control}
          render={({ field: { value } }) => (
            <AutosuggestField
              label="Nome do cliente"
              onGetSuggestionValue={(suggestion: string) => suggestion}
              onSuggestionsClearRequested={onSuggestionsClearRequested}
              onSuggestionsFetchRequested={onSuggestionsFetchRequested}
              suggestionsList={buildClientNameList()}
              updateContext={(e) => updateClient(e)}
              value={value}
            />
          )}
        />

        <Controller
          name="protocol"
          control={control}
          render={({ field: { value } }) => (
            <SelectInput
              label="Protocolos"
              options={getAllProtocolNames()}
              onChangeValue={updateProtocol}
              setValue={() => null}
              value={value}
              hasError={!!errors.protocol}
              isDirty={!!dirtyFields.protocol}
            />
          )}
        />

        <Controller
          name="procedure"
          control={control}
          render={({ field: { value, onChange } }) => (
            <SelectInput
              label="Procedimentos"
              options={getAllProcedureNames()}
              onChangeValue={onChange}
              setValue={() => null}
              value={value}
              hasError={!!errors.procedure}
              isDirty={!!dirtyFields.procedure}
            />
          )}
        />

        <div className="flex w-full gap-2 justify-end">
          <CloseButton onClose={onClose} />
          <button
            className="px-10 py-3 font-bold border border-info rounded text-info hover:bg-info hover:text-white transition duration-200"
            type="submit"
          >
            Continuar
          </button>
        </div>
      </form>
    </div>
  )
}
