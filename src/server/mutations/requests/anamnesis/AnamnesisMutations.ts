import { gql } from 'graphql-request'

export const CREATE_ANAMNESIS = gql`
  mutation CreateAnamnesis($createAnamnesisInput: CreateAnamnesisInput!) {
    createAnamnesis(createAnamnesisInput: $createAnamnesisInput) {
      id
      protocolType
      data
    }
  }
`

export const SIGN_ANAMNESIS = gql`
  mutation SignAnamnesis($input: UpdateAnamnesisInput!) {
    signAnamnesis(input: $input) {
      id
      protocolType
      data
    }
  }
`
