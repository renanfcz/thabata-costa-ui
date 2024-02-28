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
      id
      initDate
      finalDate
      obs
      status
      saleItem {
        id
        sessionsNum
        value
        discount
        procedure {
          name
          price
          color
          id
        }
        protocol {
          id
          protocolName
          protocolDesc
          sale {
            client {
              name
            }
          }
        }
      }
    }
  }
`

export const REMOVE_SESSION = gql`
  mutation RemoveSession($removeSessionId: String!) {
    removeSession(id: $removeSessionId)
  }
`
