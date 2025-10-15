import { Header } from "@/components/header"
import { ProductsSection } from "@/components/products-section"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"

export default function ProductsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <ProductsSection />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}
