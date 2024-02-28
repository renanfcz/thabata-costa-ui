import BackButton from '@/components/form/buttons/BackButton'
import CloseButton from '@/components/form/buttons/CloseButton'
import { SessionForm } from '@/dtos/session/SessionForm'
import { Client } from '@/models/Client'
import { graphqlClient } from '@/server/graphql-client'
import {
  CREATE_SESSION,
  UPDATE_SESSION,
} from '@/server/mutations/requests/session/SessionMutations'
import { ResponseCreateSession } from '@/server/mutations/responses/SessionResponses'
import { convertIsoToDate } from '@/utils/converter'
import { dateTimeFormatter, timeFormatter } from '@/utils/formatter'
import { toast } from 'react-toastify'

interface ConfirmCreateSessionProps {
  createSession: SessionForm | undefined
  clients: Client[]
  onClose(): void
  prevForm(): void
}

export default function ConfirmCreateSession({
  createSession,
  clients,
  onClose,
  prevForm,
}: ConfirmCreateSessionProps) {
  async function handleCreateSession() {
    if (createSession !== undefined) {
      const selectedClient = clients.find(
        (c) => c.name === createSession.clientName,
      )
      const sale = selectedClient?.sales.find((s) =>
        s.protocols.find((p) => p.protocolName === createSession.protocol),
      )
      const selectedProtocol = sale?.protocols.find(
        (p) => p.protocolName === createSession.protocol,
      )
      const saleItem = selectedProtocol?.saleItems.find(
        (s) => s.procedure.name === createSession.procedure,
      )

      const loading = toast.loading('Salvando...')
      try {
        console.log(createSession)
        if (createSession.id === undefined) {
          await graphqlClient.request<ResponseCreateSession>(CREATE_SESSION, {
            createSessionInput: {
              obs: createSession.obs,
              finalDate: createSession.finalDate,
              initDate: createSession.initDate,
              saleItemId: saleItem?.id,
            },
          })
        } else {
          await graphqlClient.request<ResponseCreateSession>(UPDATE_SESSION, {
            updateSessionInput: {
              id: createSession.id,
              obs: createSession.obs,
              finalDate: createSession.finalDate,
              initDate: createSession.initDate,
              saleItemId: saleItem?.id,
              status: createSession.status,
            },
          })
        }

        toast.update(loading, {
          render: 'Sessão salva com sucesso!',
          type: 'success',
          isLoading: false,
          autoClose: 5000,
        })
        onClose()
      } catch (error: any) {
        toast.update(loading, {
          render: error.response.errors[0].message,
          type: 'error',
          isLoading: false,
          autoClose: 5000,
        })
      }
    }
  }

  function getSessionDate(start: Date | undefined, end: Date | undefined) {
    if (start !== undefined && end !== undefined) {
      const startSession = dateTimeFormatter.format(start)
      return startSession.toString() + ' - ' + timeFormatter.format(end)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <BackButton onClick={prevForm} />
      <div className="flex flex-col justify-center">
        <div className="flex gap-1">
          <span>Cliente:</span>
          <span className="font-bold">{createSession?.clientName}</span>
        </div>
        <div className="flex gap-1">
          <span>Protocolo:</span>
          <span className="font-bold">{createSession?.protocol}</span>
        </div>
        <div className="flex gap-1">
          <span>Procedimento:</span>
          <span className="font-bold">{createSession?.procedure}</span>
        </div>
        <div className="flex gap-1">
          <span>Agendado para:</span>
          <span className="font-bold">
            {getSessionDate(createSession?.initDate, createSession?.finalDate)}
          </span>
        </div>
        <div className="flex gap-1">
          <span>Observação:</span>
          <span className="font-bold">{createSession?.obs}</span>
        </div>
      </div>
      <div className="flex gap-2 justify-end">
        <CloseButton onClose={onClose} />
        <button
          className="px-10 py-3 font-bold border border-info rounded text-info hover:bg-info hover:text-white transition duration-200"
          onClick={handleCreateSession}
        >
          Salvar sessão
        </button>
      </div>
    </div>
  )
}
