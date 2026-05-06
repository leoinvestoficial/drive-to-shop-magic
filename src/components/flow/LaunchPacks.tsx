import { motion } from "framer-motion";
import { openLeadCapture } from "./LeadCaptureModal";
import lemon from "@/assets/brand/pack-lemon.jpg";
import orange from "@/assets/brand/pack-orange.jpg";
import mixed from "@/assets/brand/pack-mixed.jpg";

const packs = [
  { id: "lemon", name: "lemon fresh", subtitle: "6 latas · sabor limão", img: lemon, badge: "edição lançamento", freeShip: false },
  { id: "orange", name: "orange bliss", subtitle: "6 latas · sabor laranja", img: orange, badge: "edição lançamento", freeShip: false },
  { id: "mixed", name: "pack misto", subtitle: "3 lemon + 3 orange", img: mixed, badge: "mais escolhido", freeShip: true },
];

export const LaunchPacks = () => (
  <section id="packs" className="bg-flow-cream text-flow-ink py-20 md:py-28 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
        <div>
          <p className="text-[10px] uppercase tracking-[0.4em] text-flow-ink/50 mb-3">/ 02 · packs do lançamento</p>
          <h2 className="font-display lowercase text-4xl md:text-6xl leading-[0.9] tracking-tight">
            três packs. <span className="text-flow-ink/40">um preço.</span>
          </h2>
        </div>
        <p className="font-sans max-w-xs text-sm text-flow-ink/60">
          Condição de lançamento: <span className="text-flow-ink font-semibold">R$ 50</span> em qualquer pack. Frete grátis no misto.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {packs.map((p, i) => (
          <motion.article
            key={p.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="group bg-background border border-flow-ink/10 flex flex-col"
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-flow-cream">
              <img
                src={p.img}
                alt={p.name}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute top-3 left-3 bg-flow-ink text-flow-cream text-[9px] uppercase tracking-[0.25em] px-2 py-1">
                {p.badge}
              </span>
              {p.freeShip && (
                <span className="absolute top-3 right-3 bg-flow-yellow text-flow-ink text-[9px] uppercase tracking-[0.25em] px-2 py-1 font-bold">
                  frete grátis
                </span>
              )}
            </div>
            <div className="p-5 flex flex-col gap-4 flex-1">
              <div>
                <h3 className="font-display lowercase text-2xl tracking-tight">{p.name}</h3>
                <p className="text-xs text-flow-ink/55 mt-1 uppercase tracking-widest">{p.subtitle}</p>
              </div>
              <div className="mt-auto flex items-end justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-flow-ink/40">por</p>
                  <p className="font-display text-4xl leading-none">R$ 50</p>
                </div>
                <button
                  onClick={openLeadCapture}
                  className="bg-flow-ink text-flow-cream px-4 py-3 text-[10px] uppercase tracking-[0.25em] font-semibold hover:bg-flow-yellow hover:text-flow-ink transition-colors"
                >
                  quero esse
                </button>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      <p className="text-[10px] uppercase tracking-[0.3em] text-flow-ink/40 text-center mt-10">
        liberação progressiva · entrar no grupo garante a condição
      </p>
    </div>
  </section>
);
