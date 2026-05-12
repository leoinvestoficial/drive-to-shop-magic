import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Check, Zap } from "lucide-react";
import { packs } from "@/data/packs";

// estoques fictícios (placeholder — viram dados reais depois)
const STOCK: Record<string, number> = {
  "pack-1": 62,
  "pack-2": 47,
  "pack-3": 38,
};

const PackCTA = ({ id }: { id: string }) => {
  const [added, setAdded] = useState(false);
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
      }}
      className={`relative overflow-hidden w-full md:w-auto h-[48px] md:h-auto px-4 md:py-3.5 font-sans text-[11px] md:text-[10px] uppercase tracking-[0.25em] font-semibold transition-colors flex items-center justify-center ${
        added ? "bg-flow-green text-flow-ink" : "bg-flow-ink text-flow-cream group-hover:bg-flow-yellow group-hover:text-flow-ink"
      }`}
      aria-label={added ? "adicionado" : "adicionar pack"}
    >
      <span className={`flex items-center gap-2 transition-all duration-300 ${added ? "opacity-100" : "opacity-100"}`}>
        {added ? (
          <>
            adicionado
            <Check size={12} strokeWidth={2.5} className="animate-in zoom-in-50 duration-300" />
          </>
        ) : (
          "quero esse"
        )}
      </span>
    </button>
  );
};

export const LaunchPacks = () => (
  <section id="packs" className="bg-flow-cream text-flow-ink py-16 md:py-28 px-0 md:px-6">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:flex-wrap md:items-end md:justify-between gap-4 md:gap-6 mb-8 md:mb-12 px-5 md:px-0">
        <div>
          <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-flow-ink/50 mb-3">
            packs do lançamento
          </p>
          <h2 className="font-display lowercase text-[32px] sm:text-5xl md:text-6xl leading-[1] tracking-tight">
            três packs. <span className="text-flow-green">um preço.</span>
          </h2>
        </div>
        <p className="hidden md:block font-sans md:max-w-xs text-sm text-flow-ink/60">
          Condição de lançamento: <span className="text-flow-ink font-semibold tabular-nums">R$ 50,00</span> em qualquer pack. Frete grátis no misto.
        </p>
      </div>

      <div className="flex md:grid md:grid-cols-3 gap-4 md:gap-4 md:items-start overflow-x-auto md:overflow-visible snap-x snap-mandatory scroll-px-5 px-5 md:px-0 pb-4 md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {packs.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: 0.1 + i * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className={`${p.mdOrder} shrink-0 w-[85vw] md:w-auto snap-start`}
          >
          <Link
            to={`/pack/${p.id}`}
            className={`group relative bg-background flex flex-col h-full rounded-2xl md:rounded-none transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_30px_60px_-20px_hsl(var(--flow-ink)/0.35)] ${
              p.highlight
                ? "border-2 border-flow-ink shadow-[0_20px_60px_-20px_hsl(var(--flow-ink)/0.25)] md:mt-4"
                : "border border-flow-ink/10"
            }`}
          >
            {p.highlight && (
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                <span className="relative inline-flex items-center bg-flow-yellow text-flow-ink font-sans text-[10px] md:text-[9px] uppercase tracking-[0.25em] px-4 py-1.5 font-bold whitespace-nowrap shadow-[0_6px_18px_-6px_hsl(var(--flow-ink)/0.4)]">
                  mais escolhido
                  <span className="absolute inset-0 border-2 border-flow-yellow animate-pulse-ring pointer-events-none" />
                </span>
              </span>
            )}
            {p.highlight && (
              <span className="absolute top-3 right-3 z-20 inline-flex items-center gap-1.5 bg-flow-ink text-flow-yellow font-sans text-[9px] uppercase tracking-[0.25em] font-bold px-2.5 py-1 rounded-sm">
                <span className="inline-block w-1.5 h-1.5 bg-flow-yellow rounded-full" />
                frete grátis
              </span>
            )}
            <div className="relative h-[200px] md:h-auto md:aspect-[4/5] overflow-hidden bg-flow-cream flex items-center justify-center rounded-t-2xl md:rounded-none">
              <img
                src={p.img}
                alt={p.name}
                loading="lazy"
                className="w-full h-full object-contain md:object-cover md:absolute md:inset-0 transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-5 flex flex-col gap-4 flex-1">
              <div>
                <h3 className="font-display lowercase text-[22px] md:text-2xl font-bold tracking-tight">{p.name}</h3>
                <p className="font-sans text-[12px] text-[#999] mt-1 uppercase tracking-[1px]">{p.subtitle}</p>
                {p.freeShip && (
                  <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-flow-ink mt-2 flex items-center gap-2">
                    <span className="inline-block w-1.5 h-1.5 bg-flow-yellow" /> frete grátis incluso
                  </p>
                )}
              </div>
              <div className="mt-auto flex flex-col gap-3">
                <div className="flex items-end justify-between">
                  <div>
                  <p className="font-sans text-[10px] uppercase tracking-widest text-flow-ink/40">por</p>
                  <p className="font-sans font-bold text-[28px] md:text-3xl leading-none tracking-tight tabular-nums">R$ 50,00</p>
                  <p className="font-sans text-[11px] md:text-[10px] uppercase tracking-[0.2em] text-flow-ink/60 mt-2 flex items-center gap-1.5 whitespace-nowrap">
                    <Zap size={10} className="text-flow-yellow" fill="currentColor" />
                    apenas <span className="text-flow-yellow font-semibold tabular-nums">{STOCK[p.id] ?? 50}</span> restantes
                  </p>
                  </div>
                </div>
                <PackCTA id={p.id} />
              </div>
            </div>
          </Link>
          </motion.div>
        ))}
      </div>

      <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-flow-ink/40 text-center mt-10 px-5 md:px-0">
        edição limitada · enquanto durar o estoque
      </p>
    </div>
  </section>
);
