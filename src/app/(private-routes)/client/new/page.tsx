import RegisterPage from '@/app/(private-routes)/client/new/(register)/RegisterPage'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

export default function ClientNew() {
  return (
    <div>
      <div className="flex flex-col h-full mx-10">
        <div className="flex px-3 justify-between items-center">
          <Link
            href="/client"
            className="flex text-gray-400 hover:text-gray-600"
          >
            <ChevronLeft />
          </Link>
          <h1 className="text-2xl py-3">Novo cliente</h1>
          <div></div>
        </div>
        <div className="bg-white">
          <div className="py-3">
            <RegisterPage />
          </div>
        </div>
      </div>
    </div>
  )
}
