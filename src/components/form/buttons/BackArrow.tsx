import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

export default function BackArrow() {
  return (
    <Link href="/home" className="flex text-gray-400 hover:text-gray-600">
      <ChevronLeft />
    </Link>
  )
}
