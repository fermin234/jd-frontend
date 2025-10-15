export function MissionSection() {
  return (
    <section id="mision" className="relative py-24 md:py-32">
      {/* Fondo a pantalla completa */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/mission-section.jpeg"
          alt="Paisaje de fondo"
          className="w-full h-full object-cover"
        />
        {/* Oscurecido muy leve para contraste */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center">
          {/* Tarjeta translúcida al centro */}
          <div className="max-w-3xl w-full bg-white/80 backdrop-blur-sm rounded-xl shadow-xl px-6 py-10 md:px-12 md:py-12 text-center">
            {/* Logo circular arriba */}
            <div className="mx-auto mb-6 h-16 w-16 rounded-full overflow-hidden ring-1 ring-foreground/10">
              <img
                src="/logo-OK-Juanita-Deco-3.png"
                alt="Logo Juanita Deco"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Título + frase en cursiva */}
            <h2 className="font-serif text-3xl md:text-4xl font-light text-foreground mb-2">
              Juanita Deco
            </h2>
            <p className="font-serif italic text-xl md:text-2xl text-foreground/80 mb-6">
              ¡Los souvenirs no son solo recuerdos!
            </p>

            {/* Texto de misión */}
            <p className="text-muted-foreground leading-relaxed">
              Son símbolos tangibles de experiencias inolvidables, son objetos
              que adquirimos como recuerdo de lugares visitados o eventos
              significativos; portadores de historias y emociones.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
