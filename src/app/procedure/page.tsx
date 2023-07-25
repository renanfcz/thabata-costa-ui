'use client'
import SaveButton from '@/components/form/SaveButton'
import TextInput from '@/components/form/TextInput'
import { TableData } from '@/components/table/TableData'
import { TableHead } from '@/components/table/TableHead'
import { Trash2 } from 'lucide-react'
import { useState } from 'react'

interface Procedure {
  name: string
  value: string
}

export default function Procedure() {
  const [procedure, setProcedure] = useState<Procedure>({
    name: '',
    value: '',
  })
  const [procedures, setProcedures] = useState<Procedure[]>([])

  const setName = (value: string) => {
    const nameCopy = { ...procedure }
    nameCopy.name = value
    setProcedure(nameCopy)
  }

  const setValue = (value: string) => {
    const valueCopy = { ...procedure }
    valueCopy.value = value
    setProcedure(valueCopy)
  }

  const handleSaveProcedure = () => {
    setProcedures([...procedures, procedure])
  }

  const handleRemoveProcedure = (index: number) => {
    const proceduresCopy = [...procedures]
    proceduresCopy.splice(index, 1)
    setProcedures(proceduresCopy)
  }

  return (
    <div className="h-full mx-10">
      <h1 className="text-2xl py-3">Procedimentos</h1>
      <div className=" bg-white py-2 rounded my-3 flex w-full">
        <div className="w-1/3 px-5 py-3 flex flex-col gap-5 border-r-2 border-gray-300">
          <h2 className="font-bold">Novo procedimento</h2>
          <div className="flex flex-col gap-5">
            <TextInput label="Nome" value={procedure.name} setValue={setName} />
            <TextInput
              label="Valor"
              value={procedure.value}
              setValue={setValue}
            />
            <SaveButton onClick={handleSaveProcedure} />
          </div>
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
                  <TableData>{procedure.value}</TableData>
                  <TableData>
                    <div className="flex justify-end">
                      <Trash2
                        onClick={() => handleRemoveProcedure(index)}
                        className="text-danger"
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
