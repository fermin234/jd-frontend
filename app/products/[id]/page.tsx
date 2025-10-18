"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, ArrowLeft, Package } from "lucide-react"
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

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { addItem } = useCart()
  const { toast } = useToast()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002"}/products/${params.id}`
        )

        if (!response.ok) {
          throw new Error("Producto no encontrado")
        }

        const data = await response.json()
        setProduct(data)
      } catch (error) {
        console.error("Error al cargar el producto:", error)
        toast({
          title: "Error",
          description: "No se pudo cargar el producto",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchProduct()
    }
  }, [params.id, toast])

  const handleAddToCart = () => {
    if (!product) return

    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: typeof product.price === "string" ? parseFloat(product.price) : product.price,
        image: product.imageUrl || "/empty-card.png",
        category: product.category?.name || "Sin categoría",
      })
    }

    toast({
      title: "Producto agregado",
      description: `${quantity} ${quantity === 1 ? "unidad" : "unidades"} de ${product.name} agregado al carrito`,
    })
  }

  const handleQuantityChange = (increment: boolean) => {
    if (increment) {
      setQuantity((prev) => Math.min(prev + 1, product?.stock || 1))
    } else {
      setQuantity((prev) => Math.max(prev - 1, 1))
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-16">
          <div className="text-center">
            <p className="text-muted-foreground">Cargando producto...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Producto no encontrado</h1>
            <Button onClick={() => router.push("/products")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver a productos
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const images = [product.imageUrl, ...(product.galery || [])].filter(Boolean)
  const price = typeof product.price === "string" ? parseFloat(product.price) : product.price

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8 md:py-16">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Button variant="ghost" onClick={() => router.push("/products")} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a productos
          </Button>
        </div>

        {/* Product Details */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="relative aspect-square">
                  <img
                    src={images[selectedImage] || "/empty-card.png"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Gallery Thumbnails */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square rounded-md overflow-hidden border-2 transition-all ${
                      selectedImage === index ? "border-primary" : "border-transparent hover:border-muted"
                    }`}
                  >
                    <img src={image || "/empty-card.png"} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Category Badge */}
            {product.category && (
              <Badge variant="secondary" className="mb-2">
                {product.category.name}
              </Badge>
            )}

            {/* Title */}
            {/* <div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">{product.name}</h1>
              <p className="text-sm text-muted-foreground">SKU: {product.barcode}</p>
            </div> */}

            {/* Price */}
            <div>
              <p className="text-3xl font-bold text-primary">${price.toFixed(2)}</p>
            </div>

            {/* Stock */}
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {product.stock > 0 ? `${product.stock} unidades disponibles` : "Sin stock"}
              </span>
            </div>

            {/* Description */}
            {product.description && (
              <div>
                <h3 className="font-semibold text-foreground mb-2">Descripción</h3>
                <p className="text-muted-foreground leading-relaxed">{product.description}</p>
              </div>
            )}

            {/* Quantity Selector */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Cantidad</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-border rounded-md">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleQuantityChange(false)}
                    disabled={quantity <= 1}
                    className="h-10 w-10"
                  >
                    -
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleQuantityChange(true)}
                    disabled={quantity >= product.stock}
                    className="h-10 w-10"
                  >
                    +
                  </Button>
                </div>
                <span className="text-sm text-muted-foreground">
                  Subtotal: ${(price * quantity).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button size="lg" className="w-full md:w-auto" onClick={handleAddToCart} disabled={product.stock === 0}>
              <ShoppingCart className="mr-2 h-5 w-5" />
              {product.stock > 0 ? "Agregar al carrito" : "Sin stock"}
            </Button>

            {/* Additional Info */}
            <div className="pt-6 border-t border-border space-y-2">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Fecha de ingreso:</span>{" "}
                {new Date(product.createdAt).toLocaleDateString("es-AR")}
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}
