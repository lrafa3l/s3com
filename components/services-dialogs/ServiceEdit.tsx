"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { updateService } from "@/services/mutation/service"
import dynamic from "next/dynamic"
import { IconPicker } from "../admin/layouts/IconPicker"
import { toast } from "sonner"
import { Service } from "@prisma/client"
import { queryClient } from "@/providers/QueryClientProvider"

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false })

export default function ServiceEdit({ service }: { service: Service }) {
    const [name, setName] = useState(service.name)
    const [description, setDescription] = useState(service.description || "")
    const [icon, setIcon] = useState<string>(service.icon || "Activity")
    const [isSaving, setIsSaving] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!name.trim() || !description.trim() || !icon.trim()) {
            toast.error("Erro", {
                description: "Preencha todos os campos obrigatórios."
            })
            return
        }
        setIsSaving(true)
        try {
            const formData = new FormData()
            formData.append("name", name)
            formData.append("description", description)
            formData.append("icon", icon)
            const result = await updateService(service.id, formData)
            toast.success("Sucesso", {
                description: `Serviço "${result.name}" Atualizado com sucesso!`
            })
            queryClient.invalidateQueries({queryKey: ["services"]})
        } catch (error) {
            console.error("Erro", { description: "Erro ao Atualizar serviço:", error })
            toast.error("Erro", { description: "Ocorreu um erro ao Atualizar o serviço." })
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 py-6">
            <div className="flex flex-col w-full gap-3 sm:flex-row">
                <div className="space-y-2 flex-1">
                    <Label htmlFor="name">Nome do Serviço</Label>
                    <Input
                        id="name"
                        placeholder="Digite o nome do serviço"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={isSaving}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="name">Icon</Label>
                    <IconPicker
                        value={icon as any}
                        onChange={(value) => setIcon(value ?? "Activity")}
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">Descrição (Markdown)</Label>
                <div data-color-mode="light">
                    <MDEditor
                        value={description}
                        onChange={(val) => setDescription(val || "")}
                        preview="edit"
                        height={400}
                    />
                </div>
            </div>

            <Button type="submit" className="w-full" disabled={isSaving}>
                {isSaving ? (
                    <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Atualizando...
                    </>
                ) : (
                    "Atualizar Serviço"
                )}
            </Button>
        </form>
    )
}
