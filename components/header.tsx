"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import { motion, AnimatePresence } from "framer-motion"

const navLinks = [
  { name: "Página Inicial", href: "#home" },
  { name: "Sobre Nós", href: "#about" },
  { name: "Serviços", href: "#services" },
  { name: "Planos", href: "#pricing" },
  { name: "Suporte", href: "#contact" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href)
    console.log("[Sara AI] Navigating to:", href, "Element found:", !!element)
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: "smooth", block: "start" })
      }, 100)
      setMobileMenuOpen(false)
    }
  }

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  }

  return (
    <header
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl transition-all duration-300 ${scrolled ? "top-2" : "top-4"}`}
    >
      <motion.nav
        className={`glass px-4 py-3 shadow-lg border border-brand/10 hover:border-brand/20 transition-colors ${
          mobileMenuOpen ? "rounded-none" : "rounded-full"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-b group-hover:shadow-lg group-hover:shadow-brand/30 transition-shadow"
            >
              <span className="text-lg font-bold text-white">
                <img src="/logo.png" alt="sara3com" className="w-10 h-10" />
              </span>
            </motion.div>
            <span className="text-lg font-bold text-foreground hidden sm:block">SARA3COM</span>
          </Link>

          <ul className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <motion.div whileHover={{ y: -2 }}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="link-underline text-sm font-medium text-muted-foreground transition-colors hover:text-foreground relative group cursor-pointer"
                  >
                    {link.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-brand to-brand-light group-hover:w-full transition-all duration-300" />
                  </button>
                </motion.div>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <button
                onClick={() => handleNavClick("")}
                className="hidden md:flex px-6 py-2 rounded-full bg-gradient-to-r from-brand to-brand-light text-white border-0 hover:opacity-90 shadow-lg shadow-brand/20 hover:shadow-brand/40 transition-shadow cursor-pointer"
              >
                Login
              </button>
            </motion.div>

            <motion.button
              className="lg:hidden p-2 rounded-lg hover:bg-brand/10 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-foreground" />
              ) : (
                <Menu className="h-6 w-6 text-foreground" />
              )}
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden mt-4 pt-4 border-2 border-brand/40 bg-gradient-to-br from-brand/5 to-brand-dark/5 overflow-hidden"
            >
              <motion.nav
                variants={menuVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col gap-4 pb-4 px-4 sm:px-6"
              >
                {navLinks.map((link) => (
                  <motion.div key={link.name} variants={itemVariants}>
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        handleNavClick(link.href)
                      }}
                      className="w-full text-left px-4 py-3 rounded-lg text-base font-medium text-muted-foreground hover:text-foreground hover:bg-brand/10 transition-all duration-200 cursor-pointer"
                    >
                      {link.name}
                    </button>
                  </motion.div>
                ))}

                <motion.div variants={itemVariants} className="pt-2 flex flex-col gap-3">
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavClick("")
                    }}
                    className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-brand to-brand-light text-white font-medium hover:opacity-90 transition-all cursor-pointer shadow-lg shadow-brand/20"
                  >
                    Login
                  </button>
                  {/* <button
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavClick("#pricing")
                    }}
                    className="w-full px-4 py-3 rounded-lg border-2 border-brand/30 text-brand font-medium hover:bg-brand/5 transition-all cursor-pointer"
                  >
                    Ver Nossos Planos
                  </button> */}
                </motion.div>
              </motion.nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  )
}
