'use client'

import { useState } from 'react'
import SaveButton from '../../form/SaveButton'
import SelectInput from '../../form/SelectInput'
import TextInput from '../../form/TextInput'

export default function InfoPage() {
  const [client, setClient] = useState({
    name: 'Renan',
    cpf: '17354326798',
    birthDate: '16/01/1996',
    tel: '21995583631',
    state: 'RJ',
    city: 'Rio de Janeiro',
    street: 'Rua Leocádio Figueiredo',
    number: '360',
    complement: 'bl 13 apt 201',
    midiaId: 'renanfcz',
    socialMidia: 'Instagram',
    howKnowUs: 'Instagram',
  })

  const setName = (value: string) => {
    const clientCopy = { ...client }
    clientCopy.name = value
    setClient(clientCopy)
  }

  const setCpf = (value: string) => {
    const clientCopy = { ...client }
    clientCopy.cpf = value
    setClient(clientCopy)
  }

  const setBirthDate = (value: string) => {
    const clientCopy = { ...client }
    clientCopy.birthDate = value
    setClient(clientCopy)
  }

  const setTel = (value: string) => {
    const clientCopy = { ...client }
    clientCopy.tel = value
    setClient(clientCopy)
  }

  const setStreet = (value: string) => {
    const clientCopy = { ...client }
    clientCopy.street = value
    setClient(clientCopy)
  }

  const setNumber = (value: string) => {
    const clientCopy = { ...client }
    clientCopy.number = value
    setClient(clientCopy)
  }

  const setComplement = (value: string) => {
    const clientCopy = { ...client }
    clientCopy.complement = value
    setClient(clientCopy)
  }

  const setMidiaId = (value: string) => {
    const clientCopy = { ...client }
    clientCopy.midiaId = value
    setClient(clientCopy)
  }

  const setSocialMidia = (value: string) => {
    const clientCopy = { ...client }
    clientCopy.socialMidia = value
    setClient(clientCopy)
  }

  const setState = (value: string) => {
    const clientCopy = { ...client }
    clientCopy.state = value
    setClient(clientCopy)
  }

  const setCity = (value: string) => {
    const clientCopy = { ...client }
    clientCopy.city = value
    setClient(clientCopy)
  }

  const setHowKnowUs = (value: string) => {
    const clientCopy = { ...client }
    clientCopy.howKnowUs = value
    setClient(clientCopy)
  }

  const midiaOptions = ['Instagram', 'Facebook']

  const stateOptions = ['RJ', 'SP', 'MG']

  const cityOptions = ['Rio de Janeiro', 'São Paulo', 'Belo Horizonte']

  return (
    <div className="px-5 w-1/2">
      <form className="flex flex-col gap-5">
        <div className="flex flex-col gap-5">
          <span className="text-sm">Dados pessoais</span>
          <div className="flex gap-2">
            <TextInput label="Nome" value={client.name} setValue={setName} />
            <TextInput label="CPF" value={client.cpf} setValue={setCpf} />
          </div>
          <div className="flex gap-2">
            <TextInput
              label="Data de nascimento"
              value={client.birthDate}
              setValue={setBirthDate}
            />
            <TextInput label="Telefone" value={client.tel} setValue={setTel} />
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <span className="text-sm">Endereço</span>
          <div className="flex basis-1/4 gap-2">
            <SelectInput
              label="Estado"
              value={client.state}
              setValue={setState}
              options={stateOptions}
            />
            <SelectInput
              label="Cidade"
              value={client.city}
              setValue={setCity}
              options={cityOptions}
            />
          </div>
          <div className="">
            <TextInput
              label="Logradouro"
              value={client.street}
              setValue={setStreet}
            />
          </div>
          <div className="flex gap-2">
            <TextInput
              label="Numero"
              value={client.number}
              setValue={setNumber}
            />
            <TextInput
              label="Complemento"
              value={client.complement}
              setValue={setComplement}
            />
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <span className="text-sm">Mídia Social</span>
          <div className="flex gap-2">
            <TextInput label="@" value={client.midiaId} setValue={setMidiaId} />
            <SelectInput
              label="Mídia social"
              value={client.socialMidia}
              setValue={setSocialMidia}
              options={midiaOptions}
            />
          </div>
          <SelectInput
            label="Como nos conheceu?"
            value={client.howKnowUs}
            setValue={setHowKnowUs}
            options={midiaOptions}
          />
        </div>
        <div>
          <SaveButton />
        </div>
      </form>
    </div>
  )
}
