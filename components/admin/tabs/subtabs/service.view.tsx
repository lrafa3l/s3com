"use client"

import { useQuery } from "@tanstack/react-query"
import { getService } from "@/services/get/getService"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Calendar, ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import ReactMarkdown from "react-markdown"

interface ServiceViewProps {
  className?: string
}

export default function ServiceView({ className }: ServiceViewProps) {
  const {
    data: services,
    isPending,
    error,
  } = useQuery({
    queryKey: ["services"],
    queryFn: getService,
  })

  if (isPending) {
    return (
      <div className={cn("container mx-auto py-6", className)}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="overflow-hidden max-w-5xl">
              <Skeleton className="h-48 w-full" />
              <CardHeader>
                <Skeleton className="h-6 w-3/" />
                <Skeleton className="h-4 w-full mt-2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-20 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={cn("container mx-auto p-6", className)}>
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Erro ao carregar serviços</CardTitle>
            <CardDescription>Ocorreu um erro ao buscar os serviços. Tente novamente mais tarde.</CardDescription>
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

  return (
    <div className={cn("container m-auto max-w-5xl  p-6", className)}>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <Card
            key={service.id}
            className="overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
          >
            {service.image ? (
              <div className="relative h-48 w-full overflow-hidden bg-muted">
                <img
                  src={service.image || "/placeholder.svg"}
                  alt={service.name}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            ) : (
              <div className="h-48 w-full bg-muted flex items-center justify-center">
                <ImageIcon className="h-12 w-12 text-muted-foreground" />
              </div>
            )}

            <CardHeader>
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-xl text-balance">{service.name}</CardTitle>
                <Badge variant="secondary" className="shrink-0">
                  {service.slug}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="flex-1">
              <div className="prose prose-sm max-w-none line-clamp-3">
                <ReactMarkdown>{service.description}</ReactMarkdown>
              </div>
            </CardContent>

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
        ))}
      </div>
    </div>
  )
}
