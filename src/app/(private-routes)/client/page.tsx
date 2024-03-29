import { ActionGroup } from '@/components/table/ActionGroup'
import { TableData } from '@/components/table/TableData'
import { TableHead } from '@/components/table/TableHead'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { Client } from '@/models/Client'
import { graphqlClient } from '@/server/graphql-client'
import { dateFormatter } from '@/utils/formatter'
import BackArrow from '@/components/form/buttons/BackArrow'
import { ResponseClients } from '@/server/queries/responses/ClientResponses'
import { GET_CLIENTS } from '@/server/queries/requests/client/ClientQueries'
import TableRow from '@/components/table/TableRow'

export const revalidate = 30

export default async function Client() {
  const data = await graphqlClient.request<ResponseClients>(GET_CLIENTS)
  const clients = data.findAllClients

  return (
    <div className="flex flex-col h-full mx-10">
      <div className="flex justify-between items-center py-3">
        <BackArrow />
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
              <TableRow key={index}>
                <TableData client={client}>{client.name}</TableData>
                <TableData client={client}>{client.celphone}</TableData>
                <TableData client={client}>{client.cpf}</TableData>
                <TableData client={client}>
                  {dateFormatter.format(new Date(client.dateBirth))}
                </TableData>
                <TableData>
                  <ActionGroup client={client} />
                </TableData>
              </TableRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
