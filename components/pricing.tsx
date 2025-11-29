"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Check } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"

const monthlyPlans = [
  {
    name: "Residencial",
    price: "15.000",
    currency: "AOA",
    period: "mês",
    description: "Ideal para uso doméstico e famílias",
    features: [
      "Internet até 50 Mbps",
      "Instalação gratuita",
      "Router Wi-Fi incluído",
      "Suporte técnico",
      "Sem fidelização",
    ],
    cta: "Subscrever",
    popular: false,
  },
  {
    name: "Empresarial",
    price: "45.000",
    currency: "AOA",
    period: "mês",
    description: "Para pequenas e médias empresas",
    features: [
      "Internet até 200 Mbps",
      "IP fixo dedicado",
      "Suporte prioritário 24/7",
      "SLA garantido 99.9%",
      "Linha telefónica incluída",
      "Firewall básico",
      "Relatórios mensais",
    ],
    cta: "Contactar Vendas",
    popular: true,
  },
  {
    name: "Corporativo",
    price: "Personalizado",
    currency: "",
    period: "consulte-nos",
    description: "Soluções à medida para grandes empresas",
    features: [
      "Internet fibra dedicada",
      "Múltiplos IPs fixos",
      "Gestor de conta dedicado",
      "SLA premium",
      "Central telefónica PABX",
      "Segurança avançada",
      "Data center backup",
    ],
    cta: "Solicitar Proposta",
    popular: false,
  },
]

const yearlyPlans = monthlyPlans.map((plan) => ({
  ...plan,
  price: plan.price === "Personalizado" ? plan.price : String(Math.floor(Number(plan.price) * 12 * 0.9)),
  period: "ano",
  savings: plan.price !== "Personalizado" ? "Economize 10%" : "",
}))

export function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")

  const handlePlanSelection = (planName: string) => {
    setSelectedPlan(planName)
    const contactSection = document.querySelector("#contact")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const plans = billingCycle === "monthly" ? monthlyPlans : yearlyPlans

  return (
    <section id="pricing" className="py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-4 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand/20 bg-gradient-to-r from-brand/10 to-brand/20 text-sm font-medium text-brand group hover:border-brand/50 hover:bg-gradient-to-r hover:from-brand/20 hover:to-brand/30 transition-all cursor-pointer shadow-lg glow-effect"
            >
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="h-2 w-2 rounded-full bg-gradient-to-r from-brand to-brand-light"
              />
              <span className="bg-gradient-to-r from-brand to-brand-light bg-clip-text text-transparent font-semibold">Planos & Preços</span>
            </motion.div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
              Escolha o Plano{" "}
              <span className="bg-gradient-to-r from-brand to-brand-light bg-clip-text text-transparent">Ideal</span>{" "}
              para Si
            </h2>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              Temos planos adaptados às necessidades de cada cliente. Todos incluem instalação gratuita.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-8 inline-flex items-center gap-1 rounded-full bg-card/50 backdrop-blur-md border border-brand/20 p-1 shadow-lg"
          >
            <motion.button
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-2 rounded-full font-medium transition-all ${billingCycle === "monthly"
                  ? "bg-gradient-to-r from-brand to-brand-light text-white shadow-lg shadow-brand/20"
                  : "text-muted-foreground hover:text-foreground"
                }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Mensal
            </motion.button>
            <motion.button
              onClick={() => setBillingCycle("yearly")}
              className={`px-6 py-2 rounded-full font-medium transition-all ${billingCycle === "yearly"
                  ? "bg-gradient-to-r from-brand to-brand-light text-white shadow-lg shadow-brand/20"
                  : "text-muted-foreground hover:text-foreground"
                }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Anual
            </motion.button>
          </motion.div>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className={`relative h-full border-border bg-card/50 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-brand/10 ${plan.popular ? "border-brand ring-2 ring-brand shadow-lg shadow-brand/20" : "hover:border-brand/50"
                  }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center rounded-full bg-gradient-to-r from-brand to-brand-light px-4 py-1 text-xs font-medium text-white shadow-lg">
                      Mais Popular
                    </span>
                  </div>
                )}
                {billingCycle === "yearly" && plan.savings && (
                  <div className="absolute top-4 right-4">
                    <span className="text-xs font-semibold text-brand bg-brand/10 px-2 py-1 rounded-full">
                      {plan.savings}
                    </span>
                  </div>
                )}
                <CardHeader className="pb-4">
                  <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>
                  <div className="mt-2">
                    <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                    {plan.currency && <span className="text-lg text-muted-foreground ml-1">{plan.currency}</span>}
                    <span className="text-muted-foreground">/{plan.period}</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-brand/10">
                          <Check className="h-3 w-3 text-brand" />
                        </div>
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handlePlanSelection(plan.name)}
                  >
                    <Button
                      className={`mt-8 w-full cursor-pointer ${plan.popular
                          ? "bg-gradient-to-r from-brand to-brand-light text-white border-0 hover:opacity-90 shadow-lg shadow-brand/25"
                          : "border-brand/30 hover:bg-brand/10"
                        }`}
                      variant={plan.popular ? "default" : "outline"}
                    >
                      {plan.cta}
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
