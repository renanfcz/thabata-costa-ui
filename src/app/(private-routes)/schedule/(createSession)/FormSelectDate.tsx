import BackButton from '@/components/form/buttons/BackButton'
import CloseButton from '@/components/form/buttons/CloseButton'
import DateInput from '@/components/form/inputs/picker/DateInput'
import TimeInput from '@/components/form/inputs/picker/TimeInput'
import TextAreaInput from '@/components/form/inputs/TextAreaInput'
import { CreateSession } from '@/dtos/session/CreateSession'
import { dateFormatter } from '@/utils/formatter'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import * as z from 'zod'

interface FormSelectDateProps {
  onClose(): void
  prevForm(): void
  initDate: Date | undefined
  finalDate: Date | undefined
  createSession: CreateSession | undefined
  setCreateSession(session: CreateSession | undefined): void
  openConfirmPage(): void
}

const schema = z.object({
  sessionDate: z.date(),
  initHour: z.date(),
  finalHour: z.date(),
  obs: z.string(),
})

type FormData = z.infer<typeof schema>

export default function FormSelectDate({
  onClose,
  prevForm,
  initDate,
  finalDate,
  createSession,
  setCreateSession,
  openConfirmPage,
}: FormSelectDateProps) {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors, dirtyFields },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      sessionDate: initDate,
      initHour: initDate,
      finalHour: finalDate,
      obs: '',
    },
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  })

  function saveSassion(input: FormData) {
    const newSession = { ...createSession }
    newSession.initDate = input.initHour
    newSession.finalDate = input.finalHour
    newSession.obs = input.obs

    setCreateSession(newSession)
    openConfirmPage()
  }

  function handleChange(e: Date) {
    console.log(e)
    setValue('initHour', e)
  }

  return (
    <div className="flex flex-col gap-2">
      <BackButton onClick={prevForm} />
      <form
        onSubmit={handleSubmit(saveSassion)}
        className="flex flex-col gap-7 py-3"
      >
        <Controller
          name="sessionDate"
          control={control}
          render={({ field: { value, onChange } }) => (
            <DateInput
              label="Data da sessão"
              hasError={!!errors.sessionDate}
              value={value}
              setValue={(e: Date) => setValue('sessionDate', e)}
            />
          )}
        />
        <div className="flex gap-2">
          <Controller
            name="initHour"
            control={control}
            render={({ field: { value, onChange } }) => (
              <TimeInput
                label="De"
                hasError={!!errors.initHour}
                value={value}
                setValue={handleChange}
              />
            )}
          />
          <Controller
            name="finalHour"
            control={control}
            render={({ field: { value, onChange } }) => (
              <TimeInput
                label="Até"
                hasError={!!errors.finalHour}
                value={value}
                setValue={(e: Date) => setValue('finalHour', e)}
              />
            )}
          />
        </div>
        <div>
          <Controller
            name="obs"
            control={control}
            render={({ field: { value, onChange } }) => (
              <TextAreaInput
                label="Observação"
                value={value}
                setValue={onChange}
                hasError={!!errors.obs}
              />
            )}
          />
        </div>
        <div className="flex w-full gap-2 justify-end">
          <CloseButton onClose={onClose} />
          <button
            className="px-10 py-3 font-bold border border-info rounded text-info hover:bg-info hover:text-white transition duration-200"
            type="submit"
          >
            Continuar
          </button>
        </div>
      </form>
    </div>
  )
}
