"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Search, Eye } from "lucide-react"
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
  category: {
    id: string
    name: string
  } | null
  createdAt: string
  updatedAt: string
}

interface Category {
  id: string
  name: string
  imageUrl: string | null
  createdAt: string
  updatedAt: string
}

export function ProductsSection() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [searchQuery, setSearchQuery] = useState("")
  const { addItem } = useCart()
  const { toast } = useToast()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002"

        // Fetch products and categories in parallel
        const [productsRes, categoriesRes] = await Promise.all([
          fetch(`${apiUrl}/products`).catch(() => null),
          fetch(`${apiUrl}/categories`).catch(() => null),
        ])

        if (productsRes && productsRes.ok) {
          const productsData = await productsRes.json()
          setProducts(productsData)
        } else {
          console.warn("No se pudieron cargar los productos del servidor")
        }

        if (categoriesRes && categoriesRes.ok) {
          const categoriesData = await categoriesRes.json()
          setCategories(categoriesData)
        } else {
          console.warn("No se pudieron cargar las categorías del servidor")
        }
      } catch (error) {
        console.error("Error al cargar datos:", error)
        // No mostrar toast en la carga inicial, solo log
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "Todos" || product.category?.name === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleAddToCart = (product: Product) => {
    const price = typeof product.price === "string" ? parseFloat(product.price) : product.price
    addItem({
      id: product.id,
      name: product.name,
      price,
      image: product.imageUrl || "/placeholder.svg",
      category: product.category?.name || "Sin categoría",
    })

    toast({
      title: "Producto agregado",
      description: `${product.name} agregado al carrito`,
    })
  }

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
                  <button
                    onClick={() => setSelectedCategory("Todos")}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                      selectedCategory === "Todos"
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-secondary"
                    }`}
                  >
                    Todos
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.name)}
                      className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                        selectedCategory === category.name
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-secondary"
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Cargando productos...</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No se encontraron productos</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => {
                  const price = typeof product.price === "string" ? parseFloat(product.price) : product.price
                  return (
                    <Card key={product.id} className="group overflow-hidden flex flex-col">
                      <CardContent className="p-0 relative">
                        <Link href={`/products/${product.id}`}>
                          <div className="relative aspect-square overflow-hidden">
                            <img
                              src={product.imageUrl || "/placeholder.svg"}
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            {product.category && (
                              <Badge className="absolute top-2 right-2" variant="secondary">
                                {product.category.name}
                              </Badge>
                            )}
                            {product.stock === 0 && (
                              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                <span className="text-white font-semibold">Sin stock</span>
                              </div>
                            )}
                          </div>
                        </Link>
                      </CardContent>
                      <CardFooter className="flex flex-col items-start p-4 space-y-3 flex-1">
                        <div className="w-full flex-1">
                          <Link href={`/products/${product.id}`}>
                            <h3 className="font-medium text-foreground mb-1 hover:text-primary transition-colors line-clamp-2">
                              {product.name}
                            </h3>
                          </Link>
                          {product.description && (
                            <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{product.description}</p>
                          )}
                          <p className="text-lg font-semibold text-primary">${price.toFixed(2)}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {product.stock > 0 ? `Stock: ${product.stock}` : "Sin stock"}
                          </p>
                        </div>
                        <div className="w-full flex gap-2">
                          <Link href={`/products/${product.id}`} className="flex-1">
                            <Button variant="outline" size="sm" className="w-full">
                              <Eye className="mr-2 h-4 w-4" />
                              Ver detalle
                            </Button>
                          </Link>
                          <Button
                            size="sm"
                            onClick={() => handleAddToCart(product)}
                            disabled={product.stock === 0}
                            className="flex-1"
                          >
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            Agregar
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

