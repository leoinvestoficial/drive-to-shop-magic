import waterTexture from "@/assets/brand/water-texture.jpg";

const pillars = [
  { num: "01", title: "dinâmico", text: "Foco, energia e ação em ritmo natural e potente. Nossa linguagem traduz intensidade, fluidez e progressão." },
  { num: "02", title: "simples", text: "Ingredientes funcionais, escolhas conscientes e zero excessos. Claro, eficiente e direto ao ponto." },
  { num: "03", title: "afluente", text: "A energia que chega para somar, impulsionar e expandir. Não substituímos seu fluxo, potencializamos." },
];

export const Pillars = () => (
  <section id="pillars" className="relative py-24 sm:py-32 bg-background overflow-hidden">
    <div className="absolute inset-x-0 top-0 h-32 opacity-20 bg-cover bg-center" style={{ backgroundImage: `url(${waterTexture})` }} aria-hidden />
    <div className="relative max-w-7xl mx-auto px-6">
      <div className="mb-16 max-w-2xl">
        <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground mb-4">/ pilares de marca</p>
        <h2 className="font-display uppercase text-5xl sm:text-6xl leading-[0.9]">o que sustenta o seu <span className="text-flow-water">flow</span>.</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-px bg-foreground/10">
        {pillars.map((p) => (
          <div key={p.num} className="bg-background p-10 group hover:bg-foreground hover:text-background transition-colors">
            <div className="flex items-baseline justify-between mb-8">
              <span className="font-display text-5xl text-flow-yellow">{p.num}</span>
              <span className="text-xs uppercase tracking-widest opacity-50">flow é</span>
            </div>
            <h3 className="font-display uppercase text-4xl mb-4">{p.title}</h3>
            <p className="text-sm leading-relaxed opacity-70 max-w-xs">{p.text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
