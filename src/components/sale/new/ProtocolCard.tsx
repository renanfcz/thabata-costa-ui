import TextAreaInput from '@/components/form/TextAreaInput'
import TextInput from '@/components/form/TextInput'
import { useNewSaleContext } from '@/contexts/NewSaleContext'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const protocolSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(3),
})

export type ProtocolFormData = z.infer<typeof protocolSchema>

export default function ProtocolCard() {
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm<ProtocolFormData>({
    resolver: zodResolver(protocolSchema),
    reValidateMode: 'onChange',
    mode: 'onSubmit',
    defaultValues: {
      name: undefined,
      description: undefined,
    },
  })

  const { sale, updateSale } = useNewSaleContext()

  return (
    <div className="bg-white rounded p-5 flex flex-col gap-3">
      <h2>Protocolo</h2>
      <form onSubmit={handleSubmit()} className="flex flex-col gap-5">
        <TextInput
          label="Protocolo"
          isDirdy={}
          hasErro={}
          {...register('protocolName')}
        />
        <TextAreaInput
          label="Descrição do protocolo"
          value={sale.protocolDesc}
          setValue={setProtocolDesc}
          {...register('protocolDesc')}
        />
      </form>
    </div>
  )
}
