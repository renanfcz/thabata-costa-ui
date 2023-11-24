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

const schema = z.object({
  name: z.string().min(5),
  cpf: z.string().min(11),
  dateBirth: z.string().min(8),
  celphone: z.string().min(11),
  state: z.string().min(2),
  city: z.string().min(3),
  street: z.string().min(5),
  number: z.coerce.number().min(1),
  complement: z.string(),
  socialMediaId: z.string(),
  socialMedia: z.string(),
  knowUs: z.string(),
})

type ClientFormData = z.infer<typeof schema>

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    control,
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
    },
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  })

  const midiaOptions = ['Instagram', 'Facebook']

  const stateOptions = ['RJ', 'SP', 'MG']

  const cityOptions = ['Rio de Janeiro', 'São Paulo', 'Belo Horizonte']

  async function handleSaveClient(clientInput: ClientFormData) {
    clientInput.dateBirth = formatDateString(clientInput.dateBirth)
    try {
      await graphqlClient.request(CREATE_CLIENT, {
        createClientInput: clientInput,
      })
      toast.success('Cliente criado com sucesso!')
    } catch (e) {
      toast.error('Ocorreu um erro ao tentar cadastrar cliente!')
    }
  }

  return (
    <div className="px-5 w-full">
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
                options={midiaOptions}
                isDirty={!!dirtyFields.knowUs}
                hasError={!!errors.knowUs}
                onChangeValue={onChange}
                setValue={() => null}
                value={value}
              />
            )}
          />
        </div>
        <div>
          <button
            type="submit"
            className="px-10 py-3 font-bold border border-info rounded text-info hover:bg-info hover:text-white transition duration-200"
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  )
}
