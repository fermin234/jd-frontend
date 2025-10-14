import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative h-[600px] md:h-[700px] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('/modern-scandinavian-living-room-interior-with-natu.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-foreground/20" />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 text-balance">
          Transforma tu hogar con estilo
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto text-pretty">
          Descubre nuestra colección de decoración escandinava para crear espacios únicos y acogedores
        </p>
        <Button size="lg" className="group">
          <Link href="/products">
          Explorar Productos
          </Link>
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </section>
  )
}
