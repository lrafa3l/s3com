// components/AuthGate.tsx
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import HomeView from "@/view/HomeView"

export default async function AuthGate() {
  try {
    const session = await getServerSession(authOptions)
    if (session) {
      redirect("/admin")
    }
  } catch (error) {
    // Session check failed — show home page anyway
    console.error("AuthGate session error:", error)
  }

  return <HomeView />
}