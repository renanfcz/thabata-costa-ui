interface RemoveItemModal {
  isOpen: boolean
  children: React.ReactNode
}
export default function RemoveItemModal({ isOpen, children }: RemoveItemModal) {
  if (!isOpen) return null

  return (
    <div className="fixed z-10 inset-0 flex items-center justify-center bg-black bg-opacity-50 w-full">
      <div className="bg-white p-4 rounded-lg shadow-md relative w-1/3 h-72">
        {children}
      </div>
    </div>
  )
}
