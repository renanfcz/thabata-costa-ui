import { gql } from 'graphql-request'

export const CREATE_PROCEDURE = gql`
  mutation CreateProcedure($createProcedureInput: CreateProcedureInput!) {
    createProcedure(createProcedureInput: $createProcedureInput) {
      id
      name
      price
      color
    }
  }
`

export const REMOVE_PROCEDURE = gql`
  mutation RemoveProcedure($removeProcedureId: String!) {
    removeProcedure(id: $removeProcedureId) {
      id
      name
      price
      color
    }
  }
`
