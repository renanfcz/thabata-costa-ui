import { graphqlClient } from '@/server/graphql-client'
import { ResponseAuthenticate } from '@/server/queries/responses/AuthResponses'
import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import { AUTHENTICATE } from '@/server/queries/requests/auth/AuthQueries'

const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
      },

      async authorize(
        credentials: Record<'email' | 'password', string> | undefined,
      ) {
        return graphqlClient
          .request<ResponseAuthenticate>(AUTHENTICATE, {
            authInput: {
              email: credentials?.email,
              password: credentials?.password,
            },
          })
          .then((res) => {
            if (res.authenticate) return res.authenticate.user

            return null
          })
          .catch((error) => {
            console.error('Erro durante a autenticação:', error)
            return null
          })
      },
    }),
  ],
  pages: {
    signIn: '/',
  },
}

const handler = NextAuth(nextAuthOptions)

export { handler as GET, handler as POST, nextAuthOptions }
