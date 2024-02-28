import CloseButton from '@/components/form/buttons/CloseButton'
import SelectInput from '@/components/form/hook-form/SelectInput'
import AutosuggestField from '@/components/form/inputs/AutosuggestField'
import { SessionForm } from '@/dtos/session/SessionForm'
import { SessionStatusEnum } from '@/enum/SessionStatusEnum'
import { Client } from '@/models/Client'
import { Protocol } from '@/models/Protocol'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useEffect, useState } from 'react'
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
  const [protocolNames, setProtocolsNames] = useState([''])
  const [procedureNames, setProcedureNames] = useState([''])
  const [isLoadingFields, setIsLoadingFields] = useState(true)

  const {
    handleSubmit,
    control,
    setValue,
    getValues,
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

  const findClient = useCallback(
    async (clientName: string) => {
      return clients.find((c) => c.name === clientName)
    },
    [clients],
  )

  function findProtocols(client: Client | undefined) {
    return client?.sales.flatMap((s) => s.protocols) || []
  }

  const updateClient = async (clientName: string) => {
    setValue('clientName', clientName)
    const client = await findClient(clientName)
    const protocols = findProtocols(client)
    if (protocols !== undefined && protocols.length > 0) {
      setProtocolsNames(
        getOnlyInProgressProtocols(protocols).map((p) => p.protocolName),
      )
    }
  }

  const updateProtocol = async (protocolName: string) => {
    setValue('protocol', protocolName)
    if (protocolName !== '' || protocolName !== undefined) {
      const client = await findClient(getValues('clientName'))
      const protocols = findProtocols(client)
      const protocol = protocols?.find((p) => p.protocolName === protocolName)
      const procedures = protocol?.saleItems.flatMap((s) => s.procedure)
      if (procedures !== undefined && procedures.length > 0) {
        setProcedureNames(procedures.map((p) => p.name))
      }
    }
  }

  function handleContinue(input: FormData) {
    const newSession: SessionForm = {
      id: createSession?.id,
      clientName: input.clientName,
      protocol: input.protocol,
      procedure: input.procedure,
      initDate: createSession?.initDate || undefined,
      finalDate: createSession?.finalDate || undefined,
      obs: createSession?.obs || undefined,
      status: createSession?.status,
    }

    setCreateSession(newSession)

    nextForm()
  }

  const populateFields = useCallback(async () => {
    if (
      createSession !== undefined &&
      createSession.clientName !== undefined &&
      createSession.protocol !== undefined &&
      createSession.procedure !== undefined
    ) {
      setValue('clientName', createSession.clientName)
      const client = await findClient(createSession.clientName)
      const protocols = findProtocols(client)
      if (protocols !== undefined && protocols.length > 0) {
        setProtocolsNames(
          getOnlyInProgressProtocols(protocols).map((p) => p.protocolName),
        )
        const protocol = protocols?.find(
          (p) => p.protocolName === createSession.protocol,
        )
        setValue('protocol', createSession.protocol)
        const procedures = protocol?.saleItems.flatMap((s) => s.procedure)
        if (procedures !== undefined && procedures.length > 0) {
          setProcedureNames(procedures.map((p) => p.name))
          setValue('procedure', createSession.procedure)
        }
      }
      setIsLoadingFields(false)
    }
  }, [createSession, findClient, setValue])

  useEffect(() => {
    if (isLoadingFields) {
      populateFields()
    }
  }, [isLoadingFields, populateFields])

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
              options={protocolNames}
              onChangeValue={updateProtocol}
              value={value}
              setValue={() => null}
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
              options={procedureNames}
              onChangeValue={onChange}
              value={value}
              setValue={() => null}
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
