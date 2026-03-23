// app/page.tsx
import HomeView from "@/view/HomeView"
import { Suspense } from "react"
import AuthGate from "@/components/AuthGate"

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <AuthGate />
    </Suspense>
  )
}