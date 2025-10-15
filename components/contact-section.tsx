"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Phone } from "lucide-react"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  return (
    <section
      id="contacto"
      className="relative py-16 md:py-24 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/contact-section.jpeg')" }}
    >
      {/* Overlay un poco más oscuro para mejor contraste */}
      <div className="absolute inset-0 bg-black/35" />

      <div className="relative container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* FORM IZQUIERDA */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              id="name"
              type="text"
              placeholder="Nombre"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="font-serif bg-white/45 border border-white/70 placeholder:text-black/70 text-black/80 focus:border-white focus:ring-1 focus:ring-white"
            />
            <Input
              id="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="font-serif bg-white/45 border border-white/70 placeholder:text-black/70 text-black/80 focus:border-white focus:ring-1 focus:ring-white"
            />
            <Input
              id="phone"
              type="tel"
              placeholder="Teléfono"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
              className="font-serif bg-white/45 border border-white/70 placeholder:text-black/70 text-black/80 focus:border-white focus:ring-1 focus:ring-white"
            />
            <Textarea
              id="message"
              placeholder="Mensaje"
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              className="font-serif bg-white/45 border border-white/70 placeholder:text-black/70 text-black/80 focus:border-white focus:ring-1 focus:ring-white"
            />
            <Button type="submit" className="font-serif w-full bg-transparent hover:bg-white/10 text-white border border-white">
              Enviar Consulta
            </Button>
          </form>

          {/* COLUMNA DERECHA */}
          <div className="self-center text-white">
            <div className="max-w-xl">
              {/* “Contacto” en cursiva serif */}
              <p className="font-serif italic text-2xl md:text-3xl mb-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">
                Contacto
              </p>

              {/* Título grande serif, multilinea, con buen leading */}
              <h2 className="font-serif font-light text-5xl md:text-6xl leading-tight mb-4 drop-shadow-[0_2px_2px_rgba(0,0,0,0.55)]">
                No dude en hacer<br />tu consulta
              </h2>

              {/* Texto descriptivo más chico y ancho controlado */}
              <p className="text-white/90 leading-relaxed mb-6 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">
                Si desea contactarse con nosotros por consultas o presupuestos, por favor
                complete el siguiente formulario.
              </p>
            </div>
          </div>
          {/* /col derecha */}
        </div>
      </div>
    </section>
  )
}
