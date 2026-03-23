// BUG 1 FIX: Use authOptionsWithAdapter here — the API route needs the PrismaAdapter
// for OAuth account persistence, unlike getServerSession calls elsewhere.
import { authOptionsWithAdapter } from "@/lib/auth";
import NextAuth from "next-auth";

const handler = NextAuth(authOptionsWithAdapter);
export { handler as GET, handler as POST };
