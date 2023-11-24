import TextInputAnamnesis from './TextInputAnamnesis'

interface JustificationInputProps {
  text: string
  setValue(value: string): void
  hasError: boolean
  isDirty: boolean
}

export default function JustificationInput({
  text,
  setValue,
  hasError,
  isDirty,
}: JustificationInputProps) {
  return (
    <div className="flex">
      <div className="flex w-full items-center">
        <span>{text}</span>
      </div>
      <TextInputAnamnesis
        hasError={hasError}
        isDirty={isDirty}
        setValue={setValue}
      />
    </div>
  )
}
