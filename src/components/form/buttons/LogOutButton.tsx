'use client'
import { LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function LogOutButton() {
  const router = useRouter()

  async function handleLogout() {
    await signOut({
      redirect: false,
    })

    router.replace('/')
  }
  return (
    <div>
      <button onClick={handleLogout} className="flex text-gray-600">
        <LogOut />
        Sair
      </button>
    </div>
  )
}
