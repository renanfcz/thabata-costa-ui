import Link from 'next/link'
import './globals.css'
import 'react-toastify/dist/ReactToastify.css'
import { Roboto } from 'next/font/google'
import {
  CalendarCheck,
  ClipboardCheck,
  Home,
  ShoppingBag,
  Users,
} from 'lucide-react'
import { ToastContainer } from 'react-toastify'
import { ProceduresProvider } from '@/contexts/ProcedureContext'

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={roboto.className}>
      <body suppressHydrationWarning={true}>
        <header></header>
        <div className="flex flex-1 h-screen">
          <aside className="bg-white flex flex-col w-52 py-5 gap-5">
            <Link
              href="/"
              className="flex gap-2 px-5 text-gray-600 transition duration-200 hover:text-white hover:bg-dark-primary p-3"
            >
              <Home /> <strong>Início</strong>
            </Link>
            <Link
              href="/client"
              className="flex gap-2 px-5 text-gray-600 transition duration-200 hover:text-white hover:bg-dark-primary p-3"
            >
              <Users /> <strong>Clientes</strong>
            </Link>
            <Link
              href="/procedure"
              className="flex gap-2 px-5 text-gray-600 transition duration-200 hover:text-white hover:bg-dark-primary p-3"
            >
              <ClipboardCheck /> <strong>Procedimentos</strong>
            </Link>
            <Link
              href="/schedule"
              className="flex gap-2 px-5 text-gray-600 transition duration-200 hover:text-white hover:bg-dark-primary p-3"
            >
              <CalendarCheck /> <strong>Agenda</strong>
            </Link>
            <Link
              href="/sale"
              className="flex gap-2 px-5 text-gray-600 transition duration-200 hover:text-white hover:bg-dark-primary p-3"
            >
              <ShoppingBag /> <strong>Vendas</strong>
            </Link>
          </aside>
          <main className="bg-base-background flex-1 h-full py-2">
            <ProceduresProvider>{children}</ProceduresProvider>
          </main>
        </div>
        <ToastContainer />
      </body>
    </html>
  )
}
