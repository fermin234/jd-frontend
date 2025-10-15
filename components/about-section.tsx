export function AboutSection() {
  return (
    <section id="nosotros" className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="font-serif text-3xl md:text-4xl font-light text-foreground mb-6">Juanita Deco</h2>
            <h6 className="font-serif text-xl md:text-2xl font-bold text-foreground mb-6">Decora tu casa</h6>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Decora tu casa con detalles que transmitan calidez y estilo. Incorpora mantas suaves y acogedoras para crear un ambiente relajante, y añade borlas en los rincones para un toque bohemio y chic. Los budas, ya sean pequeñas figuras o cuadros, aportarán serenidad y equilibrio a tus espacios. Completa la decoración con almohadones de colores y texturas variadas, que no solo suman confort, sino también personalidad a cada rincón.
              </p>
              <p>
                ¡Transforma tu hogar en un refugio lleno de armonía y buen gusto!
              </p>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <img src="/logo-OK-Juanita-Deco-2.png" alt="Sobre nosotros" className="w-80% h-90% object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
