"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/lib/cart-context"

const featuredProducts = [
  {
    id: "1",
    name: "Jarrón Cerámico Minimalista",
    price: 45,
    image: "/minimalist-ceramic-vase-beige.jpg",
    category: "Living",
  },
  {
    id: "2",
    name: "Cojín Texturizado Natural",
    price: 28,
    image: "/textured-natural-cushion-pillow.jpg",
    category: "Dormitorio",
  },
  {
    id: "3",
    name: "Espejo Redondo Dorado",
    price: 89,
    image: "/round-gold-mirror-wall-decor.jpg",
    category: "Living",
  },
  {
    id: "4",
    name: "Maceta de Cerámica",
    price: 35,
    image: "/ceramic-plant-pot-modern.jpg",
    category: "Living",
  },
]

export function FeaturedProducts() {
  const { addItem } = useCart()

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">Productos Destacados</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Selección especial de nuestros productos más populares para tu hogar
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
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
                  <p className="text-lg font-semibold text-primary">${product.price}</p>
                </div>
                <Button className="w-full" size="sm" onClick={() => addItem(product)}>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Agregar al carrito
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
