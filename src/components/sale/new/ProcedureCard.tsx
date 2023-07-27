'use client'
import SelectInput from '@/components/form/SelectInput'
import TextInput from '@/components/form/TextInput'
import { useNewSaleContext } from '@/contexts/NewSaleContext'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const procedureSchema = z
  .object({
    name: z.string().min(3),
    sessions: z.number().positive().min(0),
    value: z.coerce.number().positive(),
    discount: z.coerce.number().positive(),
  })
  .refine((fields) => fields.name.length, {
    path: ['name'],
    message: 'Escolha um procedimento',
  })

export type ProcedureFormData = z.infer<typeof procedureSchema>

export default function ProcedureCard() {
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm<ProcedureFormData>({
    resolver: zodResolver(procedureSchema),
    reValidateMode: 'onChange',
    mode: 'onSubmit',
    defaultValues: {
      name: undefined,
      sessions: undefined,
      value: undefined,
      discount: undefined,
    },
  })

  const { sale, updateSale } = useNewSaleContext()

  function addProcedure(data: ProcedureFormData) {
    const saleCopy = { ...sale }
    saleCopy.procedures.push(data)
    updateSale(saleCopy)
  }
  const procedureList = ['Drenagem', 'Limpeza de pele', 'Sobrancelha']

  return (
    <form
      onSubmit={handleSubmit(addProcedure)}
      className="bg-white rounded p-5 flex flex-col gap-3"
    >
      <h2>Procedimento</h2>
      <div className="flex flex-col gap-5">
        <div className="flex gap-3">
          <SelectInput
            label="Procedimento"
            options={procedureList}
            hasError={!!errors.name}
            isDirty={!!dirtyFields.name}
            {...register('name')}
          />
          <TextInput
            label="Nº de sessões"
            isDirdy={!!dirtyFields.sessions}
            hasError={!!errors.sessions}
            {...register('sessions', {
              valueAsNumber: true,
            })}
          />
        </div>
        <div className="flex gap-3">
          <TextInput
            label="Valor"
            isDirdy={!!dirtyFields.value}
            hasError={!!errors.value}
            {...register('value', { valueAsNumber: true })}
          />
          <TextInput
            label="Desconto (%)"
            isDirdy={!!dirtyFields.discount}
            hasError={!!errors.discount}
            {...register('discount', {
              valueAsNumber: true,
            })}
          />
        </div>
      </div>
      <div className="flex w-full justify-end">
        <button
          type="submit"
          className="px-10 py-3 font-bold border border-primary rounded text-primary hover:bg-primary hover:text-white transition duration-200"
        >
          Adicionar procedimento
        </button>
      </div>
    </form>
  )
}
