'use client'
import SelectInput from '@/components/form/hook-form/SelectInput'
import CurrencyInput from '@/components/form/inputs/CurrencyInput'
import NumberInput from '@/components/form/inputs/NumberInput'
import { useNewSaleContext } from '@/contexts/NewSaleContext'
import { useProceduresContext } from '@/contexts/ProcedureContext'
import { CreateSaleItem } from '@/dtos/saleItem/CreateSaleItem'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as z from 'zod'

const schema = z.object({
  name: z.string(),
  sessions: z.string(),
  price: z.string(),
  discount: z.string().default('0'),
})

type ProcedureFormData = z.infer<typeof schema>

interface ProcedureCardProps {
  protocol: {
    protocolName: string
    protocolDesc: string
    saleItems: CreateSaleItem[]
  }
}

export default function ProcedureCard({ protocol }: ProcedureCardProps) {
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
    const saleCopy = { ...sale }
    const findProtocol = saleCopy.protocols?.find(
      (p) => p.protocolName === protocol.protocolName,
    )
    const findProtocolAndProcedure = saleCopy.protocols
      ?.find((p) => p.protocolName === protocol.protocolName)
      ?.saleItems.find((item) => item.procedureId === getProcedureId(data.name))

    if (findProtocolAndProcedure) {
      toast.error(
        'Esse procedimento já consta no protocolo ' +
          findProtocol?.protocolName +
          '.',
        {
          autoClose: 5000,
        },
      )
      return
    }

    if (findProtocol) {
      const protocolCopy = findProtocol
      protocolCopy.saleItems.push({
        procedureId: getProcedureId(data.name),
        value: Number(data.price),
        discount: Number(data.discount),
        sessionsNum: Number(data.sessions),
      })
    } else {
      const newProtocol = { ...protocol }
      newProtocol.saleItems = []
      newProtocol.saleItems.push({
        procedureId: getProcedureId(data.name),
        value: Number(data.price),
        discount: Number(data.discount),
        sessionsNum: Number(data.sessions),
      })
      if (saleCopy.protocols === undefined) {
        saleCopy.protocols = []
      }
      saleCopy.protocols.push(newProtocol)
    }

    updateSale(saleCopy)
    reset()
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
        className="bg-white rounded flex flex-col gap-3"
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
