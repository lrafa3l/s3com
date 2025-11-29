"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { FormEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserByID } from "@/services/auth/getUsers";
import { useAuth } from "@/hooks/useAuth";
import Loading from "../layouts/loading";
import { queryClient } from "@/providers/QueryClientProvider";
import { UpdateUser } from "@/services/auth/registerUser";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


export default function User({ className }: { className?: string }) {
  const { user } = useAuth();

  const { data, isPending, error } = useQuery({
    queryKey: ['userinfo'],
    queryFn: () => getUserByID(user?.id || "")
  })

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const old_password = formData.get("old_password") as string;
    if (!old_password) {
      toast.error("Informe a senha antiga");
      return;
    }
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    if (password !== confirmPassword) {
      toast.error("As senhas não coincidem.");
      return;
    }
    try {
      await UpdateUser({
        id: data?.id || "",
        formData,
      })
      toast.success("Atualizado", {
        description: `informações atulizadas com sucesso`
      })
      queryClient.invalidateQueries({ queryKey: ['userinfo'] })
      queryClient.invalidateQueries({ queryKey: ["user", data?.id] })
    } catch (error: any) {
      toast.error(error?.message ?? "Erro ao autualizar dados do usuário.");
    }
  };

  if (isPending) return <Loading />

  if (error) {
    return <p className="text-center text-destructive">Erro ao carregar assinantes: {(error as Error).message}</p>
  }

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="bg-sidebar">
        <form
          onSubmit={handleSubmit}
          className={cn(
            "flex flex-col gap-6 max-w-md mx-auto pt-10",
            className
          )}
        >
          <FieldGroup>
            <div className="flex flex-col items-left gap-1 text-left">
              <h1 className="text-2xl font-bold">Conta - Sara3com</h1>
              <p className="text-muted-foreground text-sm text-balance">
                Dados da sua conta
              </p>
            </div>

            <div className="flex justify-between items-center gap-2">
              <Field>
                <FieldLabel htmlFor="name">Nome completo</FieldLabel>
                <Input
                  id="name"
                  name="name"
                  defaultValue={data?.name || ""}
                  placeholder="Seu nome completo"
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="username">Nome de usuário</FieldLabel>
                <Input
                  id="username"
                  name="username"
                  defaultValue={data?.username || ""}
                  placeholder="seu_username"
                  required
                />
              </Field>
            </div>

            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                defaultValue={data?.email || ""}
                placeholder="email@exemplo.com"
                required
              />
            </Field>

            <FieldSeparator />

            <Field>
              <FieldLabel htmlFor="old_password">Senha</FieldLabel>
              <Input
                id="old_password"
                name="old_password"
                type="password"
                placeholder="* * * * * * * *"
                required
              />
            </Field>

            <FieldSeparator />
            <Accordion
              type="single"
              collapsible
              className="w-full"
            >
              <AccordionItem value="item-1">
                <AccordionTrigger>Atualizar senha de acesso</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                  <Field>
                    <FieldLabel htmlFor="password">Nova Senha</FieldLabel>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Senha"
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="confirmPassword">Confirmar nova senha</FieldLabel>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirmar senha"
                    />
                  </Field>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Field>
              <Button type="submit" className="w-full">
                Salvar
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </div>
    </div >
  )
}
