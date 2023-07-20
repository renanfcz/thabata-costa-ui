import { ActionGroup } from '@/components/table/ActionGroup'
import { TableData } from '@/components/table/TableData'
import { TableHead } from '@/components/table/TableHead'

export default function Client() {
  return (
    <div className="flex flex-col h-full mx-10">
      <h1 className="text-2xl py-3">Clientes</h1>
      <div className=" bg-white py-2 rounded my-3">
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
            <tr className="hover:bg-primary">
              <TableData>Renan França da Costa</TableData>
              <TableData>(21) 99558-3631</TableData>
              <TableData>173.543.267-98</TableData>
              <TableData>16/01/1996</TableData>
              <TableData>
                <ActionGroup />
              </TableData>
            </tr>
            <tr className="hover:bg-primary">
              <TableData>Renan França da Costa</TableData>
              <TableData>(21) 99558-3631</TableData>
              <TableData>173.543.267-98</TableData>
              <TableData>16/01/1996</TableData>
              <TableData>
                <ActionGroup />
              </TableData>
            </tr>
            <tr className="hover:bg-primary">
              <TableData>Renan França da Costa</TableData>
              <TableData>(21) 99558-3631</TableData>
              <TableData>173.543.267-98</TableData>
              <TableData>16/01/1996</TableData>
              <TableData>
                <ActionGroup />
              </TableData>
            </tr>
            <tr className="hover:bg-primary">
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
