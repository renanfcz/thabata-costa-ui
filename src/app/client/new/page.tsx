import RegisterPage from '@/components/client/new/RegisterPage'
import { ChevronsLeft } from 'lucide-react'
import Link from 'next/link'

export default function ClientNew() {
  return (
    <div>
      <div className="flex flex-col h-full mx-10">
        <h1 className="text-2xl py-3">Novo cliente</h1>
        <div className="bg-white">
          <div className="py-3">
            <div className="flex px-3">
              <Link
                href="/client"
                className="flex text-gray-400 hover:text-gray-600"
              >
                <ChevronsLeft />
                Voltar
              </Link>
            </div>
            <RegisterPage />
          </div>
        </div>
      </div>
    </div>
  )
}
