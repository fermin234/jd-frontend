import Link from "next/link"
import { Facebook, Instagram, Twitter, CreditCard } from "lucide-react"
import { Mail, House, Phone } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-secondary/50 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8"> */}
        <div className="flex flex-col justify-center items-center gap-8 mb-8">
          {/* Brand */}
          <div>
            <img src="/logo-OK-Juanita-Deco-2.png" alt="Juanita Deco" height={40} width={120} />
          </div>

          {/* Quick Links */}
          <div>
            <div className="flex space-y-2 space-x-4">
              <div>
                <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Inicio
                </Link>
              </div>
              <div>
                <Link href="#productos" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Productos
                </Link>
              </div>
              <div>
                <Link href="#ambientes" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Ambientes
                </Link>
              </div>
              <div>
                <Link href="#nosotros" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Nosotros
                </Link>
              </div>
            </div>
          </div>

          {/* Contact Info */}
            <div className="flex justify-center items-center space-x-6">
              <div className="flex items-start justify-center space-x-2">
                <Mail className="h-5 w-5 text-primary mt-1" />
                <div className="flex items-start space-x-4">
                  <p className="text-muted-foreground">info@juanitadeco.com.ar</p>
                </div>
              </div>
              <div className="flex items-start justify-center space-x-2">
                <Phone className="h-5 w-5 text-primary mt-1" />
                <div className="flex items-start space-x-4">
                  <p className="text-muted-foreground">+54 9 11-7616-4961</p>
                </div>
              </div>
              <div className="flex items-start justify-center space-x-2">
                <House className="h-5 w-5 text-primary mt-1" />
                <div className="flex items-start space-x-4">
                  <p className="text-muted-foreground">La Cumbre - Buenos Aires</p>
                </div>
              </div>
            </div>

          {/* Social */}
          <div className="flex flex-col items-center justify-center">
            <div className="flex justify-center space-x-4 mb-3">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © Todos los derechos reservados – GroupFiveDev
          </p>
        </div>
      </div>
    </footer>
  )
}
