import * as bcrypt from 'bcrypt'
import { type NextAuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

import { PAGES } from '@/lib/constants'
import { prisma } from '@/lib/prisma'

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        Credentials({
            name: 'Credentials Provider',
            credentials: {
                email: { label: 'Email', type: 'email', required: true },
                password: {
                    label: 'password',
                    type: 'password',
                    required: true,
                },
            },
            authorize: async credentials => {
                if (!credentials) return null

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                })

                if (
                    user &&
                    bcrypt.compareSync(credentials.password, user.password)
                ) {
                    return { id: user.id, email: user.email, name: user.name ?? "" }
                }

                return null
            },
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id
                session.user.email = token.email
                session.user.name = token.name
            }
            return session
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.email = user.email
                token.name = user.name
            }
            return token
        },
    },
    session: {
        strategy: 'jwt',
        maxAge: 2 * 60 * 60,
    },
    pages: {
        signIn: PAGES.SIGN_IN,
    },
}
