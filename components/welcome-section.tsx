export function WelcomeSection() {
  return (
    <section id="nosotros" className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="font-serif text-3xl md:text-4xl font-light text-foreground mb-6">Bienvenidos</h2>
            <h6 className="font-serif text-xl md:text-2xl font-bold text-foreground mb-6">Juanita Deco</h6>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Soy Juana y llegué para decorar tu hogar con mis creaciones.
              </p>
              <p>
                Mi pasión por lo artesanal me llevó a encontrar una forma de expresarlo en objetos decorativos únicos para tu hogar. Cada pieza está hecha a mano con dedicación y amor, convirtiéndola en un detalle especial para regalar o embellecer cualquier espacio.
              </p>
              <p>
                💛 Souvenirs y regalos especiales
                🎁 Ventas minoristas
                ✨ Piezas únicas, hechas a mano
              </p>
              <p>
                Descubrí la calidez de lo artesanal en cada uno de mis productos.
              </p>
              <p className="text-right">
                Gracias por visitarnos!
              </p>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <img src="/welcome.jpeg" alt="Sobre nosotros" className="w-80% h-90% object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
