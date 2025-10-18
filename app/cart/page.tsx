"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalPrice } = useCart()

  if (items.length === 0) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-background">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-2xl mx-auto text-center">
              <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground mb-6" />
              <h1 className="font-serif text-3xl font-semibold mb-4">Tu carrito está vacío</h1>
              <p className="text-muted-foreground mb-8">Agrega productos a tu carrito para continuar con tu compra</p>
              <Link href="/#productos">
                <Button size="lg">Ver Productos</Button>
              </Link>
            </div>
          </div>
        </main>
        {/* <Footer /> */}
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <h1 className="font-serif text-3xl md:text-4xl font-semibold mb-8">Carrito de Compras</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 bg-card border border-border rounded-lg hover:shadow-md transition-shadow"
                >
                  {/* Product Image */}
                  <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0 rounded-md overflow-hidden bg-muted">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-medium text-lg mb-1">{item.name}</h3>
                      {item.category && <p className="text-sm text-muted-foreground mb-2">{item.category}</p>}
                      <p className="font-semibold text-primary">${item.price.toLocaleString()}</p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex items-center border border-border rounded-md">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="px-4 text-sm font-medium">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive hover:bg-secondary"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Subtotal */}
                  <div className="hidden md:flex flex-col items-end justify-between">
                    <p className="font-semibold text-lg">${(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
                <h2 className="font-serif text-2xl font-semibold mb-6">Resumen del Pedido</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">${totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Envío</span>
                    <span className="font-medium">A calcular</span>
                  </div>
                  <div className="border-t border-border pt-4">
                    <div className="flex justify-between">
                      <span className="font-semibold text-lg">Total</span>
                      <span className="font-semibold text-lg text-primary">${totalPrice.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <Button className="w-full mb-3" size="lg">
                  Finalizar Compra
                </Button>

                <Link href="/#productos">
                  <Button variant="outline" className="w-full bg-transparent" size="lg">
                    Seguir Comprando
                  </Button>
                </Link>

                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-xs text-muted-foreground text-center">Aceptamos todos los medios de pago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* <Footer /> */}
    </>
  )
}
