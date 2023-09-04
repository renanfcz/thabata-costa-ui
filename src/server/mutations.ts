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
