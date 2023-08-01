'use client'
import TextInput from '@/components/form/TextInput'
import { TableData } from '@/components/table/TableData'
import { TableHead } from '@/components/table/TableHead'
import { Trash2 } from 'lucide-react'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import * as z from 'zod'
import { currencyFormatter } from '@/utils/formatter'
import CurrencyInput from '@/components/form/CurrencyInput'

interface Procedure {
  name: string
  value: number
}

const schema = z.object({
  name: z.string(),
  value: z.coerce.number().min(1),
})

type ProcedureFormData = z.infer<typeof schema>

export default function Procedure() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProcedureFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: undefined,
      value: undefined,
    },
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  })

  const [procedures, setProcedures] = useState<Procedure[]>([])

  function handleSaveProcedure(data: ProcedureFormData) {
    setProcedures([...procedures, data])
  }

  const handleRemoveProcedure = (index: number) => {
    const proceduresCopy = [...procedures]
    proceduresCopy.splice(index, 1)
    setProcedures(proceduresCopy)
  }

  console.log(errors)

  return (
    <div className="h-full mx-10">
      <h1 className="text-2xl py-3">Procedimentos</h1>
      <div className=" bg-white py-2 rounded my-3 flex w-full">
        <div className="w-1/3 px-5 py-3 flex flex-col gap-5 border-r-2 border-gray-300">
          <h2 className="font-bold">Novo procedimento</h2>
          <form
            onSubmit={handleSubmit(handleSaveProcedure)}
            className="flex flex-col gap-5"
          >
            <Controller
              name="name"
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextInput
                  label="Nome"
                  hasError={!!errors.name}
                  value={value}
                  setValue={onChange}
                />
              )}
            />
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
            <button
              type="submit"
              className="px-10 py-3 font-bold border border-info rounded text-info hover:bg-info hover:text-white transition duration-200"
            >
              Salvar
            </button>
          </form>
        </div>
        <div className="w-full px-5 py-3">
          <table className="w-full divide-y divide-base-background">
            <thead>
              <tr>
                <TableHead>Nome</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead> </TableHead>
              </tr>
            </thead>
            <tbody>
              {procedures.map((procedure, index) => (
                <tr key={index}>
                  <TableData>{procedure.name}</TableData>
                  <TableData>
                    {currencyFormatter.format(procedure.value)}
                  </TableData>
                  <TableData>
                    <div className="flex justify-end">
                      <Trash2
                        onClick={() => handleRemoveProcedure(index)}
                        className="text-danger cursor-pointer"
                      />
                    </div>
                  </TableData>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
