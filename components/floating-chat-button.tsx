"use client"

import { Fragment, useState, useEffect } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, Send, X, ArrowUpRight, MessagesSquare } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { cn } from "@/lib/utils"

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation"

import {
  Message,
  MessageContent,
} from "@/components/ai-elements/message"
import { Response } from "./ai-elements/response"

// Backdrop component for mobile overlay
function Backdrop({ onClick }: { onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className="fixed inset-0 bg-black/40 z-40 md:hidden"
      aria-label="Close chat"
    />
  )
}

// Drag handle for mobile bottom sheet
function DragHandle() {
  return (
    <div className="w-10 h-1 bg-muted-foreground/30 rounded-full mx-auto mt-2 mb-1 md:hidden" />
  )
}

// "Open full chat" link bar component
function OpenFullChatLink({
  onClick,
  delay = 0
}: {
  onClick: () => void
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.2, ease: "easeOut" }}
    >
      <Link
        href="/chat"
        onClick={onClick}
        className="flex items-center justify-between w-full px-4 py-3 md:py-2.5 bg-muted/50 hover:bg-muted/80 transition-colors group"
      >
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MessagesSquare className="h-4 w-4" />
          <span>Continuar no chat completo</span>
        </div>
        <ArrowUpRight
          className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-hover:translate-x-1"
        />
      </Link>
    </motion.div>
  )
}

export function FloatingChatButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState("")
  const router = useRouter()

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
  })

  // Prevent body scroll when mobile sheet is open
  useEffect(() => {
    if (isOpen) {
      // Only apply on mobile (check viewport width)
      const isMobile = window.innerWidth < 768
      if (isMobile) {
        document.body.style.overflow = "hidden"
      }
    } else {
      document.body.style.overflow = ""
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const handleOpenFullChat = () => {
    setIsOpen(false)
    router.push("/chat")
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  // Desktop panel animation variants
  const desktopPanelVariants = {
    hidden: {
      opacity: 0,
      y: 16,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: [0.34, 1.56, 0.64, 1],
      },
    },
    exit: {
      opacity: 0,
      y: 8,
      scale: 0.98,
      transition: {
        duration: 0.2,
        ease: "easeIn",
      },
    },
  }

  // Mobile bottom sheet animation variants
  const mobileSheetVariants = {
    hidden: {
      y: "100%",
    },
    visible: {
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.34, 1.56, 0.64, 1],
      },
    },
    exit: {
      y: "100%",
      transition: {
        duration: 0.25,
        ease: "easeIn",
      },
    },
  }

  return (
    <>
      {/* Main toggle button - hidden on mobile when sheet is open */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-8 right-8 z-50 p-4 rounded-full bg-gradient-to-r from-brand to-brand-light text-white shadow-lg hover:shadow-xl hover:shadow-brand/25 transition-all",
          // Hide on mobile when open
          isOpen && "md:opacity-100 md:pointer-events-auto opacity-0 pointer-events-none"
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Mobile backdrop */}
            <Backdrop onClick={handleClose} />

            {/* Mobile bottom sheet */}
            <motion.div
              variants={mobileSheetVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={cn(
                // Mobile: bottom sheet
                "fixed bottom-0 left-0 right-0 z-50 bg-card rounded-t-2xl shadow-2xl md:hidden",
                "h-[60vh]",
                // Safe area padding for iOS home indicator
                "pb-[env(safe-area-inset-bottom)]"
              )}
            >
              {/* Drag handle */}
              <DragHandle />

              {/* Header with close button */}
              <div className="bg-gradient-to-r from-brand to-brand-light px-4 py-3 text-white flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Sara AI Assistant</h3>
                  <p className="text-sm opacity-90">Como posso ajudar?</p>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 rounded-full hover:bg-white/20 transition-colors"
                  aria-label="Close chat"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* "Open full chat" link */}
              <OpenFullChatLink onClick={handleOpenFullChat} delay={0.05} />

              {/* Conversation area */}
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.2 }}
                className="flex-1 overflow-hidden"
                style={{ height: "calc(60vh - 180px)" }}
              >
                <Conversation className="h-full">
                  <ConversationContent>
                    {messages.length === 0 && (
                      <Message from="assistant">
                        <MessageContent>
                          Bem-vindo! Posso ajudar com internet dedicada, VoIP, VPN ou suporte técnico.
                        </MessageContent>
                      </Message>
                    )}

                    {messages.map((message, i) => (
                      <Fragment key={`${message.id}-${i}`}>
                        <Message key={message.id} from={message.role}>
                          <MessageContent>
                            {message.parts.map((part, partIndex) =>
                              part.type === "text" ? (
                                <Response key={partIndex}>{part.text}</Response>
                              ) : null
                            )}
                          </MessageContent>
                        </Message>
                      </Fragment>
                    ))}

                    {status === "submitted" && (
                      <div className="flex items-center gap-2 text-muted-foreground p-2">
                        <div className="relative" style={{ width: 16, height: 16 }}>
                          <div
                            className="loader-ring-outer absolute rounded-full"
                            style={{ inset: -2, animationDuration: "0.8s" }}
                          />
                          <Image
                            src="/logo.png"
                            width={16}
                            height={16}
                            alt=""
                            className="object-contain"
                            style={{ animation: "logo-spin 1.2s linear infinite" }}
                          />
                        </div>
                        <span className="text-xs">A processar...</span>
                      </div>
                    )}
                  </ConversationContent>

                  <ConversationScrollButton />
                </Conversation>
              </motion.div>

              {/* Input form - with safe area margin */}
              <motion.form
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.2 }}
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
                className="border-t p-3 mb-4 flex gap-2"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={status !== "ready"}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 px-3 py-2 text-sm rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-brand/50"
                />

                <button
                  type="submit"
                  disabled={status !== "ready" || !input.trim()}
                  className={cn(
                    "bg-brand text-white px-3 py-2 rounded-lg transition-all",
                    "hover:bg-brand/90 disabled:opacity-50 disabled:cursor-not-allowed"
                  )}
                >
                  <Send size={18} />
                </button>
              </motion.form>
            </motion.div>

            {/* Desktop floating panel */}
            <motion.div
              variants={desktopPanelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="hidden md:block fixed bottom-24 right-8 z-50 w-[360px] max-w-[calc(100vw-64px)] rounded-lg shadow-2xl bg-card border border-border overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-brand to-brand-light p-4 text-white">
                <h3 className="font-semibold">Sara AI Assistant</h3>
                <p className="text-sm opacity-90">Como posso ajudar?</p>
              </div>

              {/* "Open full chat" link */}
              <OpenFullChatLink onClick={handleOpenFullChat} delay={0.05} />

              {/* Conversation area */}
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.2 }}
              >
                <Conversation className="h-[280px]">
                  <ConversationContent>
                    {messages.length === 0 && (
                      <Message from="assistant">
                        <MessageContent>
                          Bem-vindo! Posso ajudar com internet dedicada, VoIP, VPN ou suporte técnico.
                        </MessageContent>
                      </Message>
                    )}

                    {messages.map((message, i) => (
                      <Fragment key={`desktop-${message.id}-${i}`}>
                        <Message key={message.id} from={message.role}>
                          <MessageContent>
                            {message.parts.map((part, partIndex) =>
                              part.type === "text" ? (
                                <Response key={partIndex}>{part.text}</Response>
                              ) : null
                            )}
                          </MessageContent>
                        </Message>
                      </Fragment>
                    ))}

                    {status === "submitted" && (
                      <div className="flex items-center gap-2 text-muted-foreground p-2">
                        <div className="relative" style={{ width: 16, height: 16 }}>
                          <div
                            className="loader-ring-outer absolute rounded-full"
                            style={{ inset: -2, animationDuration: "0.8s" }}
                          />
                          <Image
                            src="/logo.png"
                            width={16}
                            height={16}
                            alt=""
                            className="object-contain"
                            style={{ animation: "logo-spin 1.2s linear infinite" }}
                          />
                        </div>
                        <span className="text-xs">A processar...</span>
                      </div>
                    )}
                  </ConversationContent>

                  <ConversationScrollButton />
                </Conversation>
              </motion.div>

              {/* Input form */}
              <motion.form
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.2 }}
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
                  className="flex-1 px-3 py-2 text-sm rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-brand/50"
                />

                <button
                  type="submit"
                  disabled={status !== "ready" || !input.trim()}
                  className={cn(
                    "bg-brand text-white px-3 py-2 rounded-lg transition-all",
                    "hover:bg-brand/90 disabled:opacity-50 disabled:cursor-not-allowed"
                  )}
                >
                  <Send size={18} />
                </button>
              </motion.form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
