"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { registerUser } from "@/services/auth/registerUser";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function RegisterPage({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();               // stop the default page reload
    const formData = new FormData(e.currentTarget);

    // optional client-side validation
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    if (password !== confirmPassword) {
      toast.error("As senhas não coincidem.");
      return;
    }

    try {
      const data = await registerUser(formData);
      if (data) {
        toast.success("Usuário cadastrado com sucesso!");
        // optional: redirect to login or dashboard
        router.push("/signin");
      }
    } catch (error: any) {
      // `error` from registerUser should contain a message
      toast.error(error?.message ?? "Erro ao cadastrar usuário.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "flex flex-col gap-6 max-w-md mx-auto mt-10",
        className
      )}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Criar nova conta</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Preencha os campos abaixo para se registrar
          </p>
        </div>

        <Field>
          <FieldLabel htmlFor="name">Nome completo</FieldLabel>
          <Input
            id="name"
            name="name"
            placeholder="Seu nome completo"
            required
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="username">Nome de usuário</FieldLabel>
          <Input
            id="username"
            name="username"
            placeholder="seu_username"
            required
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="email@exemplo.com"
            required
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="password">Senha</FieldLabel>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Senha"
            required
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="confirmPassword">Confirmar senha</FieldLabel>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirmar senha"
            required
          />
        </Field>

        <Field>
          <Button type="submit" className="w-full">
            Registrar
          </Button>
        </Field>

        <FieldSeparator>Ou continue com</FieldSeparator>

        <Field>
          <Button variant="outline" type="button" className="w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-5 h-5 mr-2"
            >
              <path
                d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                fill="currentColor"
              />
            </svg>
            Registrar com GitHub
          </Button>

          <FieldDescription className="text-center mt-4">
            Já possui uma conta?{" "}
            <a href="/signin" className="underline underline-offset-4">
              Faça login
            </a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}