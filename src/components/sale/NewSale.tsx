'use client'
import { Trash2, X } from 'lucide-react'
import { useState } from 'react'
import SaveButton from '../form/SaveButton'
import SelectInput from '../form/SelectInput'
import TextInput from '../form/TextInput'
import { TableData } from '../table/TableData'
import { TableHead } from '../table/TableHead'

interface Procedure {
  name: string
  value: string
  discount: string
  sessions: string
}

interface NewSale {
  protocolName: string
  protocolDesc: string
  procedures: Procedure[]
}

export default function NewSale() {
  const [sale, setSale] = useState<NewSale>({
    protocolName: '',
    protocolDesc: '',
    procedures: [],
  })
  const [procedure, setProcedure] = useState<Procedure>({
    name: '',
    value: '',
    discount: '',
    sessions: '',
  })

  const setProtocolName = (value: string) => {
    const saleCopy = { ...sale }
    saleCopy.protocolName = value
    setSale(saleCopy)
  }

  const setProtocolDesc = (value: string) => {
    const saleCopy = { ...sale }
    saleCopy.protocolDesc = value
    setSale(saleCopy)
  }

  const setProcedureName = (value: string) => {
    const procedureCopy = { ...procedure }
    procedureCopy.name = value
    setProcedure(procedureCopy)
  }

  const setProcedureValue = (value: string) => {
    const procedureCopy = { ...procedure }
    procedureCopy.value = value
    setProcedure(procedureCopy)
  }

  const setProcedureDiscount = (value: string) => {
    const procedureCopy = { ...procedure }
    procedureCopy.discount = value
    setProcedure(procedureCopy)
  }

  const setProcedureSessions = (value: string) => {
    const procedureCopy = { ...procedure }
    procedureCopy.sessions = value
    setProcedure(procedureCopy)
  }

  const handleSaveSale = () => {}

  const addProcedure = () => {
    const saleCopy = { ...sale }
    saleCopy.procedures.push(procedure)
    setSale(saleCopy)
  }

  const removeProcedure = (index: number) => {
    const saleCopy = { ...sale }
    saleCopy.procedures.splice(index, 1)
    setSale(saleCopy)
  }

  const procedureList = ['Drenagem', 'Limpeza de pele', 'Sobrancelha']

  const getSubtotal = (value: string, discount: string) => {
    const valueNum = parseFloat(value)
    const discountNum = parseFloat(discount)
    return valueNum - (valueNum * discountNum) / 100
  }

  const calculateDiscount = (value: string, discount: string) => {
    const valueNum = parseFloat(value)
    const discountNum = parseFloat(discount)
    return (valueNum * discountNum) / 100
  }

  const getDiscount = () => {
    const valueWithDiscount = sale.procedures.map((item) =>
      calculateDiscount(item.value, item.discount),
    )
    return valueWithDiscount.reduce((acc, cur) => acc + cur, 0)
  }

  const getTotalValue = () => {
    const valueWithDiscount = sale.procedures.map((item) =>
      getSubtotal(item.value, item.discount),
    )
    return valueWithDiscount.reduce((acc, cur) => acc + cur, 0)
  }

  return (
    <div>
      <div className="flex">
        <div className="flex flex-col w-full px-5 py-3 gap-5">
          <div className="flex flex-col gap-5">
            <TextInput
              label="Protocolo"
              value={sale.protocolName}
              setValue={setProtocolName}
            />
            <TextInput
              label="Descrição do protocolo"
              value={sale.protocolDesc}
              setValue={setProtocolDesc}
            />
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex gap-3">
              <SelectInput
                label="Procedimento"
                value={procedure.name}
                setValue={setProcedureName}
                options={procedureList}
              />
              <TextInput
                label="Nº de sessões"
                value={procedure.sessions}
                setValue={setProcedureSessions}
              />
            </div>
            <div className="flex gap-3">
              <TextInput
                label="Valor do procedimento"
                value={procedure.value}
                setValue={setProcedureValue}
              />
              <TextInput
                label="Desconto do procedimento (%)"
                value={procedure.discount}
                setValue={setProcedureDiscount}
              />
            </div>
          </div>
          <div className="flex w-full justify-between">
            <SaveButton onClick={handleSaveSale} />
            <button
              onClick={addProcedure}
              className="px-10 py-3 font-bold border border-warn rounded text-warn hover:bg-warn hover:text-white transition duration-200"
            >
              Adicionar procedimento
            </button>
          </div>
        </div>
        <div className="w-full px-5 py-3 border-2 border-gray-400 rounded-md">
          <h2 className="flex justify-center font-bold -mt-6 items-center bg-white text-sm w-12">
            Resumo
          </h2>
          <div className="flex flex-col py-3">
            <div className="flex justify-between">
              <div className="flex flex-col gap-2">
                <div>
                  <span className="font-bold">Protocolo: </span>
                  <span>{sale.protocolName}</span>
                </div>
                <div>
                  <span className="font-bold">Descrição: </span>
                  <span>{sale.protocolDesc}</span>
                </div>
                <div>
                  <span className="font-bold">Procedimentos</span>
                </div>
              </div>
              <div className="min-w-fit gap-2">
                <div className="flex justify-between gap-2">
                  <span className="font-bold">Valor total: </span>
                  <span className="font-bold">R$ {getTotalValue()}</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="">Total de desconto: </span>
                  <span className="font-bold">R$ {getDiscount()}</span>
                </div>
              </div>
            </div>
            <table>
              <thead>
                <tr>
                  <TableHead> </TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Nº de sessões</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Desconto(%)</TableHead>
                  <TableHead>Sub-total</TableHead>
                  <TableHead> </TableHead>
                </tr>
              </thead>
              <tbody>
                {sale.procedures.map((proc, index) => (
                  <tr key={index}>
                    <TableData>{index + 1}</TableData>
                    <TableData>{proc.name}</TableData>
                    <TableData>{proc.sessions}</TableData>
                    <TableData>{proc.value}</TableData>
                    <TableData>{proc.discount}</TableData>
                    <TableData>
                      {getSubtotal(proc.value, proc.discount)}
                    </TableData>
                    <TableData>
                      <div className="flex justify-end">
                        <button onClick={() => removeProcedure(index)}>
                          <X className="text-danger" />
                        </button>
                      </div>
                    </TableData>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
