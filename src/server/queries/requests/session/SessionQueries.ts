import { gql } from 'graphql-request'

export const GET_ALL_SCHEDULE = gql`
  query FindAllSessions {
    findAllSessions {
      saleItem {
        id
        value
        discount
        sessionsNum
        procedure {
          name
          price
          id
          color
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
      id
      initDate
      finalDate
      obs
      status
    }
  }
`
export const GET_ALL_SESSIONS_BY_PROTOCOL = gql`
  query FindAllSessionsByProtocol($protocolId: String!) {
    findAllSessionsByProtocol(protocolId: $protocolId) {
      saleItem {
        id
        value
        discount
        sessionsNum
        procedure {
          name
          price
          id
          color
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
      id
      initDate
      finalDate
      obs
      status
    }
  }
`
