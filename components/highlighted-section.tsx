import Link from "next/link"

const featuredProducts = [
  {
    name: "Borlas",
    text:
      "Decora tu entrada con borlas de puerta artesanales, piezas únicas que combinan creatividad y tradición para darle un toque especial y acogedor a tu hogar.",
    image: "/borlas.jpeg",
    href: "/products?c=borlas",
  },
  {
    name: "Adornos y accesorios",
    text:
      "Añade encanto a tus reuniones con adornos y accesorios, detalles únicos que fusionan estilo y tradición para crear un ambiente cálido y especial en cada rincón.",
    image: "/adornos.jpeg",
    href: "/products?c=adornos",
  },
  {
    name: "Mantas",
    text:
      "Envuelve tu hogar en calidez con mantas artesanales, ideales para taparse en días fríos o decorar tus espacios con un toque de textura, color y estilo único.",
    image: "/mantas.jpeg",
    href: "/products?c=mantas",
  },
]

export function HighlightedSection() {
  return (
    <section id="products" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Encabezado tipo “Galería / Nuestros productos” */}
        <div className="text-center mb-14">
          <p className="font-serif italic text-lg md:text-xl text-muted-foreground mb-2">
            Galería
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground">
            Nuestros productos
          </h2>
        </div>

        {/* Grid de 3 tarjetas */}
        <div className="mx-auto grid max-w-6xl grid-cols-1 md:grid-cols-3 gap-10">
          {featuredProducts.map((item, i) => (
            <article
              key={item.name}
              className={`group relative overflow-hidden rounded-md transform transition-all duration-500 
                ${i === 1 ? "md:scale-110 md:z-10" : ""}`}
            >
              {/* Imagen */}
              <img
                src={item.image}
                alt={item.name}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

              {/* Contenido */}
              <div className="relative aspect-[3/4] p-5 sm:p-6 flex items-end justify-center">
                <div className="text-white max-w-[85%]">
                  <h6 className="font-serif text-xl sm:text-2xl font-semibold mb-2">
                    {item.name}
                  </h6>
                  <p className="text-white/90 leading-relaxed text-sm sm:text-base mb-4 line-clamp-4">
                    {item.text}
                  </p>

                  {/* Solo la card del medio muestra el botón */}
                  {i === 1 && (
                      <Link
                        href={item.href || "/products"}
                        className="inline-block rounded-sm border border-white px-4 py-2 text-sm sm:text-base text-white transition-colors hover:bg-white/10"
                      >
                        Ver productos
                      </Link>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
