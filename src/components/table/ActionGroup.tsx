import { Info, Trash2 } from 'lucide-react'
import Link from 'next/link'

export function ActionGroup() {
  return (
    <div className="flex gap-4 justify-end">
      <Link href="/client/detail">
        <Info className="text-info text-xs" />
      </Link>
      <button>
        <Trash2 className="text-danger text-xs" />
      </button>
    </div>
  )
}
