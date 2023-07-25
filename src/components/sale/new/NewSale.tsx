'use client'
import TextAreaInput from '@/components/form/TextAreaInput'
import { useState } from 'react'

import SaveButton from '../../form/SaveButton'
import SelectInput from '../../form/SelectInput'
import TextInput from '../../form/TextInput'

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
          <h2>Dados do protocolo</h2>
          <div className="flex flex-col gap-5">
            <TextInput
              label="Protocolo"
              value={sale.protocolName}
              setValue={setProtocolName}
            />
            <TextAreaInput
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
          <div className="flex w-full justify-end">
            <button
              onClick={addProcedure}
              className="px-10 py-3 font-bold border border-warn rounded text-warn hover:bg-warn hover:text-white transition duration-200"
            >
              Adicionar procedimento
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
