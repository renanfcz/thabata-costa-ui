'use client'

import { X } from 'lucide-react'
import { useState } from 'react'
import SelectInput from '../form/SelectInput'
import TextInput from '../form/TextInput'
import { TableHead } from '../table/TableHead'

type Indication = {
  name: string
  tel: string
  midiaId: string
  socialMedia: string
}

export default function IndicationPage() {
  const [indicationList, setIndicationList] = useState<Indication[]>([])

  const [indication, setIndication] = useState<Indication>({
    name: '',
    tel: '',
    midiaId: '',
    socialMedia: '',
  })

  const setName = (value: string) => {
    const indicationCopy = { ...indication }
    indicationCopy.name = value
    setIndication(indicationCopy)
  }

  const setTel = (value: string) => {
    const indicationCopy = { ...indication }
    indicationCopy.tel = value
    setIndication(indicationCopy)
  }

  const setMidiaId = (value: string) => {
    const indicationCopy = { ...indication }
    indicationCopy.midiaId = value
    setIndication(indicationCopy)
  }

  const setSocialMedia = (value: string) => {
    const indicationCopy = { ...indication }
    indicationCopy.socialMedia = value
    setIndication(indicationCopy)
  }

  const options = ['Instagram', 'Facebook']

  const addIndication = () => {
    setIndicationList([...indicationList, indication])
  }

  const handleRemoveIndication = (index: number) => {
    const indicationsCopy = [...indicationList]
    indicationsCopy.splice(index, 1)
    setIndicationList(indicationsCopy)
  }

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
                <td>{indication.tel}</td>
                <td>{indication.midiaId}</td>
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

      <button
        onClick={addIndication}
        className="px-8 py-4 text-secondary bg-white border border-secondary text-secondary text-secondary rounded hover:bg-secondary text-secondary text-secondary hover:text-white font-bold transition duration-200"
      >
        Nova indicação
      </button>

      <div className="flex flex-col w-full gap-5 py-5">
        <div className="flex gap-2">
          <TextInput label="Nome" value={indication.name} setValue={setName} />
          <TextInput
            label="Telefone"
            value={indication.tel}
            setValue={setTel}
          />
        </div>
        <div className="flex gap-2">
          <TextInput
            label="@"
            value={indication.midiaId}
            setValue={setMidiaId}
          />
          <SelectInput
            label="Mídia social"
            value={indication.socialMedia}
            setValue={setSocialMedia}
            options={options}
          />
        </div>
      </div>
    </div>
  )
}
