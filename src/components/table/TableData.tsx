'use client'
import { Client } from '@/models/Client'
import { useRouter } from 'next/navigation'

interface TableDataProps {
  client?: Client
  children: React.ReactNode
}

export function TableData({ children, client }: TableDataProps) {
  const router = useRouter()
  function handleClientDetail(client: Client | undefined) {
    if (client) {
      router.push(`/client/detail/${client.name}`)
    }
  }
  return (
    <td className="p-2 align-middle" onClick={() => handleClientDetail(client)}>
      {children}
    </td>
  )
}
