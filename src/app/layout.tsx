import './globals.css'
import 'react-toastify/dist/ReactToastify.css'
import { Roboto } from 'next/font/google'
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
          <main className="bg-white flex-1 h-full py-2">
            <ProceduresProvider>{children}</ProceduresProvider>
          </main>
        </div>
        <ToastContainer />
      </body>
    </html>
  )
}
