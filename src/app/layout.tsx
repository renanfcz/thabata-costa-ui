import './globals.css'
import 'react-toastify/dist/ReactToastify.css'
import { Roboto } from 'next/font/google'
import { ToastContainer } from 'react-toastify'
import { ProceduresProvider } from '@/contexts/ProcedureContext'
import NextAuthSessionProvider from '@/providers/SessionProvider'

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
          <main className="flex-1 h-full">
            <NextAuthSessionProvider>
              <ProceduresProvider>{children}</ProceduresProvider>
            </NextAuthSessionProvider>
          </main>
        </div>
        <ToastContainer />
      </body>
    </html>
  )
}
