import { AUTHENTICATE } from './../../../server/queries/requests/auth/AuthQueries';
import { ResponseAuthenticate } from '@/server/queries/responses/AuthResponses';
import { graphqlClient } from "@/server/graphql-client"
import NextAuth, {NextAuthOptions} from "next-auth"
import CredentialsProvider, { CredentialInput } from 'next-auth/providers/credentials'

const nextAuthOptions: NextAuthOptions = {
    providers: [CredentialsProvider({
        name: 'credentials',
        credentials: {
            email: {label: 'email', type: 'text'},
            password: {label: 'password', type: 'password'},
        },

        async authorize(credentials: any, req: any){
            const response = await graphqlClient.request<ResponseAuthenticate>(
                AUTHENTICATE, {
                    email: credentials.email,
                    password: credentials.password,
                }
              )

              if(response !== null || response !== undefined)
                return response.authenticate

              return null
        }
    })]
}

const handler = NextAuth({
  ...
})

export { handler as GET, handler as POST }