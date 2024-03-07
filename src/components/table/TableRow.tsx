'use client'
import { Client } from '@/models/Client'
import { useRouter } from 'next/navigation'

interface TableRowProps {
  client: Client
  children: React.ReactNode
}

export default function TableRow({ client, children }: TableRowProps) {
  const router = useRouter()
  function handleClientDetail(client: Client) {
    router.push(`/client/detail/${client.name}`)
  }
  return (
    <tr
      className="hover:bg-light-primary cursor-pointer"
      onClick={() => handleClientDetail(client)}
    >
      {children}
    </tr>
  )
}
