"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
} from "@/components/ui/alert-dialog"
import { createService } from "@/services/mutation/service"
import dynamic from "next/dynamic"
import { IconPicker } from "../admin/layouts/IconPicker"

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false })

export default function ServiceForm() {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [icon, setIcon] = useState<string>("Activity")
    const [isSaving, setIsSaving] = useState(false)

    const [alertOpen, setAlertOpen] = useState(false)
    const [alertMessage, setAlertMessage] = useState("")
    const [alertTitle, setAlertTitle] = useState("")

    const showAlert = (title: string, message: string) => {
        setAlertTitle(title)
        setAlertMessage(message)
        setAlertOpen(true)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!name.trim() || !description.trim() || !icon.trim()) {
            showAlert("Erro", "Preencha todos os campos obrigatórios.")
            return
        }

        setIsSaving(true)

        try {
            const formData = new FormData()
            formData.append("name", name)
            formData.append("description", description)
            formData.append("icon", icon)

            const result = await createService(formData)

            showAlert("Sucesso", `Serviço "${result.name}" criado com sucesso!`)

            setName("")
            setDescription("")
        } catch (error) {
            console.error("Erro ao criar serviço:", error)
            showAlert("Erro", "Ocorreu um erro ao criar o serviço.")
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <div className="bg-sidebar min-h-[calc(100vh-70px)] h-auto">
            <div className="border-b h-[90px]">
                <div className="m-auto max-w-5xl py-4 flex justify-between items-center">
                    <h1 className="text-5xl">Serviço</h1>
                    <div>

                    </div>
                </div>
            </div>
            <form onSubmit={handleSubmit} className="max-w-5xl bg-sidebar mx-auto space-y-6 py-6 rounded-lg">
                <div className="flex flex-col gap-3 sm:flex-row">
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

                <Button type="submit" disabled={isSaving}>
                    {isSaving ? (
                        <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Salvando...
                        </>
                    ) : (
                        "Criar Serviço"
                    )}
                </Button>
            </form>

            <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{alertTitle}</AlertDialogTitle>
                        <AlertDialogDescription>{alertMessage}</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <Button onClick={() => setAlertOpen(false)}>Fechar</Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
