import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { FeaturedProducts } from "@/components/featured-products"
import { RoomCategories } from "@/components/room-categories"
import { AboutSection } from "@/components/about-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { WelcomeSection } from "@/components/welcome-section"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <WelcomeSection />
        <FeaturedProducts />
        <RoomCategories />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
