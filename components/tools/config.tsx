'use client'

import { Card, CardContent } from "../ui/card"
import { ScrollArea } from "../ui/scroll-area"
import { AlertCircle, AudioLines, CheckCircle2, Chrome, Database, Loader2, MousePointerClick, QrCode, ScanLine } from "lucide-react"
import { useEffect, ReactNode } from "react"
import { QrCodeView } from "./components/qrcodeGenerate"
import { QueryDbView } from "./components/queryDb"
import { TTSView } from "./components/tts"
import { cn } from "@/lib/utils"

// ---------------------------------------------------------
// 🔧 Configuração centralizada de ferramentas
// ---------------------------------------------------------
const TOOLS = {
    queryDb: {
        label: "Consulta ao Banco de Dados",
        icon: <Database className="size-4" />,
        view: QueryDbView
    },
    qrcodeGenerate: {
        label: "Canvas gerador de Qrcode",
        icon: <QrCode className="size-4" />,
        view: QrCodeView
    },
    tts: {
        label: "Voice Maker",
        icon: <AudioLines className="size-4" />,
        view: TTSView
    }
} as const

const loadingMessages: Record<string, string> = {
    loading: "Carregando dados...",
    processing: `Processando dados...`,
    querying: `Consultando banco...`,
    generating: `Gerando saída...`,
}

const getTool = (name: string) =>
    TOOLS[name as keyof typeof TOOLS] ?? {
        label: name,
        icon: <AlertCircle className="size-4" />,
        view: () => <p>Ferramenta desconhecida: {name}</p>
    }


// ---------------------------------------------------------
// 🔹 Item da lista lateral
// ---------------------------------------------------------
export const ToolListItem = ({
    toolName,
    part,
    setSelectedToolId,
    toolId,
    isSelected,
    onClick
}: {
    toolName: string
    part: any
    setSelectedToolId: (id: string) => void
    toolId: string
    isSelected: boolean
    onClick: () => void
}) => {
    useEffect(() => {
        setSelectedToolId(toolId)
    }, [toolId, setSelectedToolId])

    const { icon, label } = getTool(toolName)

    const stateColors: Record<string, string> = {
        "output-error": "text-red-600",
        "output-available": "text-green-600",
    }

    const isProcessing = ["loading", "processing", "generating", "querying"].includes(part.output?.state)

    return (
        <button
            onClick={onClick}
            className={cn(
                "w-full text-left p-3 rounded-lg cursor-pointer border-2 transition-all hover:bg-accent",
                isSelected ? "bg-accent border-orange-400" : "bg-card border-border"
            )}
        >
            <div className="flex items-center gap-2 mb-1">
                {icon}
                <span className="text-sm font-medium flex-1 truncate">{label}</span>

                {part.state === "output-available" && !isProcessing && (
                    <CheckCircle2 className="size-3 text-green-600 shrink-0" />
                )}
                {(part.state.startsWith("input") || isProcessing) && (
                    <Loader2 className="size-3 animate-spin text-blue-600 shrink-0" />
                )}
                {part.state === "output-error" && <AlertCircle className="size-3 text-red-600 shrink-0" />}
            </div>

            <p className={cn("text-xs", stateColors[part.state] ?? "text-blue-600")}>
                {part.state.replace("-", " ")}
            </p>
        </button>
    )
}

// ---------------------------------------------------------
// 🔹 Cartão de execução
// ---------------------------------------------------------
export const ToolExecutionCard = ({
    part,
    toolName,
    onClick,
    isClickable = false
}: {
    part: any
    toolName: string
    onClick?: () => void
    isClickable?: boolean
}) => {
    const ToolView = getTool(toolName).view

    const renderToolState = (): ReactNode => {
        switch (part.state) {
            case "input-streaming":
                return (
                    <StateBlock
                        icon={<Loader2 className="size-4 animate-spin" />}
                        title="Recebendo parâmetros..."
                        data={part.input}
                    />
                )

            case "input-available":
                return (
                    <StateBlock
                        icon={<Loader2 className="size-4 animate-spin text-blue-600" />}
                        title="Executando..."
                        data={part.input}
                    />
                )

            case "output-available":
                if (loadingMessages[part.output?.state]) {
                    return (
                        <StateBlock
                            icon={<Loader2 className="size-4 animate-spin text-blue-600" />}
                            title={loadingMessages[part.output.state]}
                            description={part.output.description}
                        />
                    )
                }
                return <ToolView output={part.output} />

            case "output-error":
                return (
                    <ErrorBlock message={part.errorText || "Erro desconhecido"} />
                )

            default:
                return <div className="text-xs text-muted-foreground">Estado desconhecido: {part.state}</div>
        }
    }

    return (
        <Card
            className={cn(
                "rounded-none bg- h-full border-none p-0",
                isClickable && "cursor-pointer hover:border-none transition-colors"
            )}
            onClick={isClickable ? onClick : undefined}
        >
            <CardContent className="p-0">
                <ScrollArea className="h-full">{renderToolState()}</ScrollArea>
            </CardContent>
        </Card>
    )
}

// ---------------------------------------------------------
// 🔹 Componentes auxiliares reutilizáveis
// ---------------------------------------------------------
const StateBlock = ({
    icon,
    title,
    description,
    data
}: {
    icon: ReactNode
    title: string
    description?: string
    data?: any
}) => (
    <div className="space-y-2">
        <div className="flex items-center gap-2 text-muted-foreground">
            {icon}
            <span className="text-sm font-medium">{title}</span>
        </div>
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
        {data && (
            <pre className="text-xs bg-muted p-2 rounded overflow-x-auto">
                {JSON.stringify(data, null, 2)}
            </pre>
        )}
    </div>
)

const ErrorBlock = ({ message }: { message: string }) => (
    <div className="space-y-2">
        <div className="flex items-center gap-2 text-red-600">
            <AlertCircle className="size-4" />
            <span className="text-sm font-medium">Erro na execução</span>
        </div>
        <div className="text-xs bg-red-50 dark:bg-red-950/20 p-3 rounded border border-red-200 dark:border-red-800">
            <p className="text-red-700 dark:text-red-400">{message}</p>
        </div>
    </div>
)

// ---------------------------------------------------------
// 🔹 Detalhe de execução
// ---------------------------------------------------------
export const ToolDetailView = ({ part, toolName }: { part: any; toolName: string }) => (
    <div className="h-full">
        <ToolExecutionCard part={part} toolName={toolName} />
    </div>
)
