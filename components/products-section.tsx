"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ShoppingCart, Search } from "lucide-react"

const allProducts = [
  {
    id: 1,
    name: "Jarrón Cerámico Minimalista",
    price: "$45.00",
    category: "living",
    image: "/minimalist-ceramic-vase-beige.jpg",
  },
  {
    id: 2,
    name: "Cojín Texturizado Natural",
    price: "$28.00",
    category: "dormitorio",
    image: "/textured-natural-cushion-pillow.jpg",
  },
  {
    id: 3,
    name: "Espejo Redondo Dorado",
    price: "$89.00",
    category: "living",
    image: "/round-gold-mirror-wall-decor.jpg",
  },
  {
    id: 4,
    name: "Maceta de Cerámica",
    price: "$35.00",
    category: "living",
    image: "/ceramic-plant-pot-modern.jpg",
  },
  {
    id: 5,
    name: "Lámpara de Mesa Moderna",
    price: "$125.00",
    category: "dormitorio",
    image: "/modern-table-lamp-scandinavian.jpg",
  },
  {
    id: 6,
    name: "Set de Bowls Artesanales",
    price: "$65.00",
    category: "cocina",
    image: "/artisan-ceramic-bowls-set.jpg",
  },
  {
    id: 7,
    name: "Manta de Algodón",
    price: "$55.00",
    category: "dormitorio",
    image: "/cotton-throw-blanket-neutral.jpg",
  },
  {
    id: 8,
    name: "Tabla de Cortar Madera",
    price: "$42.00",
    category: "cocina",
    image: "/wooden-cutting-board-kitchen.jpg",
  },
]

const categories = ["Todos", "Living", "Dormitorio", "Cocina"]

export function ProductsSection() {
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProducts = allProducts.filter((product) => {
    const matchesCategory = selectedCategory === "Todos" || product.category === selectedCategory.toLowerCase()
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <section id="productos" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">Nuestros Productos</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explora nuestra colección completa de decoración para el hogar
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full md:w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              {/* Search */}
              <div>
                <h3 className="font-semibold text-foreground mb-3">Buscar</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Buscar productos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>

              {/* Categories */}
              <div>
                <h3 className="font-semibold text-foreground mb-3">Categorías</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                        selectedCategory === category
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-secondary"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="group overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col items-start p-4 space-y-3">
                    <div className="w-full">
                      <h3 className="font-medium text-foreground mb-1">{product.name}</h3>
                      <p className="text-lg font-semibold text-primary">{product.price}</p>
                    </div>
                    <Button className="w-full" size="sm">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Agregar al carrito
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
