"use client"

import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"

export function SocialLoginButton({ provider, children, }: { provider: "github" | "google"; children: React.ReactNode }) {
  return (
    <Button variant="outline" type="button" onClick={() => signIn(provider, { callbackUrl: "/" })}>
      {children}
    </Button>
  )
}
