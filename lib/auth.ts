import { compare } from "bcrypt"
import { AuthOptions } from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import Credentials from "next-auth/providers/credentials"

import client from '@/lib/prismadb'

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || ""
    }),
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          type: "text",
          label: "Email",
        },
        password: {
          type: "password",
          label: "Password",
        }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password required")
        }

        const user = await client.user.findFirst({
          where: {
            email: credentials.email,
          }
        })

        if (!user || !user.hashedPassword) {
          throw new Error("Email does not exist")
        }

        const isCorrectPassword = await compare(credentials.password, user.hashedPassword)

        if (!isCorrectPassword) {
          throw new Error('Incorrect password')
        }

        return user;
      }
    })
  ],
  pages: {
    signIn: '/auth'
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  adapter: PrismaAdapter(client),
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET
  },
  secret: process.env.NEXTAUTH_SECRET,
}