"use client"

import { Phone } from "lucide-react"
import { motion } from "framer-motion"

export function FloatingCallButton() {
  return (
    <motion.a
      href="tel:+244924456001"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-brand to-brand-light text-white shadow-xl transition-all duration-300 hover:shadow-2xl"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ scale: 0, y: 100 }}
      animate={{ scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, delay: 0.5 }}
    >
      <span className="absolute inset-0 rounded-full bg-brand animate-ping opacity-75" />
      <Phone className="h-6 w-6 relative z-10" />
    </motion.a>
  )
}
