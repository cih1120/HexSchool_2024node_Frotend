import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { signIn, getUserProfile } from "@/service/auth.service";
import { NextAuthUserType } from "@/next-auth"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          if (!credentials) throw Error("")
          const res = await signIn(credentials);
          return res
        } catch (err) {
          return { error: err, id: "" }
        }
      }
    })
  ],
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const typedUser = user as NextAuthUserType;
      if ('error' in typedUser) {
        throw new Error(typedUser.error.statusCode.toString())
      } else {
        return true
      }
    },
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
    async session({ session, user, token }) {
      return session
    },
    async jwt({ token, user, account, profile }) {
      return token
    }
  }
}

export const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }