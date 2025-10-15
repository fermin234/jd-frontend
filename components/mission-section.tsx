export function MissionSection() {
  return (
    <section id="mision" className="relative min-h-screen">
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
        {/* Centrado total */}
        <div className="flex items-center justify-center min-h-screen">
          {/* Tarjeta translúcida al centro */}
          <div className="max-w-4xl w-full bg-white/85 backdrop-blur-sm rounded-2xl shadow-2xl px-10 py-14 md:px-16 md:py-16 text-center">
            {/* Logo circular arriba */}
            <div className="mx-auto mb-8 h-20 w-20 rounded-full overflow-hidden ring-1 ring-foreground/10">
              <img
                src="/logo-OK-Juanita-Deco-3.png"
                alt="Logo Juanita Deco"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Título + frase en cursiva */}
            <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground mb-4">
              Juanita Deco
            </h2>
            <p className="font-serif italic text-2xl md:text-3xl text-foreground/80 mb-6">
              ¡Los souvenirs no son solo recuerdos!
            </p>

            {/* Texto de misión */}
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
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
