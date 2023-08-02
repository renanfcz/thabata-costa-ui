interface SaveButtonProps {
  onClick(): void
}
export default function SaveButton({ onClick }: SaveButtonProps) {
  return (
    <button
      onClick={onClick}
      className="px-10 py-3 font-bold border border-info rounded text-info hover:bg-info hover:text-white transition duration-200"
    >
      Salvar
    </button>
  )
}
