"use client"

import * as Icons from "lucide-react";
import { motion } from "framer-motion"
import { useQuery } from "@tanstack/react-query"
import { getServiceLeading } from "@/services/get/getService"


export function Features() {

  const { data: features, isLoading, error } = useQuery({
    queryKey: ["services"],
    queryFn: getServiceLeading,
  })

  return (
    <section id="services" className="py-20 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-brand/5 via-transparent to-brand-dark/5" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Dot with animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-4 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-gradient-to-r from-primary/10 to-primary/20 text-sm font-medium text-primary group hover:border-primary/50 hover:bg-gradient-to-r hover:from-primary/20 hover:to-primary/30 transition-all cursor-pointer shadow-lg glow-effect"
            >
              <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="h-2 w-2 rounded-full bg-gradient-to-r from-brand to-brand-light"
              />
              <span className="bg-gradient-to-r from-brand to-brand-light bg-clip-text text-transparent font-semibold">
                Produtos & Serviços
              </span>
            </motion.div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
              Soluções Completas{" "}
              <span className="bg-gradient-to-r from-brand via-brand-light to-brand bg-clip-text text-transparent">
                Inteligentes em Telecomunicações
              </span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              Tecnologia de ponta com IA integrada. O suporte mais rápido, melhor e mais inteligente.
            </p>
          </motion.div>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2  lg:grid-cols-3">
          {features && features.map((feature, index) => {
            const IconComponent = (Icons[feature.icon as keyof typeof Icons] as React.ComponentType<Icons.LucideProps>) || Icons.ImageIcon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative rounded-2xl border border-brand/20 bg-gradient-to-br from-card to-card/50 p-6 transition-all duration-300 hover:border-brand/50 hover:shadow-lg hover:shadow-brand/20 hover:-translate-y-1 hover:glow-effect"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand/5 to-brand-light/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10">
                  <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-brand-light shadow-lg shadow-brand/25">
                    <IconComponent className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{feature.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
