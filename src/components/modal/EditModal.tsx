interface ModalProps {
  isOpen: boolean
  children: React.ReactNode
}
export default function EditModal({ isOpen, children }: ModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 w-full">
      <div className="bg-white p-4 rounded-lg shadow-md relative w-1/2 h-1/3">
        {children}
      </div>
    </div>
  )
}
