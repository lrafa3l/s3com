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
import { service } from "@/services/mutation/service"
import dynamic from "next/dynamic"

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false })

export default function ServiceForm() {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState("")
    const [slug, setSlug] = useState("")
    const [isSaving, setIsSaving] = useState(false)

    // Alert dialog state
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

        if (!name.trim() || !description.trim() || !slug.trim()) {
            showAlert("Erro", "Preencha todos os campos obrigatórios.")
            return
        }

        setIsSaving(true)

        try {
            const formData = new FormData()
            formData.append("name", name)
            formData.append("description", description)
            formData.append("image", image)
            formData.append("slug", slug)

            const result = await service(formData)

            showAlert("Sucesso", `Serviço "${result.name}" criado com sucesso!`)

            // Resetar formulário
            setName("")
            setDescription("")
            setImage("")
            setSlug("")
        } catch (error) {
            console.error("Erro ao criar serviço:", error)
            showAlert("Erro", "Ocorreu um erro ao criar o serviço.")
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6 p-6 rounded-lg">
                <div className="space-y-2">
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
                    <Label htmlFor="description">Descrição (Markdown)</Label>
                    <div data-color-mode="light">
                        <MDEditor
                            value={description}
                            onChange={(val) => setDescription(val || "")}
                            preview="edit"
                            height={400}
                            disabled={isSaving}
                        />
                    </div>
                </div>

                    <div className="space-y-2">
                        <Label htmlFor="image">Imagem (URL)</Label>
                        <Input
                            id="image"
                            placeholder="https://exemplo.com/imagem.jpg"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            disabled={isSaving}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="slug">Slug (URL amigável)</Label>
                        <Input
                            id="slug"
                            placeholder="nome-do-serviço"
                            value={slug}
                            onChange={(e) => setSlug(e.target.value)}
                            disabled={isSaving}
                        />
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

            {/* Alert Dialog */}
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
        </>
    )
}
