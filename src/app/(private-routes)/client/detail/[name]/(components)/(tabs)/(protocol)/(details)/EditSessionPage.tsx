'use client'
import BackButton from '@/components/form/buttons/BackButton'
import TextAreaInput from '@/components/form/inputs/TextAreaInput'
import TextInput from '@/components/form/inputs/TextInput'
import DateInput from '@/components/form/inputs/picker/DateInput'
import TimeInput from '@/components/form/inputs/picker/TimeInput'
import { SessionForm } from '@/dtos/session/SessionForm'
import { Session } from '@/models/Session'
import { graphqlClient } from '@/server/graphql-client'
import { UPDATE_SESSION } from '@/server/mutations/requests/session/SessionMutations'
import { ResponseUpdateSession } from '@/server/mutations/responses/SessionResponses'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

const schema = z.object({
  sessionDate: z.date(),
  initHour: z.date(),
  finalHour: z.date(),
  obs: z.string(),
})

type FormData = z.infer<typeof schema>

interface EditSessionPageProps {
  closeForm(): void
  sessionForm: SessionForm | undefined
  updateSession(session: Session): void
}

export default function EditSessionPage({
  closeForm,
  sessionForm,
  updateSession,
}: EditSessionPageProps) {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      sessionDate: buildDate(sessionForm?.initDate),
      initHour: buildDate(sessionForm?.initDate),
      finalHour: buildDate(sessionForm?.finalDate),
      obs: '',
    },
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  })

  function buildDate(date: Date | undefined) {
    if (date !== undefined) {
      return new Date(date)
    }

    return undefined
  }

  async function handleSaveSession(formData: FormData) {
    try {
      const data = await graphqlClient.request<ResponseUpdateSession>(
        UPDATE_SESSION,
        {
          updateSessionInput: {
            id: sessionForm?.id,
            initDate: formData.initHour,
            finalDate: formData.finalHour,
            obs: formData.obs,
            status: sessionForm?.status,
            saleItemId: sessionForm?.saleItemId,
          },
        },
      )
      toast.success('Sessão atualizado com sucesso!')
      updateSession(data.updateSession)
      closeForm()
    } catch (e) {
      toast.error('Ocorreu um erro ao tentar atualizar dados da sessão!')
    }
  }

  return (
    <div className="lg:w-1/2 px-3">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between w-full">
          <BackButton onClick={closeForm} />
        </div>
        <h2 className="text-base font-bold px-2">Editar Sessão</h2>
        <div className="flex flex-col gap-5 justify-center">
          <form
            onSubmit={handleSubmit(handleSaveSession)}
            className="flex flex-col gap-7 py-3"
          >
            <TextInput
              label={'Nome do cliente'}
              value={sessionForm?.clientName || ''}
              setValue={() => null}
              disable={true}
            />
            <TextInput
              label={'Protocolo'}
              value={sessionForm?.protocol || ''}
              setValue={() => null}
              disable={true}
            />
            <TextInput
              label={'Procedimento'}
              value={sessionForm?.procedure || ''}
              setValue={() => null}
              disable={true}
            />
            <Controller
              name="sessionDate"
              control={control}
              render={({ field: { value, onChange } }) => (
                <DateInput
                  label="Data da sessão"
                  hasError={!!errors.sessionDate}
                  value={value}
                  setValue={onChange}
                />
              )}
            />
            <div className="flex gap-2">
              <Controller
                name="initHour"
                control={control}
                render={({ field: { value } }) => (
                  <TimeInput
                    label="De"
                    hasError={!!errors.initHour}
                    value={value}
                    setValue={(e: Date) => setValue('initHour', e)}
                  />
                )}
              />
              <Controller
                name="finalHour"
                control={control}
                render={({ field: { value } }) => (
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
            <div className="-mt-4">
              <button
                type="submit"
                className="px-10 py-3 font-bold border border-info rounded text-info hover:bg-info hover:text-white transition duration-200 w-full"
              >
                Salvar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
