'use client'
import SelectInput from '@/components/form/hook-form/SelectInput'
import CurrencyInput from '@/components/form/inputs/CurrencyInput'
import NumberInput from '@/components/form/inputs/NumberInput'
import { useNewSaleContext } from '@/contexts/NewSaleContext'
import { useProceduresContext } from '@/contexts/ProcedureContext'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import * as z from 'zod'

const schema = z.object({
  name: z.string(),
  sessions: z.string(),
  price: z.string(),
  discount: z.string().default('0'),
})

type ProcedureFormData = z.infer<typeof schema>

export default function ProcedureCard() {
  const { sale, updateSale } = useNewSaleContext()
  const { procedures } = useProceduresContext()

  const {
    handleSubmit,
    watch,
    control,
    setValue,
    reset,
    formState: { errors, dirtyFields },
  } = useForm<ProcedureFormData>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      name: '',
      price: undefined,
      sessions: undefined,
      discount: undefined,
    },
  })

  const watchName = watch('name')
  const watchSessions = watch('sessions')
  const watchValue = watch('price')

  const isDisable = !watchName || !watchSessions || !watchValue

  function getProcedureId(procedureName: string) {
    const procedure = procedures.find((p) => p.name === procedureName)

    return procedure ? procedure.id : ''
  }

  function addProcedure(data: ProcedureFormData) {
    if (procedures !== undefined) {
      const saleCopy = { ...sale }
      saleCopy.procedures.push({
        procedureId: getProcedureId(data.name),
        value: Number(data.price),
        discount: Number(data.discount),
        sessionsNum: Number(data.sessions),
      })
      updateSale(saleCopy)
      reset()
    }
  }

  function getAllProceduresNames() {
    if (procedures === undefined) {
      return ['']
    }

    return procedures.map((p) => p.name)
  }

  const setDefaultPrice = (selectedProcedure: string) => {
    if (procedures !== undefined) {
      const originalProcedure = procedures.filter(
        (p) => p.name === selectedProcedure,
      )[0]

      if (originalProcedure !== undefined) {
        setValue('price', originalProcedure.price.toString())
      }
    }
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit(addProcedure)}
        className="bg-white rounded p-5 flex flex-col gap-3"
      >
        <h2>Procedimento</h2>
        <div className="flex flex-col gap-5">
          <div className="flex gap-3">
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <SelectInput
                  label="Procedimento"
                  options={getAllProceduresNames()}
                  isDirty={!!dirtyFields.name}
                  hasError={!!errors.name}
                  onChangeValue={setDefaultPrice}
                  setValue={(selectedProcedure: string) =>
                    setValue('name', selectedProcedure)
                  }
                  {...field}
                />
              )}
            />

            <Controller
              name="sessions"
              control={control}
              render={({ field: { value, onChange } }) => (
                <NumberInput
                  label="Nº de sessões"
                  hasError={!!errors.sessions}
                  value={Number(value)}
                  setValue={onChange}
                />
              )}
            />
          </div>
          <div className="flex gap-3">
            <Controller
              name="price"
              control={control}
              render={({ field: { value, onChange } }) => (
                <CurrencyInput
                  label="Valor"
                  hasError={!!errors.price}
                  value={Number(value)}
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
                  value={Number(value)}
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
    </div>
  )
}
