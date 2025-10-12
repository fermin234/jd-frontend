import Link from "next/link"

const categories = [
  {
    name: "Living",
    image: "/scandinavian-living-room-interior.jpg",
    description: "Espacios acogedores y funcionales",
  },
  {
    name: "Dormitorio",
    image: "/minimalist-bedroom-scandinavian-style.jpg",
    description: "Tu refugio personal",
  },
  {
    name: "Cocina",
    image: "/modern-scandinavian-kitchen-design.jpg",
    description: "El corazón del hogar",
  },
]

export function RoomCategories() {
  return (
    <section id="ambientes" className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">Ambientes</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Inspírate con nuestras colecciones organizadas por espacios
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`#productos?category=${category.name.toLowerCase()}`}
              className="group relative overflow-hidden rounded-lg aspect-[4/5]"
            >
              <img
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="font-serif text-2xl md:text-3xl font-bold mb-2">{category.name}</h3>
                <p className="text-white/90">{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
