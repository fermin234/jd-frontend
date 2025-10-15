"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Search, ShoppingCart, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCart } from "@/lib/cart-context"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { totalItems } = useCart()
  const pathname = usePathname()
  const isHome = pathname === "/"

  return (
    <header className="sticky top-0 z-50 w-full bg-foreground/95 backdrop-blur supports-[backdrop-filter]:bg-foreground/90">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <img src="/logo-OK-Juanita-Deco.png" alt="Juanita Deco" height={40} width={120} />
          </Link>

          {/* Desktop Navigation */}
          {isHome && (
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-sm font-medium text-background hover:text-primary transition-colors">
                Inicio
              </Link>
              <Link
                href="#products"
                className="text-sm font-medium text-background/80 hover:text-primary transition-colors"
              >
                Productos
              </Link>
              <Link
                href="#nosotros"
                className="text-sm font-medium text-background/80 hover:text-primary transition-colors"
              >
                Nosotros
              </Link>
              <Link
                href="#contacto"
                className="text-sm font-medium text-background/80 hover:text-primary transition-colors"
              >
                Contacto
              </Link>
            </nav>
          )}

          {/* Right Actions */}
          <div className="flex items-center space-x-4">

            {/* Cart - Now links to cart page */}
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative text-background hover:text-primary hover:bg-background/10">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>

            {/* Mobile Menu Toggle */}
            {isHome && (
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-background hover:text-primary hover:bg-background/10"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            )}
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className="py-4 border-t border-background/20">
            <Input type="search" placeholder="Buscar productos..." className="max-w-md bg-background/10 text-background placeholder:text-background/60 border-background/30" />
          </div>
        )}

        {/* Mobile Menu */}
        {mobileMenuOpen && isHome && (
          <div className="md:hidden py-4 border-t border-background/20">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-sm font-medium text-background hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Inicio
              </Link>
              <Link
                href="#products"
                className="text-sm font-medium text-background/80 hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Productos
              </Link>
              <Link
                href="#nosotros"
                className="text-sm font-medium text-background/80 hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Nosotros
              </Link>
              <Link
                href="#contacto"
                className="text-sm font-medium text-background/80 hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contacto
              </Link>
              <div className="pt-4">
                <Input type="search" placeholder="Buscar productos..." className="bg-background/10 text-background placeholder:text-background/60 border-background/30" />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
