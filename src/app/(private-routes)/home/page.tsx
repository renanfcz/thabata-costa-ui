import Link from 'next/link'
import {
  CalendarCheck,
  ClipboardCheck,
  Home as House,
  ShoppingBag,
  Users,
} from 'lucide-react'
import LogOutButton from '@/components/form/buttons/LogOutButton'

export default function Home() {
  return (
    <div className="h-full w-full flex items-center">
      <div className="w-full grid grid-cols-2 gap-4">
        <Link
          href="/dashboard"
          className="flex flex-col items-center gap-2 px-5 text-gray-600 transition duration-200 hover:text-white hover:bg-dark-primary p-3"
        >
          <House size={50} /> <strong className="text-2xl">Dashboard</strong>
        </Link>
        <Link
          href="/client"
          className="flex flex-col items-center gap-2 px-5 text-gray-600 transition duration-200 hover:text-white hover:bg-dark-primary p-3"
        >
          <Users size={50} /> <strong className="text-2xl">Clientes</strong>
        </Link>
        <Link
          href="/procedure"
          className="flex flex-col items-center gap-2 px-5 text-gray-600 transition duration-200 hover:text-white hover:bg-dark-primary p-3"
        >
          <ClipboardCheck size={50} />{' '}
          <strong className="text-2xl">Procedimentos</strong>
        </Link>
        <Link
          href="/schedule"
          className="flex flex-col items-center gap-2 px-5 text-gray-600 transition duration-200 hover:text-white hover:bg-dark-primary p-3"
        >
          <CalendarCheck size={50} />{' '}
          <strong className="text-2xl">Agenda</strong>
        </Link>
        <Link
          href="/sale"
          className="flex flex-col items-center gap-2 px-5 text-gray-600 transition duration-200 hover:text-white hover:bg-dark-primary p-3"
        >
          <ShoppingBag size={50} /> <strong className="text-2xl">Vendas</strong>
        </Link>
      </div>
      <div className="fixed top-0 right-0 m-4">
        <LogOutButton />
      </div>
    </div>
  )
}
