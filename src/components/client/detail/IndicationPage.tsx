'use client'

import { X } from 'lucide-react'
import { useState } from 'react'
import SelectInput from '../../form/hook-form/SelectInput'
import { TableHead } from '../../table/TableHead'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import * as z from 'zod'
import TextInput from '@/components/form/hook-form/TextInput'
import CellPhoneInput from '@/components/form/inputs/CellPhoneInput'

const schema = z.object({
  name: z.string().min(5),
  cel: z.string().min(11),
  mediaId: z.string(),
  socialMedia: z.string(),
})

type IndicationFormData = z.infer<typeof schema>

export default function IndicationPage() {
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
      cel: undefined,
      mediaId: undefined,
      socialMedia: undefined,
    },
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  })

  const [indicationList, setIndicationList] = useState<IndicationFormData[]>([])

  const options = ['Instagram', 'Facebook']

  function addIndication(data: IndicationFormData) {
    setIndicationList([...indicationList, data])
    reset()
  }

  const handleRemoveIndication = (index: number) => {
    const indicationsCopy = [...indicationList]
    indicationsCopy.splice(index, 1)
    setIndicationList(indicationsCopy)
  }

  console.log(errors)

  return (
    <div className="px-5 w-1/2">
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
            {indicationList.map((indication, index) => (
              <tr key={index}>
                <td>{indication.name}</td>
                <td>{indication.cel}</td>
                <td>{indication.mediaId}</td>
                <td>{indication.socialMedia}</td>
                <td>
                  <X
                    className="text-danger cursor-pointer"
                    onClick={() => handleRemoveIndication(index)}
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
            name="cel"
            control={control}
            defaultValue=""
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
        <div className="flex gap-2">
          <TextInput
            label="@"
            isDirty={!!dirtyFields.mediaId}
            hasError={!!errors.mediaId}
            {...register('mediaId')}
          />
          <SelectInput
            label="Mídia social"
            options={options}
            isDirty={!!dirtyFields.socialMedia}
            hasError={!!errors.socialMedia}
            {...register('socialMedia')}
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
