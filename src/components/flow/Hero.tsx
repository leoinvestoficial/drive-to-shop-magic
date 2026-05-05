import heroRunner from "@/assets/brand/hero-runner.jpg";

const Marquee = () => {
  const items = ["stay in flow", "your movement is our identity", "água funcional", "energia limpa", "stay in flow", "zero excessos"];
  return (
    <div className="bg-flow-yellow text-flow-ink overflow-hidden border-y border-flow-ink/10">
      <div className="flex marquee whitespace-nowrap py-3">
        {[...items, ...items].map((t, i) => (
          <span key={i} className="inline-flex items-center font-display uppercase text-xl tracking-tight px-8">
            {t} <span className="ml-8 opacity-40">/</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export const Hero = () => {
  return (
    <section className="relative bg-flow-ink text-flow-cream overflow-hidden">
      <div className="grid lg:grid-cols-2 min-h-[88vh]">
        <div className="relative order-2 lg:order-1 flex items-center px-6 sm:px-12 lg:px-20 py-16">
          <div className="max-w-xl animate-flow-rise">
            <p className="text-xs uppercase tracking-[0.4em] text-flow-yellow mb-6">/ FLOW · 2026</p>
            <h1 className="font-display uppercase text-balance leading-[0.85] text-6xl sm:text-7xl lg:text-8xl mb-8">
              stay in <span className="text-flow-yellow">flow</span>
            </h1>
            <p className="text-lg text-flow-cream/70 mb-10 max-w-md">
              Bebidas funcionais para quem vive em movimento. Energia limpa, ingredientes naturais, zero excessos.
              <span className="block mt-3 text-flow-cream/50 text-sm uppercase tracking-widest">your movement is our identity.</span>
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#products" className="inline-flex items-center gap-3 bg-flow-yellow text-flow-ink px-8 py-4 text-xs uppercase tracking-widest font-semibold hover:bg-flow-cream transition-colors">Comprar agora</a>
              <a href="#manifesto" className="inline-flex items-center gap-3 border border-flow-cream/30 text-flow-cream px-8 py-4 text-xs uppercase tracking-widest hover:border-flow-cream transition-colors">Manifesto</a>
            </div>
          </div>
        </div>
        <div className="relative order-1 lg:order-2 min-h-[40vh] lg:min-h-full">
          <img src={heroRunner} alt="Atleta em movimento" width={1920} height={1280} className="absolute inset-0 w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-flow-ink/20 to-flow-ink lg:bg-gradient-to-r lg:from-flow-ink/40 lg:via-transparent lg:to-transparent" />
        </div>
      </div>
      <Marquee />
    </section>
  );
};
