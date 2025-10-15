"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function ContactSection() {
  const [formData, setFormData] = useState({ name:"", email:"", phone:"", message:"" })
  const sectionRef = useRef<HTMLElement | null>(null)
  const bgRef = useRef<HTMLDivElement | null>(null)
  const rafRef = useRef<number | null>(null)

  const PARALLAX_PX = 220; // más movimiento (ajustable)

useEffect(() => {
  const onScroll = () => {
    if (!sectionRef.current || !bgRef.current) return;

    const rect = sectionRef.current.getBoundingClientRect();
    const vh = window.innerHeight;

    // Distancia del centro de la sección al centro del viewport (-1 a 1 aprox)
    const sectionCenter = rect.top + rect.height / 2;
    const viewportCenter = vh / 2;
    const normalized = (sectionCenter - viewportCenter) / ((vh + rect.height) / 2);

    // Desplazamiento
    const offset = normalized * PARALLAX_PX;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      // scale evita bordes; translateY aplica el parallax visible
      bgRef.current!.style.transform = `translateY(${offset}px) scale(1.2)`;
    });
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  return () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
  };
}, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  return (
    <section id="contacto" ref={sectionRef} className="relative py-16 md:py-24 overflow-hidden">
      {/* Fondo con parallax */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div
          ref={bgRef}
          className="absolute left-0 right-0 top-0 will-change-transform"
          style={{
            // el alto de la imagen es mayor que la sección
            height: "160%",
            top: "-40%",
            backgroundImage: "url('/contact-section.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: "translateY(0px) scale(1.1)", // un leve zoom para cubrir
          }}
        />
        <div className="absolute inset-0 bg-black/35" />
      </div>

      <div className="relative container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Formulario */}
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

          {/* Texto derecha */}
          <div className="self-center text-white">
            <div className="max-w-xl">
              <p className="font-serif italic text-2xl md:text-3xl mb-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">
                Contacto
              </p>
              <h2 className="font-serif font-light text-5xl md:text-6xl leading-tight mb-4 drop-shadow-[0_2px_2px_rgba(0,0,0,0.55)]">
                No dude en hacer<br />tu consulta
              </h2>
              <p className="text-white/90 leading-relaxed mb-6 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">
                Si desea contactarse con nosotros por consultas o presupuestos, por favor
                complete el siguiente formulario.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
