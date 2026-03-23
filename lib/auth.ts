import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";

/**
 * Shared auth configuration — providers, session strategy, callbacks.
 * Used as the base for both read-only and adapter-equipped variants.
 */
const sharedAuthConfig: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        identifier: { label: "Email ou Username", type: "text" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.identifier || !credentials?.password) {
          throw new Error("Preencha todos os campos");
        }

        const user = await prisma.user.findFirst({
          where: {
            OR: [
              { email: credentials.identifier },
              { username: credentials.identifier },
            ],
          },
        });

        if (!user) throw new Error("Usuário não encontrado");

        if (!user.password) {
          throw new Error("Usuário não possui senha local, tente outro método de login");
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);

        if (!isValid) throw new Error("Senha incorreta");

        return { id: user.id, email: user.email, twoFactorEnabled: user.twoFactorEnabled }
      },
    }),
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/signin", // Página customizada de login 
  },

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // Quando o usuário faz login
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
        token.picture = user.image
        token.twoFactorEnabled = user.twoFactorEnabled
        token.totpVerified = !user.twoFactorEnabled // se não tiver 2FA, já vem como verificado
      }

      // ✅ Quando chamamos update() no cliente
      if (trigger === "update" && session?.totpVerified !== undefined) {
        token.totpVerified = session.totpVerified
      }

      return token
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.email = token.email as string
        session.user.name = token.name as string
        session.user.image = token.picture as string
        session.user.twoFactorEnabled = token.twoFactorEnabled
        session.user.totpVerified = token.totpVerified
      }
      return session
    },
  }
};

/**
 * BUG 1 FIX: Read-only auth options — NO PrismaAdapter.
 * Used in getServerSession() calls across the app (e.g. AuthGate, admin page).
 * Since session.strategy is "jwt", the adapter is NOT needed for session reads,
 * and including it causes a DB connection on every check — which can hang on
 * cold starts / Neon serverless latency, leaving Suspense stuck forever (blank page).
 */
export const authOptions: AuthOptions = {
  ...sharedAuthConfig,
};

/**
 * Auth options WITH PrismaAdapter — used ONLY in the NextAuth API route handler.
 * The adapter is required for OAuth account persistence (linking provider accounts
 * to users in the database on sign-in/sign-up).
 */
export const authOptionsWithAdapter: AuthOptions = {
  ...sharedAuthConfig,
  adapter: PrismaAdapter(prisma),
};