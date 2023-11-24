'use client'
import TextInput from '@/components/form/inputs/TextInput'
import { TableData } from '@/components/table/TableData'
import { TableHead } from '@/components/table/TableHead'
import { Trash2 } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import * as z from 'zod'
import { currencyFormatter } from '@/utils/formatter'
import CurrencyInput from '@/components/form/inputs/CurrencyInput'
import { graphqlClient } from '@/server/graphql-client'
import { Procedure } from '@/models/Procedure'
import { toast } from 'react-toastify'
import { useProceduresContext } from '@/contexts/ProcedureContext'
import BackArrow from '@/components/form/buttons/BackArrow'
import {
  ResponseCreateProcedures,
  ResponseRemoveProcedure,
} from '@/server/mutations/responses/ProcedureResponses'
import { CirclePicker, ColorResult } from 'react-color'
import {
  CREATE_PROCEDURE,
  REMOVE_PROCEDURE,
} from '@/server/mutations/requests/procedure/ProcedureMutations'

const schema = z.object({
  name: z.string(),
  price: z.coerce.number().min(1),
  color: z.string(),
})

type ProcedureFormData = z.infer<typeof schema>

export default function Procedure() {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProcedureFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: undefined,
      price: undefined,
      color: '',
    },
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  })

  const { procedures, updateProcedures } = useProceduresContext()

  async function handleSaveProcedure(data: ProcedureFormData) {
    const loading = toast.loading('Salvando...')
    try {
      const response = await graphqlClient.request<ResponseCreateProcedures>(
        CREATE_PROCEDURE,
        {
          createProcedureInput: {
            name: data.name,
            price: data.price,
            color: data.color,
          },
        },
      )
      toast.update(loading, {
        render: 'Procedimento criado com sucesso!',
        type: 'success',
        isLoading: false,
        autoClose: 5000,
      })
      updateProcedures([...procedures, response.createProcedure])
    } catch (error: any) {
      toast.update(loading, {
        render: error.response.errors[0].message,
        type: 'error',
        isLoading: false,
        autoClose: 5000,
      })
    }
  }

  const handleRemoveProcedure = async (index: number, procedure: Procedure) => {
    const loading = toast.loading('Removendo...')
    try {
      await graphqlClient.request<ResponseRemoveProcedure>(REMOVE_PROCEDURE, {
        removeProcedureId: procedure.id,
      })
      toast.update(loading, {
        render: 'Procedimento removido com sucesso!',
        type: 'success',
        isLoading: false,
        autoClose: 5000,
      })
      const proceduresCopy = [...procedures]
      proceduresCopy.splice(index, 1)
      updateProcedures(proceduresCopy)
    } catch (error: any) {
      toast.update(loading, {
        render: error.response.errors[0].message,
        type: 'error',
        isLoading: false,
        autoClose: 5000,
      })
    }
  }

  const handleOnChangeColor = (color: ColorResult) => {
    setValue('color', color.hex)
  }

  return (
    <div className="h-full mx-10">
      <div className="flex justify-between items-center py-3">
        <BackArrow />
        <h1 className="text-2xl py-3">Procedimentos</h1>
        <div></div>
      </div>
      <div className=" bg-white py-2 rounded my-3 flex w-full">
        <div className="lg:w-1/3 md:w-1/2 px-5 py-3 flex flex-col gap-5 border-r-2 border-gray-300">
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
              name="price"
              control={control}
              render={({ field: { value, onChange } }) => (
                <CurrencyInput
                  label="Valor"
                  hasError={!!errors.price}
                  value={value}
                  setValue={onChange}
                />
              )}
            />
            <div className="flex justify-center">
              <Controller
                name="color"
                control={control}
                render={({ field: { value } }) => (
                  <CirclePicker color={value} onChange={handleOnChangeColor} />
                )}
              />
            </div>
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
                <TableHead>Cor</TableHead>
                <TableHead> </TableHead>
              </tr>
            </thead>
            <tbody>
              {procedures.map((procedure, index) => (
                <tr key={index} className="hover:bg-light-primary">
                  <TableData>{procedure.name}</TableData>
                  <TableData>
                    {currencyFormatter.format(procedure.price)}
                  </TableData>
                  <TableData>
                    <div
                      className={`rounded-full w-6 h-6`}
                      style={{ backgroundColor: procedure.color }}
                    ></div>
                  </TableData>
                  <TableData>
                    <div className="flex justify-end">
                      <Trash2
                        onClick={() => handleRemoveProcedure(index, procedure)}
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
