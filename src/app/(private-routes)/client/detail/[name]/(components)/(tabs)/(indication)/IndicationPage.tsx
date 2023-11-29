'use client'
import TextInput from '@/components/form/hook-form/TextInput'
import CellPhoneInput from '@/components/form/inputs/CellPhoneInput'
import { useClientContext } from '@/contexts/client/ClientContext'
import { Indication } from '@/models/Indication'
import { graphqlClient } from '@/server/graphql-client'
import { ResponseCreateIndication } from '@/server/mutations/responses/IndicationResponses'
import { zodResolver } from '@hookform/resolvers/zod'
import { X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as z from 'zod'

import SelectInput from '@/components/form/hook-form/SelectInput'
import { TableHead } from '@/components/table/TableHead'
import {
  CREATE_INDICATION,
  REMOVE_INDICATION,
} from '@/server/mutations/requests/indication/IndicationMutations'
import { SocialMediaEnum } from '@/enum/SocialMediaEnum'

const schema = z.object({
  name: z.string().min(5),
  celphone: z.string().min(11),
  socialMediaId: z.string().optional(),
  socialMedia: z.string().optional(),
})

type IndicationFormData = z.infer<typeof schema>

export default function IndicationPage() {
  const { client } = useClientContext()
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, dirtyFields },
  } = useForm<IndicationFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: undefined,
      celphone: undefined,
      socialMediaId: undefined,
      socialMedia: undefined,
    },
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  })

  const [indicationList, setIndicationList] = useState<Indication[]>(
    client?.indications || [],
  )

  const options = Object.values(SocialMediaEnum)

  async function addIndication(input: IndicationFormData) {
    const loading = toast.loading('Salvando...')
    try {
      const data = await graphqlClient.request<ResponseCreateIndication>(
        CREATE_INDICATION,
        {
          createIndicationInput: {
            name: input.name,
            celphone: input.celphone,
            socialMediaId: input.socialMediaId,
            socialMedia: input.socialMedia,
            clientId: client?.id,
          },
        },
      )
      toast.update(loading, {
        render: 'Indicação salva com sucesso!',
        type: 'success',
        isLoading: false,
        autoClose: 5000,
      })
      setIndicationList([...indicationList, data.createIndication])
      reset()
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

  const handleRemoveIndication = async (id: string) => {
    try {
      await graphqlClient.request(REMOVE_INDICATION, {
        id,
      })
      const listWithoutIndication = indicationList.filter(
        (indication) => indication.id !== id,
      )
      setIndicationList(listWithoutIndication)
    } catch (error: any) {
      toast.error(error.response.errors[0].message)
    }
  }

  useEffect(() => {
    setIndicationList(client?.indications || [])
  }, [client])

  return (
    <div className="px-5 lg:w-1/2">
      <div className="py-5">
        <table className="w-full divide-y divide-base-background">
          <thead>
            <tr>
              <TableHead>Nome</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>@</TableHead>
              <TableHead>Rede social</TableHead>
              <TableHead> </TableHead>
            </tr>
          </thead>
          <tbody>
            {indicationList.map((indication) => (
              <tr key={indication.id}>
                <td>{indication.name}</td>
                <td>{indication.celphone}</td>
                <td>{indication.socialMediaId}</td>
                <td>{indication.socialMedia}</td>
                <td>
                  <X
                    className="text-danger cursor-pointer"
                    onClick={() => handleRemoveIndication(indication.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-gray-100 w-full rounded h-1 my-2"></div>

      <form
        onSubmit={handleSubmit(addIndication)}
        className="flex flex-col w-full gap-5 py-5"
      >
        <div className="flex gap-2">
          <TextInput
            label="Nome"
            isDirty={!!dirtyFields.name}
            hasError={!!errors.name}
            {...register('name')}
          />
          <Controller
            name="celphone"
            control={control}
            defaultValue=""
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
            render={({ field: { onChange } }) => (
              <SelectInput
                label="Mídia social"
                options={options}
                isDirty={!!dirtyFields.socialMedia}
                hasError={!!errors.socialMedia}
                onChangeValue={onChange}
                setValue={() => null}
              />
            )}
          />
        </div>
        <button
          type="submit"
          className="px-8 py-4 w-1/2 text-primary bg-white border border-primary rounded hover:bg-primary hover:text-white font-bold transition duration-200"
        >
          Nova indicação
        </button>
      </form>
    </div>
  )
}
