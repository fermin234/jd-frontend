"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

type Slide = {
  src: string
  subtitle: string
}

const SLIDES: Slide[] = [
  { src: "/slider-1.jpeg", subtitle: "Souvenirs y regalos especiales" },
  { src: "/slider-2.jpeg", subtitle: "Descubrí la calidez de lo artesanal en cada uno de mis productos" },
  { src: "/slider-3.jpeg", subtitle: "Piezas únicas, hechas a mano" },
]

const INTERVAL_MS = 2500   // tiempo en cada slide
const FADE_MS = 800        // duración del crossfade

export function Hero() {
  const [index, setIndex] = useState(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Preload
  useEffect(() => {
    SLIDES.forEach(s => {
      const img = new Image()
      img.src = s.src
    })
  }, [])

  // Autoplay
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % SLIDES.length)
    }, INTERVAL_MS)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [])

  const goTo = (i: number) => setIndex((i + SLIDES.length) % SLIDES.length)

  return (
    <section
      className="relative h-[600px] md:h-[700px] flex items-center justify-center overflow-hidden"
      aria-label="Hero slider"
    >
      {/* Slides en stack con crossfade */}
      <div className="absolute inset-0 z-0">
        {SLIDES.map((s, i) => (
          <div
            key={s.src}
            className={`absolute inset-0 bg-cover bg-center transition-opacity ease-in-out will-change-[opacity]`}
            style={{
              backgroundImage: `url('${s.src}')`,
              opacity: i === index ? 1 : 0,
              transitionDuration: `${FADE_MS}ms`,
            }}
            aria-hidden={i !== index}
          />
        ))}
        {/* Overlay para contraste */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Contenido */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
          Juanita Deco
        </h1>

        {/* Subtítulo con fade según el slide */}
        <div className="relative h-8 md:h-10 mb-8">
          {SLIDES.map((s, i) => (
            <p
              key={`subtitle-${i}`}
              className={`absolute inset-0 text-lg md:text-xl text-white/90 transition-opacity ease-in-out`}
              style={{ opacity: i === index ? 1 : 0, transitionDuration: `${FADE_MS}ms` }}
            >
              {s.subtitle}
            </p>
          ))}
        </div>

        <Button asChild size="lg" className="group bg-secondary/35 hover:bg-secondary/90 hover:text-secondary-foreground">
          <Link href="/products">
            Explorar Productos
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 left-0 right-0 z-10 flex items-center justify-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Ir al slide ${i + 1}`}
            className={`h-2.5 w-2.5 rounded-full border border-white/70 transition
            ${i === index ? "bg-white" : "bg-white/30 hover:bg-white/50"}`}
          />
        ))}
      </div>
    </section>
  )
}
