import { gql } from 'graphql-request'

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
