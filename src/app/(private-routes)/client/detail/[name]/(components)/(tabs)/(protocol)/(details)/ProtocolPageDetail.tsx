import ObservationProtocol from '@/components/protocol/ObservationProtocol'
import TableDetailProtocolCard from '@/app/(private-routes)/client/detail/[name]/(components)/(tabs)/(protocol)/(details)/TableDetailProtocolCard'
import { Protocol } from '@/models/Protocol'
import { Session } from '@/models/Session'
import { graphqlClient } from '@/server/graphql-client'
import { GET_ALL_SESSIONS_BY_PROTOCOL } from '@/server/queries/requests/session/SessionQueries'
import { ResponseFindAllSessionsByProtocol } from '@/server/queries/responses/SessionResponses'

interface ProtocolPageDetailProps {
  protocol: Protocol | undefined
}

export default async function ProtocolPageDetail({
  protocol,
}: ProtocolPageDetailProps) {
  const data = await graphqlClient.request<ResponseFindAllSessionsByProtocol>(
    GET_ALL_SESSIONS_BY_PROTOCOL,
    {
      protocolId: protocol?.id,
    },
  )
  const sessions: [Session] = data.findAllSessionsByProtocol

  return (
    <div>
      <div className="px-2 py-2">
        <h1 className="text-lg font-bold">
          Protocolo: {protocol?.protocolName}
        </h1>
      </div>
      <div className="p-2">
        <ObservationProtocol protocol={protocol} />
        <p>{protocol?.protocolDesc}</p>
      </div>
      <TableDetailProtocolCard sessions={sessions} />
    </div>
  )
}
