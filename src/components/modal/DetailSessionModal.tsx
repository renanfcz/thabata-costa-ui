interface DetailSessionModalProps {
  isOpen: boolean
  children: React.ReactNode
}

export default function DetailSessionModal({
  isOpen,
  children,
}: DetailSessionModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed z-10 inset-0 flex items-center justify-center bg-black bg-opacity-50 w-full">
      <div className="bg-white p-4 rounded-lg shadow-md relative lg:w-1/3 md:w-4/5">
        {children}
      </div>
    </div>
  )
}
