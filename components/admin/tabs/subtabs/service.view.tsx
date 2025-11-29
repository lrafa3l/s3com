"use client"

import { useQuery } from "@tanstack/react-query"
import { getService } from "@/services/get/getService"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Calendar, ImageIcon, LucideProps } from "lucide-react"
import { cn } from "@/lib/utils"
import ReactMarkdown from "react-markdown"
import Loading from "../../layouts/loading"
import * as Icons from "lucide-react";
import { deleteService } from "@/services/mutation/service"
import { queryClient } from "@/providers/QueryClientProvider"
import { toast } from "sonner"
import ServiceEdit from "@/components/services-dialogs/ServiceEdit"

interface ServiceViewProps {
  className?: string
}

export default function ServiceView({ className }: ServiceViewProps) {
  const { data: services, isLoading, error } = useQuery({
    queryKey: ["services"],
    queryFn: getService,
  })

  if (isLoading) return <Loading />

  if (error) {
    return (
      <div className={cn("container mx-auto p-6", className)}>
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Erro ao carregar serviços</CardTitle>
            <CardDescription>
              Ocorreu um erro ao buscar os serviços. Tente novamente mais tarde.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  if (!services || services.length === 0) {
    return (
      <div className={cn("container mx-auto p-6", className)}>
        <Card>
          <CardHeader>
            <CardTitle>Nenhum serviço encontrado</CardTitle>
            <CardDescription>
              Não há serviços cadastrados no momento. Crie um novo serviço para começar.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  const handlerDelete = async (id: string, name: string) => {
    toast.info(`Deletando ${name}`)
    try {
      const service = await deleteService(id);
      if (service.id) {
        queryClient.invalidateQueries({ queryKey: ["services"] })
        toast.success(`${service.name} deletado com sucesso`);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  return (
    <div className={cn("container m-auto max-w-5xl", className)}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => {
          const IconComponent = (Icons[service.icon as keyof typeof Icons] as React.ComponentType<LucideProps>) || ImageIcon;

          return (
            <Card
              key={service.id}
              className="relative overflow-hidden hover:shadow-lg =-2 transition-shadow duration-300 flex flex-col min-h-[250px]"
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-1">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <CardTitle className="text-xl text-balance cursor-pointer hover:text-primary">{service.name}</CardTitle>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Editar Dados do Serviço</AlertDialogTitle>
                        <AlertDialogDescription />
                      </AlertDialogHeader>
                      <ServiceEdit service={service} />
                      <AlertDialogFooter>
                        <AlertDialogCancel className="w-full">Fechar Modal</AlertDialogCancel>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  <div className="bg-primary p-1 rounded-sm">
                    <IconComponent size={23} />
                  </div>
                </div>
              </CardHeader>

              <CardContent className="flex-1 overflow-hidden">
                <div className="prose prose-sm max-w-none line-clamp-3">
                  <ReactMarkdown>{service.description}</ReactMarkdown>
                </div>
              </CardContent>

              <AlertDialog>
                <AlertDialogTrigger asChild className="absolute bottom-1 right-1">
                  <Button variant="outline">
                    <Icons.Trash2 />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete this
                      service and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handlerDelete(service.id, service.name)}>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <CardFooter className="text-sm text-muted-foreground flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>
                  {new Date(service.createdAt).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
