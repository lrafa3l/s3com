import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import Dashboard from "@/components/admin/main"
import HeaderPage from "@/components/admin/layouts/header-page"
import { Suspense } from "react"
import { redirect } from "next/navigation"

export default async function AdminPage({
  searchParams,
}: {
  searchParams?: Record<string, string | undefined>
}) {
  const session = await getServerSession(authOptions)
  const tab = searchParams?.tab ?? "subscriber"

  if(!session)
    redirect("/signin")

  return (
    <>
      <Suspense>
        <HeaderPage />
        <Dashboard tab={tab} />
      </Suspense>
    </>
  )
}
