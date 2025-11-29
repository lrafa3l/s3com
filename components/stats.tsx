"use client"

import { motion } from "framer-motion"

const stats = [
  { value: "10+", label: "Anos de Experiência" },
  { value: "5000+", label: "Clientes Satisfeitos" },
  { value: "99.9%", label: "Uptime Garantido" },
  { value: "24/7", label: "Suporte Técnico" },
]

export function Stats() {
  return (
    <section className="border-y border-border bg-gradient-to-r from-brand/5 via-background to-brand-dark/5">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <p className="text-3xl font-bold sm:text-4xl">
                <span className="bg-gradient-to-r from-brand to-brand-light bg-clip-text text-transparent">
                  {stat.value}
                </span>
              </p>
              <p className="mt-2 text-sm font-medium text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
