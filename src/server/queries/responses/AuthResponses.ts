import { User } from '@/models/User'

export interface ResponseAuthenticate {
  authenticate: {
    token: string
    user: User
  }
}
