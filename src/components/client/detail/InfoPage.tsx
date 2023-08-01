'use client'

import SelectInput from '../../form/hook-form/SelectInput'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import * as z from 'zod'
import TextInput from '@/components/form/hook-form/TextInput'
import DocumentInput from '@/components/form/DocumentInput'
import DateInput from '@/components/form/DateInput'
import CellPhoneInput from '@/components/form/CellPhoneInput'

const schema = z.object({
  name: z.string().min(5),
  cpf: z.string().min(11),
  birthDate: z.string().min(8),
  cel: z.string().min(11),
  state: z.string().min(2),
  city: z.string().min(3),
  street: z.string().min(5),
  number: z.coerce.number().min(1),
  complement: z.string(),
  mediaId: z.string(),
  socialMedia: z.string(),
  howKnowUs: z.string(),
})

type ClientFormData = z.infer<typeof schema>

export default function InfoPage() {
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
      birthDate: undefined,
      cel: undefined,
      state: undefined,
      city: undefined,
      street: undefined,
      number: undefined,
      complement: undefined,
      mediaId: undefined,
      socialMedia: undefined,
      howKnowUs: undefined,
    },
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  })

  const midiaOptions = ['Instagram', 'Facebook']

  const stateOptions = ['RJ', 'SP', 'MG']

  const cityOptions = ['Rio de Janeiro', 'São Paulo', 'Belo Horizonte']

  function handleSaveClient(data: ClientFormData) {
    console.log(data)
  }

  console.log(errors)

  return (
    <div className="px-5 w-1/2">
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
              name="birthDate"
              control={control}
              render={({ field: { value, onChange } }) => (
                <DateInput
                  label="Data de nascimento"
                  hasError={!!errors.birthDate}
                  value={value}
                  setValue={onChange}
                />
              )}
            />
            <Controller
              name="cel"
              control={control}
              render={({ field: { value, onChange } }) => (
                <CellPhoneInput
                  label="Celular"
                  hasError={!!errors.cel}
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
            <SelectInput
              label="Estado"
              options={stateOptions}
              isDirty={!!dirtyFields.state}
              hasError={!!errors.state}
              {...register('state')}
            />
            <SelectInput
              label="Cidade"
              options={cityOptions}
              isDirty={!!dirtyFields.city}
              hasError={!!errors.city}
              {...register('city')}
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
              isDirty={!!dirtyFields.mediaId}
              hasError={!!errors.mediaId}
              {...register('mediaId')}
            />
            <SelectInput
              label="Mídia social"
              options={midiaOptions}
              isDirty={!!dirtyFields.socialMedia}
              hasError={!!errors.socialMedia}
              {...register('socialMedia')}
            />
          </div>
          <SelectInput
            label="Como nos conheceu?"
            options={midiaOptions}
            isDirty={!!dirtyFields.howKnowUs}
            hasError={!!errors.howKnowUs}
            {...register('howKnowUs')}
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
