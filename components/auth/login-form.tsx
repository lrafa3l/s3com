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
              <div className="flex items-center justify-center rounded-md">
                <img src="/logo.png" alt="sara3com" className="w-10 h-10" />
              </div>
              <span className="sr-only">Sara3com</span>
            </a>
            <h1 className="text-xl font-bold">Benvindo(a) à Sara3com</h1>
          </div>

          <Field>
            <FieldLabel htmlFor="identifier" className="items-center text-center" >Email ou Username</FieldLabel>
            <Input
              id="identifier"
              name="identifier"
              placeholder="email@exemplo.com ou username"
              className="hidden md:flex px-6 py-2 rounded-full border-0 hover:opacity-90 shadow-[0_0_12px_var(--tw-shadow-color)] shadow-brand/20 hover:shadow-[0_0_18px_var(--tw-shadow-color)] hover:shadow-brand/40 transition-shadow"
              required
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="password">Senha</FieldLabel>
            <Input id="password" 
                  name="password"
                  type="password"
                  placeholder="Senha"
                  className="hidden md:flex px-6 py-2 rounded-full border-0 hover:opacity-90 shadow-[0_0_12px_var(--tw-shadow-color)] shadow-brand/20 hover:shadow-[0_0_18px_var(--tw-shadow-color)] hover:shadow-brand/40 transition-shadow"
              required />
          </Field>

          <Field>
            {error && <span style={{ color: "red" }}>{error}</span>}
            <Button type="submit" className="hidden md:flex px-6 py-2 rounded-full bg-gradient-to-r from-brand to-brand-light text-white border-0 hover:opacity-90 shadow-lg shadow-brand/20 hover:shadow-brand/40 transition-shadow cursor-pointer" disabled={loading}>
              {loading ? "Loading..." : "Login"}
            </Button>
          </Field>
        </FieldGroup>
      </form>

      <FieldDescription className="px-6 text-center">
        Ao clicar em continuar, concorda com os nossos <a href="#">Termos de Serviço</a>{" "}
        e <a href="#">Política de Privacidade</a>.
      </FieldDescription>
    </div>
  )
}
