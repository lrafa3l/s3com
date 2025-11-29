'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { useState } from "react"
import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "@bprogress/next/app"
import { GalleryVerticalEnd } from "lucide-react"

export default function LoginPageForm() {  // <-- Removido async
  const [error, setError] = useState("")
  const { signIn } = useAuth()
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const identifier = formData.get("identifier")?.toString() || ""
    const password = formData.get("password")?.toString() || ""

    try {
      const res = await signIn("credentials", { identifier, password, redirect: false })
      if (res?.error) {
        setError(res.error)
      } else {
        toast.success("Login realizado com sucesso!")
        router.push("/")
      }
    } catch {
      setError("Erro ao fazer login")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6")}>
      <form onSubmit={handleSubmit}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <a
              href="/"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex size-8 items-center justify-center rounded-md">
                <img src="/logo.png" alt="sara3com" />
              </div>
              <span className="sr-only">Sara3com</span>
            </a>
            <h1 className="text-xl font-bold">Welcome to Sara3com</h1>
          </div>

          <Field>
            <FieldLabel htmlFor="identifier">Email ou Username</FieldLabel>
            <Input
              id="identifier"
              name="identifier"
              placeholder="email@exemplo.com ou username"
              required
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="password">Senha</FieldLabel>
            <Input id="password" name="password" type="password" required />
          </Field>

          <Field>
            {error && <span style={{ color: "red" }}>{error}</span>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Loading..." : "Login"}
            </Button>
          </Field>
        </FieldGroup>
      </form>

      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  )
}
