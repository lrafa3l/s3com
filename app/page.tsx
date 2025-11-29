import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Stats } from "@/components/stats"
import { Features } from "@/components/features"
import { Testimonials } from "@/components/testimonials"
import { Pricing } from "@/components/pricing"
import { Newsletter } from "@/components/newsletter"
import { Footer } from "@/components/footer"
import { FloatingElements } from "@/components/floating-elements"
import { Background } from "@/components/background"
import { AboutSection } from "@/components/about-section"
import { ContactSection } from "@/components/contact-section"
import { PartnersSection } from "@/components/partners-section"
import { ScrollProgress } from "@/components/scroll-progress"
import { FloatingChatButton } from "@/components/floating-chat-button"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import AdminPage from "./admin/page"

export default async function Home({ searchParams }: { searchParams?: Record<string, string | undefined> }) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return (
      <div className="min-h-screen bg-background">
        <ScrollProgress />
        <Background>
          <FloatingElements />
          <Header />
          <main>
            <Hero />
            <Stats />
            <Features />
            <AboutSection />
            <Testimonials />
            <Pricing />
            <PartnersSection />
            <ContactSection />
            <Newsletter />
          </main>
          <Footer />
          <FloatingChatButton />
        </Background>
      </div>
    )
  }
  return <AdminPage searchParams={searchParams} />
}
