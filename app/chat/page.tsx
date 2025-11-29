"use client"

import React, { Fragment, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useChat } from "@ai-sdk/react"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Conversation, ConversationContent, ConversationScrollButton } from "@/components/ai-elements/conversation"
import { Message, MessageAvatar, MessageContent } from "@/components/ai-elements/message"
import {
  PromptInput,
  PromptInputBody,
  PromptInputModelSelect,
  PromptInputModelSelectContent,
  PromptInputModelSelectItem,
  PromptInputModelSelectTrigger,
  PromptInputModelSelectValue,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
} from "@/components/ai-elements/prompt-input"
import { Actions, Action } from "@/components/ai-elements/actions"
import { Response } from "@/components/ai-elements/response"
import { Source, Sources, SourcesContent, SourcesTrigger } from "@/components/ai-elements/sources"
import { Reasoning, ReasoningContent, ReasoningTrigger } from "@/components/ai-elements/reasoning"
import { CopyIcon, Mic, RefreshCcwIcon, Loader2, AlertCircle, Volume2, User } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"
import SpeechToTextButton from "@/components/setting/SpeechToText"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { ToolDetailView, ToolListItem } from "@/components/tools/config"
import { cn } from "@/lib/utils"
import TTSDialog from "@/components/setting/tts-dialog"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "@/hooks/useAuth"
import { getInitials } from "@/config/uitl1"

// Model list (move to config if you want dynamic loading)
const MODELS = [
  { name: "Gemini", value: "gemini-2.5-flash" },
  { name: "Mistral", value: "magistral-small-2506" },
  { name: "Cohere", value: "command-a-03-2025" },
]

// Types for local clarity
type Part = {
  type: string
  text?: string
  url?: string
  [k: string]: any
}

type ChatMessage = {
  id: string
  role: string
  parts?: Part[]
}

const ChatBotDemo: React.FC = () => {
  const isMobile = useIsMobile()
  const [input, setInput] = useState("")
  const [model, setModel] = useState(MODELS[0].value)
  const [selectedToolId, setSelectedToolId] = useState<string | null>(null)
  const [isToolSheetOpen, setIsToolSheetOpen] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const { user } = useAuth();

  // useChat hook (API endpoint centralizado)
  const { messages, sendMessage, status, regenerate, error } = useChat();

  const [isMultiline, setIsMultiline] = useState(false)

  // Detecta se há quebra de linha
  useEffect(() => {
    setIsMultiline(input.includes("\n"))
  }, [input])

  // Focus na textarea quando a animação mudar
  useEffect(() => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      // Pequeno timeout para garantir que a animação terminou
      const timeoutId = setTimeout(() => {
        textarea.focus();
        // Move o cursor para o final
        const length = textarea.value.length;
        textarea.setSelectionRange(length, length);
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [isMultiline]);

  // Função para focar no final da textarea
  const focusTextarea = useCallback(() => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      textarea.focus();
      const length = textarea.value.length;
      textarea.setSelectionRange(length, length);
    }
  }, []);

  // Convert the incoming messages to a typed array (defensive)
  const typedMessages = useMemo<ChatMessage[]>(() => {
    return (messages || []).map((m: any) => ({ id: m.id, role: m.role, parts: m.parts || [] }))
  }, [messages])

  // Extract tool executions once per render
  const toolExecutions = useMemo(() => {
    const list: Array<{ id: string; messageId: string; partIndex: number; toolName: string; part: Part }> = []
    for (const msg of typedMessages) {
      for (let i = 0; i < (msg.parts || []).length; i++) {
        const part = msg.parts![i]
        if (part && typeof part.type === "string" && part.type.startsWith("tool-")) {
          const toolName = part.type.replace("tool-", "")
          list.push({ id: `${msg.id}-${i}`, messageId: msg.id, partIndex: i, toolName, part })
        }
      }
    }
    return list
  }, [typedMessages])

  // Auto-select the last tool execution when a new tool appears
  useEffect(() => {
    if (toolExecutions.length === 0) {
      setSelectedToolId(null)
      return
    }
    // If user didn't already choose a tool, pick the last one
    if (!selectedToolId) {
      setSelectedToolId(toolExecutions[toolExecutions.length - 1].id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toolExecutions.length])

  const selectedTool = useMemo(() => toolExecutions.find((t) => t.id === selectedToolId) ?? null, [toolExecutions, selectedToolId])

  // Speech-to-text handler
  const handleSpeechResult = useCallback((text: string) => {
    setInput(text)
    // Foca na textarea após o resultado do speech-to-text
    setTimeout(focusTextarea, 100);
  }, [focusTextarea])

  // Form submission (text and optional files)
  const handleSubmit = useCallback(
    async (payload: { text?: string; files?: File[] }) => {
      const text = (payload.text || "").trim()
      const hasText = text.length > 0
      const hasFiles = Array.isArray(payload.files) && payload.files.length > 0
      if (!hasText && !hasFiles) return

      // Compose body for sendMessage
      const body: any = { model, name: user?.name }
      // If you want to support file uploads, adapt this to use FormData in your /api/chat handler
      if (hasFiles) body.files = payload.files

      sendMessage({ text }, { body })
      setInput("")
      // Foca na textarea após o envio
      setTimeout(focusTextarea, 100);
    },
    [model, sendMessage, focusTextarea]
  )

  // Tool selection (desktop + mobile handling)
  const handleToolClick = useCallback((toolId: string) => {
    setSelectedToolId(toolId)
    if (isMobile) setIsToolSheetOpen(true)
  }, [isMobile])

  // Utility: copy text to clipboard with feedback
  const handleCopy = useCallback(async (text?: string) => {
    if (!text) return
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      // fallback: select & prompt (rare in modern browsers)
    }
  }, [])

  return (
    <div className="w-full h-screen bg-sidebar mx-auto relative overflow-hidden">
      <Link href="/" className="absolute flex gap-2 items-center top-3 left-3 cursor-pointer z-50">
        <img src="/logo.png" alt="sara3com" className="w-8 h-8" />
        <h1>Sara3com</h1>
      </Link>
      <ResizablePanelGroup direction="horizontal" className={isMobile ? "pt-10" : ""}>
        <ResizablePanel defaultSize={toolExecutions.length > 0 ? 65 : 100}>
          <div className="flex flex-col h-full">
            <Conversation className="h-full">
              <ConversationContent id="ConversationContent" className="mx-auto sm:max-w-4xl">
                {typedMessages.map((message) => (
                  <div key={message.id} className="mb-4">
                    {/* Sources */}
                    {message.role === "assistant" && (message.parts || []).filter((p) => p.type === "source-url").length > 0 && (
                      <Sources>
                        <SourcesTrigger count={(message.parts || []).filter((p) => p.type === "source-url").length} />
                        {(message.parts || [])
                          .filter((p) => p.type === "source-url")
                          .map((part: any, i: number) => (
                            <SourcesContent key={`${message.id}-source-${i}`}>
                              <Source href={part.url} title={part.url} />
                            </SourcesContent>
                          ))}
                      </Sources>
                    )}

                    {/* Message parts */}
                    {(message.parts || []).map((part: Part, i: number) => {
                      // Plain text
                      if (part.type === "text") {
                        const isLast = i === (message.parts || []).length - 1
                        return (
                          <Fragment key={`${message.id}-${i}`}>
                            <Message from={(message.role as "system" | "user" | "assistant") || "system"}>
                              <MessageContent>
                                <Response>{part.text}</Response>
                              </MessageContent>

                              {message.role === "assistant" ? (
                                // --- Avatar do assistente ---
                                <MessageAvatar
                                  name="assistant"
                                  src="/logo.png"
                                />
                              ) : (
                                // --- Avatar do usuário ---
                                <MessageAvatar
                                  name={user?.name || "Usuário"}
                                  src={user?.image || "https://static.vecteezy.com/system/resources/previews/017/800/528/non_2x/user-simple-flat-icon-illustration-vector.jpg"} // só passa src se houver imagem
                                >
                                  {/* Se não tiver imagem, renderiza as iniciais */}
                                  {!user?.image && (
                                    <div className="flex items-center justify-center bg-gray-300 text-gray-800 font-semibold w-8 h-8 rounded-full">
                                      {user?.name
                                        ?.split(" ")
                                        .map((n) => n[0])
                                        .join("")
                                        .toUpperCase()
                                        .slice(0, 2) || "U"}
                                    </div>
                                  )}
                                </MessageAvatar>
                              )}
                            </Message>

                            {/* Actions only for assistant's last text part */}
                            {message.role === "assistant" && isLast && (
                              <Actions className="mt-2">
                                <Action
                                  variant={'outline'}
                                  className="rounded-full"
                                  size={'icon'}
                                  onClick={() => {
                                    if (message.id) regenerate({ messageId: message.id })
                                    else regenerate()
                                  }}
                                >
                                  <RefreshCcwIcon size={12} />
                                </Action>
                                <Action variant={'outline'} className="rounded-full" size={'icon'} onClick={() => handleCopy(part.text)} label="Copy">
                                  <CopyIcon size={12} />
                                </Action>
                                <TTSDialog value={part.text}>
                                  <Action variant={'outline'} className="rounded-full" size={'icon'} onClick={() => handleCopy(part.text)} label="Copy">
                                    <Volume2 size={12} />
                                  </Action>
                                </TTSDialog>
                              </Actions>
                            )}
                          </Fragment>
                        )
                      }

                      // Reasoning block
                      if (part.type === "reasoning") {
                        const streaming = status === "streaming" && message.id === messages.at(-1)?.id && i === (message.parts || []).length - 1
                        return (
                          <Reasoning key={`${message.id}-${i}`} isStreaming={streaming}>
                            <ReasoningTrigger />
                            <ReasoningContent>{part.text || "Reasoning..."}</ReasoningContent>
                          </Reasoning>
                        )
                      }

                      // Tool output
                      if (typeof part.type === "string" && part.type.startsWith("tool-")) {
                        const toolName = part.type.replace("tool-", "")
                        const toolId = `${message.id}-${i}`
                        return (
                          <ToolListItem
                            key={toolId}
                            setSelectedToolId={setSelectedToolId}
                            toolId={toolId}
                            toolName={toolName}
                            part={part}
                            isSelected={selectedToolId === toolId}
                            onClick={() => handleToolClick(toolId)}
                          />
                        )
                      }

                      // Unknown part type -> ignore
                      return null
                    })}
                  </div>
                ))}

                {/* Error block */}
                {error && (
                  <div className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <div className="flex items-center gap-2 text-red-600">
                      <AlertCircle className="size-4" />
                      <span className="font-medium">Ocorreu um erro:</span>
                    </div>
                    <p className="text-sm text-red-700 dark:text-red-400 mt-1">{error.message || String(error)}</p>
                  </div>
                )}

                {/* Loading status */}
                {status === "submitted" && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Loader2 className="size-4 animate-spin" />
                    <span>Processando...</span>
                  </div>
                )}

              </ConversationContent>
              <ConversationScrollButton />
            </Conversation>

            <AnimatePresence mode="wait">
              <motion.div
                key={isMultiline ? "multi" : "single"} // força animação na troca
                initial={{
                  opacity: 0,
                  y: 20,
                  scale: 0.95,
                  borderRadius: isMultiline ? 9999 : 12,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  borderRadius: isMultiline ? 12 : 9999,
                  transition: {
                    duration: 0.4,
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                  },
                }}
                exit={{
                  opacity: 0,
                  y: 15,
                  scale: 0.98,
                  transition: {
                    duration: 0.25,
                    ease: "easeInOut",
                  },
                }}
                className={cn(
                  "px-4",
                  typedMessages.length === 0 &&
                  "absolute top-0 m-auto w-full h-full flex flex-col justify-center items-center ",
                  isMultiline ? "py-2" : ""
                )}
              >

                {typedMessages.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-4 gap-2 select-none">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.97 }}
                      className="flex items-center gap-2 cursor-pointer z-50"
                    >
                      <img
                        src="/logo.png"
                        alt="Sara3com"
                        className="w-9 h-9 rounded-full shadow-sm"
                      />
                      <h1 className="text-3xl tracking-tight">Sara3com</h1>
                    </motion.div>
                    <h2 className="text-  xl text-center">
                      Suporte rápido, eficiente e disponível 24h com a nossa assistente virtual
                    </h2>
                  </div>
                )}

                <PromptInput
                  className={cn(
                    "mx-auto sm:max-w-4xl mb-4 bg-sidebar/20 px-2 transition-all",
                    isMultiline ? "rounded-xl py-2" : "rounded-full"
                  )}
                  onSubmit={(m) => handleSubmit(m as any)}
                  globalDrop
                  multiple
                >
                  {/* Aparece quando o input tem múltiplas linhas */}
                  {isMultiline && (
                    <PromptInputBody className="border-none flex w-full">
                      <PromptInputTextarea
                        ref={textareaRef}
                        onChange={(e: any) => setInput(e.target.value)}
                        value={input}
                        className="text-left"
                        placeholder="Digite sua pergunta..."
                        onBlur={focusTextarea} // Re-foca se perder o foco
                      />
                    </PromptInputBody>
                  )}

                  <PromptInputToolbar>
                    <div className="flex flex-1 items-center gap-4">
                      <SpeechToTextButton
                        onResult={handleSpeechResult}
                        variant="outline"
                        className="rounded-full"
                        size="icon"
                      >
                        <Mic size={16} className="text-muted-foreground" />
                      </SpeechToTextButton>

                      {/* Só aparece se NÃO tiver quebra de linha */}
                      {!isMultiline && (
                        <PromptInputBody className="border-none flex w-full">
                          <PromptInputTextarea
                            ref={textareaRef}
                            onChange={(e: any) => setInput(e.target.value)}
                            value={input}
                            className="text-left"
                            placeholder="Digite sua pergunta..."
                            onBlur={focusTextarea} // Re-foca se perder o foco
                          />
                        </PromptInputBody>
                      )}
                    </div>

                    <div className="flex gap-2 items-center">
                      <div
                        className={isMobile ? "absolute top-3 right-3" : ""}
                      >
                        <PromptInputModelSelect onValueChange={setModel} value={model}>
                          <PromptInputModelSelectTrigger>
                            <PromptInputModelSelectValue />
                          </PromptInputModelSelectTrigger>
                          <PromptInputModelSelectContent>
                            {MODELS.map((m) => (
                              <PromptInputModelSelectItem key={m.value} value={m.value}>
                                {m.name}
                              </PromptInputModelSelectItem>
                            ))}
                          </PromptInputModelSelectContent>
                        </PromptInputModelSelect>
                      </div>

                      <PromptInputSubmit
                        variant="outline"
                        className="rounded-full"
                        disabled={!input && status !== "streaming"}
                        status={status}
                      />
                    </div>
                  </PromptInputToolbar>
                </PromptInput>
                {typedMessages.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-6 gap-4 select-none">
                    {/* Cabeçalho */}
                    <div>
                      {/* Perguntas Frequentes */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-6 w-full max-w-4xl px-4">
                        {[
                          "Como posso falar com um atendente humano?",
                          "Quais serviços a Sara3com oferece?",
                          "Como acompanhar o status do meu pedido?",
                          "Posso atualizar meus dados de conta?",
                          "O atendimento funciona 24 horas?",
                          "Como recuperar minha senha?",
                        ].map((question, i) => (
                          <motion.div
                            key={i}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            className="p-4 rounded-md border bg-sidebar shadow-sm hover:shadow-md cursor-pointer transition-colors"
                            onClick={() => handleSubmit({ text: question })} // envia pergunta ao chat
                          >
                            <p className="text-sm text-left font-medium">{question}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

              </motion.div>
            </AnimatePresence>
          </div>
        </ResizablePanel>

        {/* Tools panel for desktop */}
        {toolExecutions.length > 0 && !isMobile && (
          <>
            <ResizableHandle />
            <ResizablePanel defaultSize={35} minSize={25} maxSize={50}>
              <ScrollArea>
                {selectedTool ? (
                  <ToolDetailView part={selectedTool.part} toolName={selectedTool.toolName} />
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    <p className="text-sm">Selecione uma ferramenta para ver os detalhes</p>
                  </div>
                )}
              </ScrollArea>
            </ResizablePanel>
          </>
        )}
      </ResizablePanelGroup>

      {/* Tools sheet for mobile */}
      {isMobile && toolExecutions.length > 0 && (
        <Sheet open={isToolSheetOpen} onOpenChange={setIsToolSheetOpen}>
          <SheetContent side="left" className="w-[85vw] sm:w-[400px] p-0">
            <div className="h-full flex flex-col">
              <div className="flex-1 overflow-hidden flex flex-col">
                <div className="p-3 border-b">
                  <h3 className="text-sm font-semibold">Detalhes</h3>
                </div>
                <ScrollArea className="flex-1 p-3">
                  {selectedTool ? (
                    <ToolDetailView part={selectedTool.part} toolName={selectedTool.toolName} />
                  ) : (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                      <p className="text-sm">Selecione uma ferramenta</p>
                    </div>
                  )}
                </ScrollArea>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      )}
    </div>
  )
}

export default ChatBotDemo