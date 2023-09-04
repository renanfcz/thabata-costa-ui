import { ActionGroup } from '@/components/table/ActionGroup'
import { TableData } from '@/components/table/TableData'
import { TableHead } from '@/components/table/TableHead'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { GET_CLIENTS } from '@/server/queries'
import { Client } from '@/models/Client'
import { graphqlClient } from '@/server/graphql-client'
import { dateFormatter } from '@/utils/formatter'

interface Response {
  findAllClients: [Client]
}

export const revalidate = 30

export default async function Client() {
  const data = await graphqlClient.request<Response>(GET_CLIENTS)
  const clients = data.findAllClients

  console.log(clients)
  return (
    <div className="flex flex-col h-full mx-10">
      <div className="flex justify-between items-center py-3">
        <h1 className="text-2xl">Clientes</h1>
        <Link
          href="/client/new"
          className="px-3 py-2 text-primary border border-primary rounded hover:bg-primary hover:text-white font-bold transition duration-200"
        >
          <Plus />
        </Link>
      </div>
      <div className=" bg-white py-2 rounded">
        <table className="w-full divide-y divide-base-background">
          <thead>
            <tr>
              <TableHead>Nome</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>CPF</TableHead>
              <TableHead>Data de nascimento</TableHead>
              <TableHead> </TableHead>
            </tr>
          </thead>
          <tbody>
            {clients.map((client, index) => (
              <tr className="hover:bg-light-primary" key={index}>
                <TableData>{client.name}</TableData>
                <TableData>{client.celphone}</TableData>
                <TableData>{client.cpf}</TableData>
                <TableData>
                  {dateFormatter.format(new Date(client.dateBirth))}
                </TableData>
                <TableData>
                  <ActionGroup client={client} />
                </TableData>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
