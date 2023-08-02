interface RadioButtonProps {
  onClick(): void
  isClicked: boolean
  children: React.ReactNode
}

export default function RadioButton({
  children,
  onClick,
  isClicked,
}: RadioButtonProps) {
  return (
    <div className="w-full">
      <button
        onClick={onClick}
        className={`flex justify-center gap-1 w-full px-5 py-2  border-2   rounded ${
          isClicked
            ? 'border-primary bg-light-primary text-white'
            : 'text-gray-600 border-gray-200 bg-gray-200 hover:border-gray-300 hover:bg-gray-300'
        }`}
      >
        {children}
      </button>
    </div>
  )
}
