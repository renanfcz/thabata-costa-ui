import { gql } from 'graphql-request'

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
