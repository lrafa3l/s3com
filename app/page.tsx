// app/page.tsx
import { Suspense } from "react"
import AuthGate from "@/components/AuthGate"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import AdminPage from "../components/admin/admin"

// Force dynamic rendering - getServerSession uses headers() which requires runtime
export const dynamic = "force-dynamic"

export default async function Home() 
{
  const session = await getServerSession(authOptions)

  if (!session) {
    return (
      <Suspense fallback={<div className="min-h-screen bg-background" />}>
        <AuthGate />
      </Suspense>
    )
  }

  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <AdminPage  />
    </Suspense>
  )
}