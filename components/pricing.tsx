"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Check } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

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

// Animated price component for smooth transitions
function AnimatedPrice({ price, currency, period }: { price: string; currency: string; period: string }) {
  return (
    <div className="mt-2 relative h-12 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={`${price}-${period}`}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <span className="text-4xl font-bold text-foreground">{price}</span>
          {currency && <span className="text-lg text-muted-foreground ml-1">{currency}</span>}
          <span className="text-muted-foreground">/{period}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

// Billing toggle with sliding indicator
function BillingToggle({
  billingCycle,
  setBillingCycle
}: {
  billingCycle: "monthly" | "yearly"
  setBillingCycle: (cycle: "monthly" | "yearly") => void
}) {
  const monthlyRef = useRef<HTMLButtonElement>(null)
  const yearlyRef = useRef<HTMLButtonElement>(null)
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 })

  // Update sliding indicator position when billing cycle changes
  useEffect(() => {
    const activeRef = billingCycle === "monthly" ? monthlyRef : yearlyRef
    if (activeRef.current) {
      const { offsetLeft, offsetWidth } = activeRef.current
      setIndicatorStyle({ left: offsetLeft, width: offsetWidth })
    }
  }, [billingCycle])

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
      className="mt-8 inline-flex items-center gap-1 rounded-full bg-card/50 backdrop-blur-md border border-brand/20 p-1 shadow-lg relative"
    >
      {/* Sliding background indicator */}
      <motion.div
        className="absolute h-[calc(100%-8px)] rounded-full bg-gradient-to-r from-brand to-brand-light shadow-lg shadow-brand/20"
        initial={false}
        animate={{
          left: indicatorStyle.left,
          width: indicatorStyle.width,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30
        }}
      />

      <button
        ref={monthlyRef}
        onClick={() => setBillingCycle("monthly")}
        className={cn(
          "px-6 py-2 rounded-full font-medium transition-colors duration-200 relative z-10",
          billingCycle === "monthly"
            ? "text-white"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        Mensal
      </button>
      <button
        ref={yearlyRef}
        onClick={() => setBillingCycle("yearly")}
        className={cn(
          "px-6 py-2 rounded-full font-medium transition-colors duration-200 relative z-10",
          billingCycle === "yearly"
            ? "text-white"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        Anual
      </button>
    </motion.div>
  )
}

// Pricing card component
function PricingCard({
  plan,
  index,
  billingCycle,
  onSelect
}: {
  plan: typeof monthlyPlans[0] & { savings?: string }
  index: number
  billingCycle: "monthly" | "yearly"
  onSelect: (name: string) => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="h-full"
    >
      <Card
        className={cn(
          "relative h-full border-border bg-card/50 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-brand/10",
          plan.popular
            ? "border-brand ring-2 ring-brand shadow-lg shadow-brand/20"
            : "hover:border-brand/50"
        )}
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
          <AnimatedPrice
            price={plan.price}
            currency={plan.currency}
            period={plan.period}
          />
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
            onClick={() => onSelect(plan.name)}
          >
            <Button
              className={cn(
                "mt-8 w-full cursor-pointer",
                plan.popular
                  ? "bg-gradient-to-r from-brand to-brand-light text-white border-0 hover:opacity-90 shadow-lg shadow-brand/25"
                  : "border-brand/30 hover:bg-brand/10"
              )}
              variant={plan.popular ? "default" : "outline"}
            >
              {plan.cta}
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Mobile swipeable cards component
function MobileCarousel({
  children,
  activeIndex,
  setActiveIndex
}: {
  children: React.ReactNode[]
  activeIndex: number
  setActiveIndex: (index: number) => void
}) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  // IntersectionObserver to detect active card
  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            const index = cardRefs.current.findIndex((ref) => ref === entry.target)
            if (index !== -1) {
              setActiveIndex(index)
            }
          }
        })
      },
      {
        root: container,
        threshold: 0.5,
      }
    )

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card)
    })

    return () => observer.disconnect()
  }, [children.length, setActiveIndex])

  const scrollToCard = (index: number) => {
    const card = cardRefs.current[index]
    if (card && scrollRef.current) {
      const containerWidth = scrollRef.current.offsetWidth
      const cardWidth = card.offsetWidth
      const scrollLeft = card.offsetLeft - (containerWidth - cardWidth) / 2
      scrollRef.current.scrollTo({ left: scrollLeft, behavior: "smooth" })
    }
  }

  return (
    <div className="md:hidden relative overflow-hidden w-full">
      <div
        ref={scrollRef}
        className={cn(
          "flex overflow-x-scroll overflow-y-hidden scroll-smooth snap-x snap-mandatory",
          "no-scrollbar items-stretch gap-4",
          "[WebkitOverflowScrolling:touch]",
          "px-[7.5vw] pb-4"
        )}
      >
        {children.map((child, index) => (
          <div
            key={index}
            ref={(el) => { cardRefs.current[index] = el }}
            className={cn(
              "flex-shrink-0 w-[85vw] snap-center h-full",
              "transition-all duration-300 ease-out",
              activeIndex === index
                ? "scale-100 opacity-100"
                : "scale-[0.95] opacity-70"
            )}
          >
            {child}
          </div>
        ))}
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-4">
        {children.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToCard(index)}
            aria-label={`Go to card ${index + 1}`}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              activeIndex === index
                ? "bg-brand w-6"
                : "bg-brand/30 hover:bg-brand/50 w-2"
            )}
          />
        ))}
      </div>
    </div>
  )
}

export function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")
  const [activeCardIndex, setActiveCardIndex] = useState(1) // Start with popular plan

  const handlePlanSelection = (planName: string) => {
    setSelectedPlan(planName)
    const contactSection = document.querySelector("#contact")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const plans = billingCycle === "monthly" ? monthlyPlans : yearlyPlans

  const cardElements = plans.map((plan, index) => (
    <PricingCard
      key={plan.name}
      plan={plan}
      index={index}
      billingCycle={billingCycle}
      onSelect={handlePlanSelection}
    />
  ))

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

          <BillingToggle
            billingCycle={billingCycle}
            setBillingCycle={setBillingCycle}
          />
        </div>

        {/* Mobile: Swipeable carousel */}
        <div className="mt-16">
          <MobileCarousel
            activeIndex={activeCardIndex}
            setActiveIndex={setActiveCardIndex}
          >
            {cardElements}
          </MobileCarousel>
        </div>

        {/* Desktop: Grid layout */}
        <div className="mt-16 hidden md:grid gap-8 lg:grid-cols-3">
          {cardElements}
        </div>
      </div>
    </section>
  )
}
