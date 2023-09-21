import { gql } from 'graphql-request'

export const CREATE_CLIENT = gql`
  mutation CreateClient($createClientInput: CreateClientInput!) {
    createClient(createClientInput: $createClientInput) {
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
      knowUs
      socialMediaId
      socialMedia
      clientStatus
      createdAt
    }
  }
`
export const REMOVE_CLIENT = gql`
  mutation RemoveClient($id: String!) {
    removeClient(id: $id) {
      name
    }
  }
`

export const UPDATE_CLIENT = gql`
  mutation UpdateClient(
    $updateClientInput: UpdateClientInput!
    $clientId: String!
  ) {
    updateClient(updateClientInput: $updateClientInput, clientId: $clientId) {
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
      knowUs
      socialMediaId
      socialMedia
      clientStatus
      createdAt
    }
  }
`

export const CREATE_INDICATION = gql`
  mutation CreateIndication($createIndicationInput: CreateIndicationInput!) {
    createIndication(createIndicationInput: $createIndicationInput) {
      name
      celphone
      socialMedia
      socialMediaId
      clientId
      id
    }
  }
`

export const REMOVE_INDICATION = gql`
  mutation RemoveIndication($id: String!) {
    removeIndication(id: $id) {
      celphone
      clientId
      name
      socialMedia
      socialMediaId
    }
  }
`

export const UPDATE_PROTOCOL = gql`
  mutation UpdateSale($id: String!, $sale: UpdateSaleInput!) {
    updateSale(id: $id, sale: $sale) {
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
      }
      id
      initDate
      finalDate
      obs
    }
  }
`
export const CREATE_PROCEDURE = gql`
  mutation CreateProcedure($createProcedureInput: CreateProcedureInput!) {
    createProcedure(createProcedureInput: $createProcedureInput) {
      id
      name
      price
    }
  }
`

export const CREATE_SALE = gql`
  mutation CreateSale($createSaleInput: CreateSaleInput!) {
    createSale(createSaleInput: $createSaleInput) {
      client {
        name
      }
      createdAt
      id
      protocolDesc
      protocolName
      saleItems {
        discount
        id
        value
        sessionsNum
      }
    }
  }
`
