import { gql } from 'graphql-request'

export const CREATE_SESSION = gql`
  mutation CreateSession($createSessionInput: CreateSessionInput!) {
    createSession(createSessionInput: $createSessionInput) {
      id
      saleItem {
        id
        procedure {
          name
        }
        value
        discount
      }
      obs
      finalDate
      initDate
      status
    }
  }
`

export const UPDATE_SESSION = gql`
  mutation UpdateSession($updateSessionInput: UpdateSessionInput!) {
    updateSession(updateSessionInput: $updateSessionInput) {
      saleItem {
        id
        value
        discount
        sessionsNum
        procedure {
          name
          price
          id
        }
        sale {
          client {
            name
          }
        }
      }
      id
      initDate
      finalDate
      obs
    }
  }
`

export const REMOVE_SESSION = gql`
  mutation RemoveSession($removeSessionId: String!) {
    removeSession(id: $removeSessionId)
  }
`
