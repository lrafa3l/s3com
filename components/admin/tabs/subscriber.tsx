"use client"

import { getSubscriber } from "@/services/get/getSubscriber"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Trash2, Send, Search } from "lucide-react"
import { deleteSubscribersByIDs } from "@/services/mutation/subscriber"
import { toast } from "sonner"
import Compositor from "@/components/services-dialogs/Compositor"
import Loading from "../layouts/loading"

export default function Subscriber({ className }: { className?: string }) {
    const queryClient = useQueryClient()

    const [selectedEmails, setSelectedEmails] = useState<string[]>([])
    const [filterText, setFilterText] = useState("")
    const [isCompositorOpen, setIsCompositorOpen] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    const { data, error, isPending } = useQuery({
        queryKey: ["Subscribers"],
        queryFn: () => getSubscriber(),
    })

    const filteredData = useMemo(() => {
        if (!data) return []
        if (!filterText.trim()) return data

        return data.filter((subscriber) => subscriber.email.toLowerCase().includes(filterText.toLowerCase()))
    }, [data, filterText])

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedEmails(filteredData.map((s) => s.email))
        } else {
            setSelectedEmails([])
        }
    }

    const handleSelectEmail = (email: string, checked: boolean) => {
        if (checked) {
            setSelectedEmails((prev) => [...prev, email])
        } else {
            setSelectedEmails((prev) => prev.filter((e) => e !== email))
        }
    }

    const isAllSelected = filteredData.length > 0 && selectedEmails.length === filteredData.length
    const isSomeSelected = selectedEmails.length > 0 && selectedEmails.length < filteredData.length

    const handleDelete = async () => {
        if (selectedEmails.length === 0) return

        const selectedIds = data?.filter((s) => selectedEmails.includes(s.email)).map((s) => s.id) || []

        if (selectedIds.length === 0) return

        setIsDeleting(true)

        try {
            const result = await deleteSubscribersByIDs(selectedIds)

            if (result.success) {
                toast.info('Sucesso', {
                    description: result.message,
                })

                setSelectedEmails([])

                queryClient.invalidateQueries({ queryKey: ["Subscribers"] })
            } else {
                toast.error('Erro', {
                    description: result.message,
                })
            }
        } catch (error) {
            toast.error('Erro', {
                description: "Erro ao deletar assinantes"
            })
            console.error("[v0] Delete error:", error)
        } finally {
            setIsDeleting(false)
        }
    }

    const handleSend = () => {
        if (selectedEmails.length === 0) return
        setIsCompositorOpen(true)
    }

    if (isPending) return <Loading />

    if (error) {
        return <p className="text-center text-destructive">Erro ao carregar assinantes: {(error as Error).message}</p>
    }

    return (
        <div className={`space-y-6 ${className}`}>
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Assinantes</h1>

                {selectedEmails.length > 0 && (
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{selectedEmails.length} selecionado(s)</span>
                        <Button variant="destructive" size="sm" onClick={handleDelete} disabled={isDeleting}>
                            <Trash2 className="h-4 w-4 mr-2" />
                            {isDeleting ? "Deletando..." : "Deletar"}
                        </Button>
                        <Button variant="default" size="sm" onClick={handleSend}>
                            <Send className="h-4 w-4 mr-2" />
                            Enviar
                        </Button>
                    </div>
                )}
            </div>

            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Filtrar por email..."
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                    className="pl-9"
                />
            </div>

            {filteredData && filteredData.length > 0 ? (
                <div className="border border-border rounded-lg overflow-hidden">
                    <table className="min-w-full">
                        <thead className="bg-muted">
                            <tr>
                                <th className="px-4 py-3 text-left w-12">
                                    <Checkbox
                                        checked={isAllSelected}
                                        onCheckedChange={handleSelectAll}
                                        aria-label="Selecionar todos"
                                        className={isSomeSelected ? "data-[state=checked]:bg-primary" : ""}
                                    />
                                </th>
                                <th className="px-4 py-3 text-left text-sm font-medium">Email</th>
                                <th className="px-4 py-3 text-left text-sm font-medium">Criado em</th>
                                <th className="px-4 py-3 text-left text-sm font-medium">Atualizado em</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {filteredData.map((subscriber) => (
                                <tr key={subscriber.id} className="hover:bg-muted/50 transition-colors">
                                    <td className="px-4 py-3">
                                        <Checkbox
                                            checked={selectedEmails.includes(subscriber.email)}
                                            onCheckedChange={(checked) => handleSelectEmail(subscriber.email, checked as boolean)}
                                            aria-label={`Selecionar ${subscriber.email}`}
                                        />
                                    </td>
                                    <td className="px-4 py-3 text-sm">{subscriber.email}</td>
                                    <td className="px-4 py-3 text-sm text-muted-foreground">
                                        {new Date(subscriber.createdAt).toLocaleString("pt-BR")}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-muted-foreground">
                                        {new Date(subscriber.updatedAt).toLocaleString("pt-BR")}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-muted-foreground text-center py-8">
                    {filterText ? "Nenhum assinante encontrado com esse filtro." : "Nenhum assinante encontrado."}
                </p>
            )}

            <Compositor open={isCompositorOpen} onOpenChange={setIsCompositorOpen} emails={selectedEmails} />
        </div>
    )
}
