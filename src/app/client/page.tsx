import { ActionGroup } from '@/components/table/ActionGroup'
import { TableData } from '@/components/table/TableData'
import { TableHead } from '@/components/table/TableHead'
import { Plus } from 'lucide-react'
import Link from 'next/link'

export default function Client() {
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
            <tr className="hover:bg-light-primary">
              <TableData>Renan França da Costa</TableData>
              <TableData>(21) 99558-3631</TableData>
              <TableData>173.543.267-98</TableData>
              <TableData>16/01/1996</TableData>
              <TableData>
                <ActionGroup />
              </TableData>
            </tr>
            <tr className="hover:bg-light-primary">
              <TableData>Renan França da Costa</TableData>
              <TableData>(21) 99558-3631</TableData>
              <TableData>173.543.267-98</TableData>
              <TableData>16/01/1996</TableData>
              <TableData>
                <ActionGroup />
              </TableData>
            </tr>
            <tr className="hover:bg-light-primary">
              <TableData>Renan França da Costa</TableData>
              <TableData>(21) 99558-3631</TableData>
              <TableData>173.543.267-98</TableData>
              <TableData>16/01/1996</TableData>
              <TableData>
                <ActionGroup />
              </TableData>
            </tr>
            <tr className="hover:bg-light-primary">
              <TableData>Renan França da Costa</TableData>
              <TableData>(21) 99558-3631</TableData>
              <TableData>173.543.267-98</TableData>
              <TableData>16/01/1996</TableData>
              <TableData>
                <ActionGroup />
              </TableData>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
