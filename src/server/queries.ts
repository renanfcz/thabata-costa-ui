import { gql } from 'graphql-request'

export const GET_CLIENTS = gql`
  query FindAllClients {
    findAllClients {
      id
      cpf
      dateBirth
      celphone
      state
      city
      street
      number
      complement
      indications {
        name
        celphone
        socialMedia
        socialMediaId
        clientId
      }
      knowUs
      socialMediaId
      socialMedia
      clientStatus
      createdAt
      name
      sales {
        createdAt
        id
        protocolDesc
        protocolName
        saleItems {
          discount
          id
          value
          sessions {
            id
            initDate
            obs
            finalDate
            saleItem {
              discount
              id
              sessionsNum
              value
              procedure {
                id
                name
                price
              }
            }
          }
          procedure {
            id
            name
            price
          }
          sessionsNum
        }
      }
    }
  }
`

export const GET_CLIENT_BY_NAME = gql`
  query FindClientByName($name: String!) {
    findClientByName(name: $name) {
      id
      cpf
      dateBirth
      celphone
      state
      city
      street
      number
      complement
      indications {
        name
        celphone
        socialMedia
        socialMediaId
        clientId
      }
      knowUs
      socialMediaId
      socialMedia
      clientStatus
      createdAt
      name
      sales {
        createdAt
        id
        protocolDesc
        protocolName
        saleItems {
          discount
          id
          value
          sessions {
            id
            initDate
            obs
            finalDate
            saleItem {
              discount
              id
              sessionsNum
              value
              procedure {
                id
                name
                price
              }
            }
          }
          procedure {
            id
            name
            price
          }
          sessionsNum
        }
      }
    }
  }
`

export const GET_CLIENT_BY_ID = gql`
  query FindOneClient($findOneClientId: String!) {
    findOneClient(id: $findOneClientId) {
      id
      cpf
      dateBirth
      celphone
      state
      city
      street
      number
      complement
      indications {
        name
        celphone
        socialMedia
        socialMediaId
        clientId
      }
      knowUs
      socialMediaId
      socialMedia
      clientStatus
      createdAt
      name
      sales {
        createdAt
        id
        protocolDesc
        protocolName
        saleItems {
          discount
          id
          value
          sessions {
            id
            initDate
            obs
            finalDate
            saleItem {
              discount
              id
              sessionsNum
              value
              procedure {
                id
                name
                price
              }
            }
          }
          procedure {
            id
            name
            price
          }
          sessionsNum
        }
      }
    }
  }
`

export const GET_PROCEDURES = gql`
  query FindAllProcedures {
    findAllProcedures {
      id
      name
      price
      color
    }
  }
`

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
