"use client"

import { Fragment, useState } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { motion } from "framer-motion"
import { MessageCircle, Send, X, Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation"

import {
  Message,
  MessageAvatar,
  MessageContent,
} from "@/components/ai-elements/message"
import { Response } from "./ai-elements/response"

export function FloatingChatButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState("")

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
  })

  return (
    <>
      {/* Botão */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 z-50 p-4 rounded-full bg-gradient-to-r from-brand to-brand-light text-white shadow-lg"
      >
        {isOpen ? <X /> : <MessageCircle />}
      </motion.button>

      {/* Chat */}
      <div
        className={cn(
          "fixed bottom-24 right-8 z-50 w-100 rounded-lg shadow-2xl bg-card border border-border overflow-hidden",
          !isOpen && "hidden"
        )}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-brand to-brand-light p-4 text-white">
          <h3 className="font-semibold">Sara AI Assistant</h3>
          <p className="text-sm opacity-90">Como posso ajudar?</p>
        </div>

        {/* Conversation */}
        <Conversation className="h-120">
          <ConversationContent>

            {/* Mensagem inicial */}
            {messages.length === 0 && (
              <Message from="assistant">
                <MessageContent>
                  Bem-vindo! Posso ajudar com internet dedicada, VoIP, VPN ou suporte técnico.
                </MessageContent>
              </Message>
            )}

            {/* Mensagens */}
            {messages.map((message, i) => (
              <Fragment key={`${message.id}-${i}`}>
                <Message key={message.id} from={message.role}>

                  <MessageContent>
                    {message.parts.map((part, i) =>
                      part.type === "text" ? (
                        <Response>{part.text}</Response>
                      ) : null
                    )}
                  </MessageContent>
                </Message>
              </Fragment>
            ))}

            {/* Loading status */}
            {status === "submitted" && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="size-4 animate-spin" />
              </div>
            )}

          </ConversationContent>

          <ConversationScrollButton />
        </Conversation>

        {/* Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault()
            if (!input.trim()) return

            const body = {
              model: "gemini-2.5-flash",
              name: "visitante",
            }

            sendMessage({ text: input }, { body })
            setInput("")
          }}
          className="border-t p-3 flex gap-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={status !== "ready"}
            placeholder="Digite sua mensagem..."
            className="flex-1 px-3 py-2 text-sm rounded-lg border bg-background"
          />

          <button
            type="submit"
            disabled={status !== "ready"}
            className="bg-brand text-white px-3 py-2 rounded-lg"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </>
  )
}