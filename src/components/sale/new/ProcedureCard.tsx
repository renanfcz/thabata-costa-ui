'use client'
import SelectInput from '@/components/form/SelectInput'
import TextFormInput from '@/components/form/TextInputForm'
import TextInput from '@/components/form/TextInput'
import { useNewSaleContext } from '@/contexts/NewSaleContext'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import * as z from 'zod'
import CurrencyInput from '@/components/form/CurrencyInput'
import NumberInput from '@/components/form/NumberInput'

const schema = z.object({
  name: z.string(),
  sessions: z.coerce.number(),
  value: z.coerce.number(),
  discount: z.coerce.number(),
})

type ProcedureFormData = z.infer<typeof schema>

export default function ProcedureCard() {
  const { sale, updateSale } = useNewSaleContext()

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors, dirtyFields },
  } = useForm<ProcedureFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: undefined,
      sessions: undefined,
      value: undefined,
      discount: undefined,
    },
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  })

  const watchName = watch('name')
  const watchSessions = watch('sessions')
  const watchValue = watch('value')

  const isDisable = !watchName || !watchSessions || !watchValue

  const cleanInputs = () => {
    setValue('name', '')
    setValue('sessions', 0)
    setValue('value', 0)
    setValue('discount', 0)
  }

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
            isDirty={!!dirtyFields.name}
            hasError={!!errors.name}
            {...register('name')}
          />
          <Controller
            name="sessions"
            control={control}
            render={({ field: { value, onChange } }) => (
              <NumberInput
                label="Nº de sessões"
                hasError={!!errors.discount}
                value={value}
                setValue={onChange}
              />
            )}
          />
        </div>
        <div className="flex gap-3">
          <Controller
            name="value"
            control={control}
            render={({ field: { value, onChange } }) => (
              <CurrencyInput
                label="Valor"
                hasError={!!errors.value}
                value={value}
                setValue={onChange}
              />
            )}
          />

          <Controller
            name="discount"
            control={control}
            render={({ field: { value, onChange } }) => (
              <NumberInput
                label="Desconto (%)"
                hasError={!!errors.discount}
                value={value}
                setValue={onChange}
              />
            )}
          />
        </div>
      </div>
      <div className="flex w-full justify-end">
        <button
          type="submit"
          className={`px-10 py-3 font-bold border border-primary rounded text-primary  transition duration-200 ${
            isDisable
              ? 'cursor-not-allowed bg-gray-200'
              : 'hover:bg-primary hover:text-white'
          }`}
          disabled={isDisable}
        >
          Adicionar procedimento
        </button>
      </div>
    </form>
  )
}
