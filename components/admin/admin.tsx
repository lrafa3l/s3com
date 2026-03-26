import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import Dashboard from "@/components/admin/main"
import HeaderPage from "@/components/admin/layouts/header-page"
import { Suspense } from "react"
import { redirect } from "next/navigation"

// Force dynamic rendering - getServerSession uses headers()
export const dynamic = "force-dynamic"

// BUG 10 FIX: In Next.js 15+, searchParams is a Promise and must be awaited.
export default async function AdminPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | undefined>>
}) {
  const params = await searchParams
  const tab = params?.tab ?? "subscriber"

  return (
    <>
      <Suspense>
        <HeaderPage />
        <Dashboard tab={tab} />
      </Suspense>
    </>
  )
}
