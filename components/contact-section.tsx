"use client"

import type React from "react"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Clock, Send, CheckCircle } from "lucide-react"
import { useState } from "react"

export function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSuccess(true)
    setIsSubmitting(false)
    setTimeout(() => {
      setFormData({ name: "", email: "", message: "" })
      setIsSuccess(false)
    }, 2000)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <section id="contact" className="relative py-20 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand/5 via-background to-brand-dark/5" />

      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        className="absolute -top-40 -right-40 w-80 h-80 bg-brand/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{ duration: 14, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
        className="absolute -bottom-32 -left-32 w-96 h-96 bg-brand-dark/10 rounded-full blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants}>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-4 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-gradient-to-r from-primary/10 to-primary/20 text-sm font-medium text-primary group hover:border-primary/50 hover:bg-gradient-to-r hover:from-primary/20 hover:to-primary/30 transition-all cursor-pointer shadow-lg glow-effect"
            >
              {/* Animated Glowing Dot */}
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="h-2 w-2 rounded-full bg-gradient-to-r from-brand to-brand-light"
              />

              {/* Button Text */}
              <span className="bg-gradient-to-r from-brand to-brand-light bg-clip-text text-transparent font-semibold">Entre em Contato</span>
            </motion.div>
          </motion.div>
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance"
          >
            Pronto para Conectar?
          </motion.h2>
          <motion.p variants={itemVariants} className="mt-4 text-lg text-muted-foreground text-pretty">
            Fale connosco para conhecer como podemos melhorar a sua conectividade
          </motion.p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2 max-w-5xl mx-auto">
          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-card to-card/50 rounded-3xl p-8 border border-border"
          >
            <h3 className="text-2xl font-bold text-foreground mb-8">Envie-nos uma Mensagem</h3>

            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex flex-col items-center justify-center py-16"
                >
                  <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 0.5 }} className="mb-4">
                    <CheckCircle className="h-16 w-16 text-green-500" />
                  </motion.div>
                  <p className="text-xl font-semibold text-foreground">Mensagem Enviada!</p>
                  <p className="text-muted-foreground mt-2">Entraremos em contato em breve</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <input
                      type="text"
                      name="name"
                      placeholder="Digite seu Nome"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                  >
                    <input
                      type="email"
                      name="email"
                      placeholder="Insira um email válido"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <textarea
                      name="message"
                      placeholder="Escreva sua mensagem aqui..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all resize-none"
                    />
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                  >
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full gap-2 bg-gradient-to-r from-brand to-brand-light text-white border-0 shadow-lg shadow-brand/25 hover:shadow-brand/50 hover:opacity-90 transition-all py-3 text-base font-semibold cursor-pointer"
                    >
                      <Send className="h-4 w-4" />
                      {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
                    </Button>
                  </motion.div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Contact Info Section */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Address */}
            <motion.div
              whileHover={{ y: -5 }}
              className="group rounded-2xl border border-border bg-card p-6 hover:border-brand/30 hover:shadow-lg hover:shadow-brand/10 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br from-brand to-brand-light shadow-lg shadow-brand/25">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-foreground">Localização</h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Rua 28, Bairro Benfica
                    <br />
                    Luanda, Angola
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Phone */}
            <motion.div
              whileHover={{ y: -5 }}
              className="group rounded-2xl border border-border bg-card p-6 hover:border-brand/30 hover:shadow-lg hover:shadow-brand/10 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br from-brand to-brand-light shadow-lg shadow-brand/25">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-foreground">Contacte-nos</h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    +244 924 456 001
                    <br />
                    +244 922 000 123
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Hours */}
            <motion.div
              whileHover={{ y: -5 }}
              className="group rounded-2xl border border-border bg-card p-6 hover:border-brand/30 hover:shadow-lg hover:shadow-brand/10 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br from-brand to-brand-light shadow-lg shadow-brand/25">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-foreground">Horário de Funcionamento</h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Segunda a Sexta: 08:00 – 18:00
                    <br />
                    Sábado, Domingo: Fechado
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
