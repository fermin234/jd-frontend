"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useCart } from "@/lib/cart-context"
import { useToast } from "@/hooks/use-toast"

interface Product {
  id: string
  barcode: string
  name: string
  description: string | null
  price: string | number
  stock: number
  imageUrl: string | null
  galery: string[]
  category: { id: string; name: string } | null
  createdAt: string
  updatedAt: string
}

export function ProductsSection() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [sort, setSort] = useState<"latest" | "price-asc" | "price-desc">("latest")

  const { addItem } = useCart()
  const { toast } = useToast()

  const fmt = useMemo(
    () => new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", minimumFractionDigits: 2 }),
    []
  )

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002"
        const res = await fetch(`${apiUrl}/products`)
        if (!res.ok) throw new Error("No se pudieron cargar los productos")
        const data: Product[] = await res.json()
        setProducts(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const sorted = useMemo(() => {
    const list = [...products]
    if (sort === "price-asc") {
      list.sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0))
    } else if (sort === "price-desc") {
      list.sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0))
    } else {
      // "latest": asume createdAt desc si existe
      list.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
    }
    return list
  }, [products, sort])

  const handleAddToCart = (p: Product) => {
    const price = typeof p.price === "string" ? parseFloat(p.price) : p.price
    addItem({
      id: p.id,
      name: p.name,
      price,
      image: p.imageUrl || "/placeholder.svg",
      category: p.category?.name || "Sin categoría",
    })
    toast({ title: "Producto agregado", description: `${p.name} agregado al carrito` })
  }

  const total = sorted.length

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/product-section.jpeg"
            alt="Productos Juanita Deco"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center text-white space-y-4 px-4">
            <h1 className="font-serif text-4xl md:text-6xl font-bold">
              Nuestros Productos
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto">
              Descubre nuestra colección exclusiva de decoración para el hogar
            </p>
          </div>
        </div>
      </section>

      <section id="productos" className="py-10 md:py-14">
        <div className="container mx-auto px-4">
          {/* Barra superior */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
          <div>Mostrando 1–{total} de {total} resultados</div>
          <div className="flex items-center gap-2">
            <span>Ordenar por</span>
            <select
              className="border bg-transparent px-2 py-1 text-foreground"
              value={sort}
              onChange={(e) => setSort(e.target.value as any)}
            >
              <option value="latest">los últimos</option>
              <option value="price-asc">precio: menor a mayor</option>
              <option value="price-desc">precio: mayor a menor</option>
            </select>
          </div>
        </div>

        {/* Grid 4 columnas como en la referencia */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Cargando productos...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-14">
            {sorted.map((p) => {
              const price = typeof p.price === "string" ? parseFloat(p.price) : p.price
              return (
                <Card key={p.id} className="border-transparent shadow-none">
                  {/* Imagen alta */}
                  <Link href={`/products/${p.id}`} className="block">
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <img
                        src={p.imageUrl || "/empty-card.png"}
                        alt={p.name}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    </div>
                  </Link>

                  {/* Título y precio centrados */}
                  <div className="mt-4 text-center">
                    <Link href={`/products/${p.id}`} className="hover:underline">
                      <h3 className="text-foreground">{p.name}</h3>
                    </Link>
                    <div className="mt-1">
                      <span className="text-sm font-semibold text-foreground">{fmt.format(price)}</span>
                    </div>
                  </div>

                  {/* Botón outline en mayúsculas */}
                  <div className="mt-4 flex justify-center">
                    <Button
                      variant="outline"
                      onClick={() => handleAddToCart(p)}
                      disabled={p.stock === 0}
                      className="uppercase tracking-wide border-foreground/60 text-foreground hover:bg-foreground/5"
                    >
                      Añadir al carrito
                    </Button>
                  </div>
                </Card>
              )
            })}
          </div>
        )}
        </div>
      </section>
    </>
  )
}
