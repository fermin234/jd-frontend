"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"
import { Card } from "@/components/ui/card"
import { Header } from "@/components/header"

interface Category {
  id: string
  name: string
  imageUrl: string | null
  createdAt: string
  updatedAt: string
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true)
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002"
        const res = await fetch(`${apiUrl}/categories`)
        if (!res.ok) throw new Error("No se pudieron cargar las categorías")
        const data: Category[] = await res.json()
        setCategories(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  return (
    <div className="min-h-screen">
      <Header />
      {/* Hero Section con imagen de fondo */}
      <section className="relative h-[280px] md:h-[360px] flex items-center justify-center text-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/product-section.jpeg')" }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-2">Categorías</h1>
          <p className="text-sm md:text-base">
            <Link href="/" className="hover:underline">
              Inicio
            </Link>{" "}
            / Categorías
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-10 md:py-14">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Cargando categorías...</p>
            </div>
          ) : categories.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No hay categorías disponibles</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
              {categories.map((category) => (
                <Link key={category.id} href={`/products?category=${category.id}`}>
                  <Card className="border-transparent shadow-none hover:shadow-lg transition-shadow cursor-pointer group">
                    <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-muted">
                      <img
                        src={category.imageUrl || "/empty-card.png"}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = "/empty-card.png"
                        }}
                      />
                    </div>
                    <p className="mt-3 text-center text-sm font-semibold text-foreground uppercase tracking-wide">
                      {category.name}
                    </p>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  )
}
