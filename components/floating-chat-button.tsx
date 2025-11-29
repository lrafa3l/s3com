"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { MessageCircle, Send, X } from "lucide-react"
import { useState } from "react"

export function FloatingChatButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 z-50 p-4 rounded-full bg-gradient-to-r from-brand to-brand-light text-white shadow-lg hover:shadow-2xl transition-shadow"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          boxShadow: [
            "0 0 20px rgba(107, 114, 255, 0.4)",
            "0 0 40px rgba(107, 114, 255, 0.6)",
            "0 0 20px rgba(107, 114, 255, 0.4)",
          ],
        }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </motion.button>

      <motion.div
        animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 20, pointerEvents: isOpen ? "auto" : "none" }}
        transition={{ duration: 0.3 }}
        className={cn(
          "fixed bottom-24 right-8 z-50 w-80 max-w-sm",
          "rounded-lg bg-card/95 backdrop-blur-lg border border-brand/20 shadow-2xl overflow-hidden",
          `opacity-${isOpen ? 1 : 0}`
        )}
      >
        <div className="bg-gradient-to-r from-brand to-brand-light p-4 text-white">
          <h3 className="font-semibold text-lg">Sara AI Assistant</h3>
          <p className="text-sm opacity-90">Olá! Como posso ajudar?</p>
        </div>

        <div className="p-4 space-y-3 h-80 overflow-y-auto">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-start gap-2">
            <div className="h-8 w-8 rounded-full bg-brand/20 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-bold text-brand">SA</span>
            </div>
            <div className="bg-background/50 rounded-lg p-3 text-sm text-foreground max-w-xs">
              Bem-vindo! Estou aqui para ajudar com informações sobre nossos planos, serviços e muito mais.
            </div>
          </motion.div>
        </div>

        <div className="border-t border-border p-3 flex gap-2">
          <input
            type="text"
            placeholder="Digite sua mensagem..."
            className="flex-1 bg-background/50 rounded-lg px-3 py-2 text-sm border border-border/50 focus:outline-none focus:border-brand"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-brand to-brand-light text-white px-4 py-2 rounded-lg text-sm font-medium"
          >
            <Send size={19} />
          </motion.button>
        </div>
      </motion.div>
    </>
  )
}
