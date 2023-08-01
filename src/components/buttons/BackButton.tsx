import { ChevronsLeft } from 'lucide-react'

interface BackButtonProps {
  onClick(): void
}

export default function BackButton({ onClick }: BackButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex text-gray-400 hover:text-gray-600"
    >
      <ChevronsLeft />
      Voltar
    </button>
  )
}
