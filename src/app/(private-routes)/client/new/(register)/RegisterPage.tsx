'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import * as z from 'zod'
import TextInput from '@/components/form/hook-form/TextInput'
import DocumentInput from '@/components/form/inputs/DocumentInput'
import DateInput from '@/components/form/inputs/DateInput'
import CellPhoneInput from '@/components/form/inputs/CellPhoneInput'
import { graphqlClient } from '@/server/graphql-client'
import { formatDateString } from '@/utils/formatter'
import { toast } from 'react-toastify'
import SelectInput from '@/components/form/hook-form/SelectInput'
import { CREATE_CLIENT } from '@/server/mutations/requests/client/ClientMutations'
import { SocialMediaEnum } from '@/enum/SocialMediaEnum'
import { Client } from '@/models/Client'
import { useEffect, useState } from 'react'
import { GET_CLIENTS } from '@/server/queries/requests/client/ClientQueries'
import { ResponseClients } from '@/server/queries/responses/ClientResponses'
import Autosuggest from 'react-autosuggest'
import AutosuggestField from '@/components/form/inputs/AutosuggestField'
import { KnowUsEnum } from '@/enum/KnowUsEnum'

const schema = z.object({
  name: z.string().min(5),
  cpf: z.string().min(11),
  dateBirth: z.string().min(8),
  celphone: z.string().min(11),
  state: z.string().min(2),
  city: z.string().min(3),
  street: z.string().min(5).optional(),
  number: z.coerce.number().min(1).optional(),
  complement: z.string().optional(),
  socialMediaId: z.string().optional(),
  socialMedia: z.enum([SocialMediaEnum.FACEBOOK, SocialMediaEnum.INSTAGRAM]).optional(),
  knowUs: z.enum([KnowUsEnum.FACEBOOK, KnowUsEnum.INDICATION, KnowUsEnum.INSTAGRAM]).optional(),
  recommendedBy: z.string().optional(),
})

type ClientFormData = z.infer<typeof schema>

export default function RegisterPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [suggestionsList, setSuggestionsList] = useState<Client[]>([])

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, dirtyFields },
  } = useForm<ClientFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: undefined,
      cpf: undefined,
      dateBirth: undefined,
      celphone: undefined,
      state: undefined,
      city: undefined,
      street: undefined,
      number: undefined,
      complement: undefined,
      socialMediaId: undefined,
      socialMedia: undefined,
      knowUs: undefined,
      recommendedBy: undefined
    },
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  })

  const knowUsWatch = watch('knowUs')

  const midiaOptions = Object.values(SocialMediaEnum)

  const knowUsOptions = Object.values(KnowUsEnum)

  const stateOptions = ['RJ', 'SP', 'MG']

  const cityOptions = ['Rio de Janeiro', 'São Paulo', 'Belo Horizonte']

  async function handleSaveClient(clientInput: ClientFormData) {
    const inputData = {
      ...clientInput,
      knowUs: KnowUsEnum.getKey(clientInput.knowUs),
      socialMedia: SocialMediaEnum.getKey(clientInput.socialMedia),
      recommendedBy: clientInput.recommendedBy
    }
    inputData.dateBirth = formatDateString(clientInput.dateBirth)
    try {
      await graphqlClient.request(CREATE_CLIENT, {
        createClientInput: inputData,
      })
      toast.success('Cliente criado com sucesso!')
    } catch (e) {
      console.log(e)
      toast.error('Ocorreu um erro ao tentar cadastrar cliente!')
    }
  }

  const buildClientNameList = () => {
    return suggestionsList.map((suggestion) => {
      return suggestion.name
    })
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

  async function getAllClients() {
    const data = await graphqlClient.request<ResponseClients>(GET_CLIENTS)
    setClients(data.findAllClients)
  }

  function indicationKnowUsIsSelected() {
    return knowUsWatch === KnowUsEnum.INDICATION
  }

  useEffect(() => {
    console.log(KnowUsEnum.getValue('INDICATION'))
    getAllClients()
  }, [])

  return (
    <div className="px-5 lg:w-1/2">
      <form
        onSubmit={handleSubmit(handleSaveClient)}
        className="flex flex-col gap-5"
      >
        <div className="flex flex-col gap-5">
          <span className="text-sm">Dados pessoais</span>
          <div className="flex gap-2">
            <TextInput
              label="Nome"
              isDirty={!!dirtyFields.name}
              hasError={!!errors.name}
              {...register('name')}
            />
            <Controller
              name="cpf"
              control={control}
              render={({ field: { value, onChange } }) => (
                <DocumentInput
                  label="CPF"
                  hasError={!!errors.cpf}
                  value={value}
                  setValue={onChange}
                />
              )}
            />
          </div>
          <div className="flex gap-2">
            <Controller
              name="dateBirth"
              control={control}
              render={({ field: { value, onChange } }) => (
                <DateInput
                  label="Data de nascimento"
                  hasError={!!errors.dateBirth}
                  value={value}
                  setValue={onChange}
                />
              )}
            />
            <Controller
              name="celphone"
              control={control}
              render={({ field: { value, onChange } }) => (
                <CellPhoneInput
                  label="Celular"
                  hasError={!!errors.celphone}
                  value={value}
                  setValue={onChange}
                />
              )}
            />
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <span className="text-sm">Endereço</span>
          <div className="flex basis-1/4 gap-2">
            <Controller
              name="state"
              control={control}
              render={({ field: { value, onChange } }) => (
                <SelectInput
                  label="Estado"
                  options={stateOptions}
                  isDirty={!!dirtyFields.state}
                  hasError={!!errors.state}
                  onChangeValue={onChange}
                  setValue={() => null}
                  value={value}
                />
              )}
            />
            <Controller
              name="city"
              control={control}
              render={({ field: { value, onChange } }) => (
                <SelectInput
                  label="Cidade"
                  options={cityOptions}
                  isDirty={!!dirtyFields.city}
                  hasError={!!errors.city}
                  onChangeValue={onChange}
                  setValue={() => null}
                  value={value}
                />
              )}
            />
          </div>
          <div className="">
            <TextInput
              label="Logradouro"
              isDirty={!!dirtyFields.street}
              hasError={!!errors.street}
              {...register('street')}
            />
          </div>
          <div className="flex gap-2">
            <TextInput
              label="Numero"
              isDirty={!!dirtyFields.number}
              hasError={!!errors.number}
              {...register('number')}
            />
            <TextInput
              label="Complemento"
              isDirty={!!dirtyFields.complement}
              hasError={!!errors.complement}
              {...register('complement')}
            />
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <span className="text-sm">Mídia Social</span>
          <div className="flex gap-2">
            <TextInput
              label="@"
              isDirty={!!dirtyFields.socialMediaId}
              hasError={!!errors.socialMediaId}
              {...register('socialMediaId')}
            />
            <Controller
              name="socialMedia"
              control={control}
              render={({ field: { value, onChange } }) => (
                <SelectInput
                  label="Mídia social"
                  options={midiaOptions}
                  isDirty={!!dirtyFields.socialMedia}
                  hasError={!!errors.socialMedia}
                  onChangeValue={onChange}
                  setValue={() => null}
                  value={value}
                />
              )}
            />
          </div>
          <Controller
            name="knowUs"
            control={control}
            render={({ field: { value, onChange } }) => (
              <SelectInput
                label="Como nos conheceu?"
                options={knowUsOptions}
                isDirty={!!dirtyFields.knowUs}
                hasError={!!errors.knowUs}
                onChangeValue={onChange}
                setValue={() => null}
                value={value}
              />
            )}
          />
        </div>
        {indicationKnowUsIsSelected() && (
          <div>
            <Controller
                name="recommendedBy"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <AutosuggestField
                      label="Quem te indicou?"
                      onGetSuggestionValue={(suggestion: string) => suggestion}
                      onSuggestionsClearRequested={onSuggestionsClearRequested}
                      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                      suggestionsList={buildClientNameList()}
                      updateContext={onChange}
                      value={value}
                    />
                  )}
              />
          </div>
        )}
        <div>
          <button
            type="submit"
            className="px-10 py-3 font-bold border border-info rounded text-info hover:bg-info hover:text-white transition duration-200 w-full"
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  )
}
