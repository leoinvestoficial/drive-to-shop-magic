import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { packs } from "@/data/packs";

export const LaunchPacks = () => (
  <section id="packs" className="bg-flow-cream text-flow-ink py-16 md:py-28 px-5 md:px-6">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:flex-wrap md:items-end md:justify-between gap-4 md:gap-6 mb-10 md:mb-12">
        <div>
          <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-flow-ink/50 mb-3">
            packs do lançamento
          </p>
          <h2 className="font-display lowercase text-[2.5rem] sm:text-5xl md:text-6xl leading-[0.9] tracking-tight">
            três packs. <span className="text-flow-green">um preço.</span>
          </h2>
        </div>
        <p className="font-sans md:max-w-xs text-sm text-flow-ink/60">
          Condição de lançamento: <span className="text-flow-ink font-semibold tabular-nums">R$ 50,00</span> em qualquer pack. Frete grátis no misto.
        </p>
      </div>

      <div className="flex flex-col md:grid md:grid-cols-3 gap-8 md:gap-4 md:items-start">
        {packs.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className={`${p.mdOrder}`}
          >
          <Link to={`/pack/${p.id}`} className={`group relative bg-background flex flex-col h-full ${p.highlight ? "border-2 border-flow-ink shadow-[0_20px_60px_-20px_hsl(var(--flow-ink)/0.25)] md:-mt-3" : "border border-flow-ink/10"}`}>
            {p.highlight && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-flow-yellow text-flow-ink font-sans text-[9px] uppercase tracking-[0.3em] px-3 py-1.5 font-bold whitespace-nowrap z-10">
                mais escolhido
              </span>
            )}
            <div className="relative aspect-square md:aspect-[4/5] overflow-hidden bg-flow-cream">
              <img
                src={p.img}
                alt={p.name}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-5 flex flex-col gap-4 flex-1">
              <div>
                <h3 className="font-display lowercase text-2xl tracking-tight">{p.name}</h3>
                <p className="font-sans text-xs text-flow-ink/55 mt-1 uppercase tracking-widest">{p.subtitle}</p>
                {p.freeShip && (
                  <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-flow-ink mt-2 flex items-center gap-2">
                    <span className="inline-block w-1.5 h-1.5 bg-flow-yellow" /> frete grátis incluso
                  </p>
                )}
              </div>
              <div className="mt-auto flex items-end justify-between">
                <div>
                  <p className="font-sans text-[10px] uppercase tracking-widest text-flow-ink/40">por</p>
                  <p className="font-sans font-semibold text-3xl leading-none tracking-tight tabular-nums">R$ 50,00</p>
                </div>
                <span className="bg-flow-ink text-flow-cream px-4 py-3.5 font-sans text-[10px] uppercase tracking-[0.25em] font-semibold group-hover:bg-flow-yellow group-hover:text-flow-ink transition-colors">
                  quero esse
                </span>
              </div>
            </div>
          </Link>
          </motion.div>
        ))}
      </div>

      <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-flow-ink/40 text-center mt-10">
        edição limitada · enquanto durar o estoque
      </p>
    </div>
  </section>
);
