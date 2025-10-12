export function AboutSection() {
  return (
    <section id="nosotros" className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">Sobre Nosotros</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                En <span className="font-semibold text-foreground">Deco Interior</span>, creemos que cada espacio merece
                ser único y especial. Nos dedicamos a ofrecer productos de decoración cuidadosamente seleccionados que
                combinan funcionalidad con diseño escandinavo.
              </p>
              <p>
                Nuestra pasión es ayudarte a crear ambientes que reflejen tu personalidad y estilo de vida. Trabajamos
                con artesanos y diseñadores para traerte piezas únicas que transformarán tu hogar en un refugio
                acogedor.
              </p>
              <p>
                Cada producto en nuestra colección ha sido elegido pensando en la calidad, durabilidad y estética
                atemporal que caracteriza al diseño escandinavo.
              </p>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <img src="/scandinavian-interior-design-studio-workspace.jpg" alt="Sobre nosotros" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
