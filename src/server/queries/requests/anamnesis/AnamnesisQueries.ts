import { gql } from 'graphql-request'

export const GET_ALL_ANAMNESIS_BY_CLIENT = gql`
  query FindAllAnamnesis {
    findAllAnamnesis {
      id
      protocolType
      createdAt
      signedIn
      expriresIn
      data
      client {
        id
        name
      }
    }
  }
`
