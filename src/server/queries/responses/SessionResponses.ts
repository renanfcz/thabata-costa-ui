import { Session } from '@/models/Session'

export interface ResponseFindAllSessions {
  findAllSessions: [Session]
}

export interface ResponseFindAllSessionsByProtocol {
  findAllSessionsByProtocol: [Session]
}
