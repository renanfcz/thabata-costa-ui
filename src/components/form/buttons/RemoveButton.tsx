interface RemoveButtonProps {
  onClick(): void
}
export default function RemoveButton({ onClick }: RemoveButtonProps) {
  return (
    <button
      onClick={onClick}
      className="px-10 py-3 font-bold border border-info rounded text-info hover:bg-info hover:text-white transition duration-200"
    >
      Excluir
    </button>
  )
}
