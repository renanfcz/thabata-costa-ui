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
    }
  }
`

export const GET_CLIENT_BY_NAME = gql`
  query FindClientByName($name: String!) {
    findClientByName(name: $name) {
      id
      name
      cpf
      dateBirth
      celphone
      state
      city
      street
      number
      complement
      indications {
        celphone
        clientId
        name
        socialMedia
        socialMediaId
      }
      createdAt
      knowUs
      socialMediaId
      socialMedia
      sales {
        createdAt
        id
        protocolDesc
        protocolName
        saleItems {
          discount
          id
          procedure {
            name
            price
          }
          value
        }
      }
      clientStatus
    }
  }
`

export const GET_CLIENT_BY_ID = gql`
  query FindOneClient($findOneClientId: String!) {
    findOneClient(id: $findOneClientId) {
      id
      name
      cpf
      dateBirth
      celphone
      state
      city
      street
      number
      complement
      indications {
        celphone
        clientId
        name
        socialMedia
        socialMediaId
      }
      createdAt
      knowUs
      socialMediaId
      socialMedia
      sales {
        createdAt
        id
        protocolDesc
        protocolName
        saleItems {
          discount
          id
          procedure {
            name
            price
          }
          value
        }
      }
      clientStatus
    }
  }
`
