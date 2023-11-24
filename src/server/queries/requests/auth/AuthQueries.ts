import { gql } from 'graphql-request'

export const AUTHENTICATE = gql`
  query Authenticate($authInput: AuthenticateInput!) {
    authenticate(authInput: $authInput) {
      token
      user {
        id
        email
        name
      }
    }
  }
`
