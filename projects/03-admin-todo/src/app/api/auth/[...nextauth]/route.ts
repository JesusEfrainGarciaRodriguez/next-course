import NextAuth, { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from "@/src/lib/prisma";
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID ?? '',
            clientSecret: process.env.GOOGLE_SECRET ?? '',
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID ?? '',
            clientSecret: process.env.GITHUB_SECRET ?? '',
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            return true
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            const dbUser = await prisma.user.findUnique({
                where: {
                    email: token.email!,
                },
            })

            if( dbUser?.isActived === false) {
                throw new Error('User not actived')
            }

            token.roles = dbUser?.roles ?? []
            token.id = dbUser?.id ?? ''

            return token
        },
        async session({ session, token, user }) {
            if(session && session.user) {
                session.user.roles = token.roles
                session.user.id = token.id
            }
            
            console.log(session)
            return session
        }
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }