interface CloseButtonProps {
  onClose(): void
}

export default function CloseButton({ onClose }: CloseButtonProps) {
  return (
    <button
      onClick={onClose}
      className="px-10 py-3 font-bold border border-danger rounded text-danger hover:bg-danger hover:text-white transition duration-200"
    >
      Fechar
    </button>
  )
}
