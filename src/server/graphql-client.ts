import { GraphQLClient } from 'graphql-request'

export const graphqlClient = new GraphQLClient(
  process.env.NEXT_PUBLIC_ROOT_URL as string,
  { errorPolicy: 'all' },
)
