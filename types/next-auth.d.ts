import NextAuth, { DefaultSession, DefaultUser } from "next-auth"

// 🔹 Extende o tipo do "User" retornado pelo banco
declare module "next-auth" {
  interface User extends DefaultUser {
    id: string
    twoFactorEnabled?: boolean
    totpVerified?: boolean
  }

  interface Session extends DefaultSession {
    user: {
      id: string
      twoFactorEnabled?: boolean
      totpVerified?: boolean
    } & DefaultSession["user"]
  }
}

// 🔹 Também precisa estender o tipo do JWT se estiver usando strategy: "jwt"
declare module "next-auth/jwt" {
  interface JWT {
    id?: string
    twoFactorEnabled?: boolean
    totpVerified?: boolean
  }
}
