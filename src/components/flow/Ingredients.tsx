import { motion } from "framer-motion";
import { useReveal } from "@/hooks/useReveal";
import { CountUp } from "./CountUp";

// Ícones SVG line com draw-in via stroke-dasharray
const DrawIcon = ({ d, delay = 0 }: { d: string; delay?: number }) => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 md:w-7 md:h-7 text-flow-yellow flex-shrink-0" fill="none" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" stroke="currentColor" aria-hidden>
    <path
      d={d}
      style={{
        strokeDasharray: 100,
        strokeDashoffset: 100,
        animation: `draw-in 1.2s ease-out ${delay}s forwards`,
      }}
    />
  </svg>
);

const ICONS = {
  drop: "M12 3 C 8 9 6 13 6 16 a 6 6 0 0 0 12 0 C 18 13 16 9 12 3 z",
  bolt: "M13 3 L 5 14 L 11 14 L 9 21 L 17 10 L 11 10 L 13 3 z",
  leaf: "M5 19 C 5 11 11 5 19 5 C 19 13 13 19 5 19 z M5 19 C 9 15 13 13 17 11",
};

const rows = [
  { ingredient: "Eletrólitos", function: "Sódio · potássio · magnésio · zinco", benefit: "Reposição hídrica", icon: ICONS.drop },
  { ingredient: "Cafeína natural", function: "Extrato de guaraná", benefit: "Energia limpa", icon: ICONS.bolt },
  { ingredient: "Aromas naturais", function: "Sem extratos artificiais", benefit: "Sabor leve", icon: ICONS.leaf },
];

const IngredientRow = ({ r, i }: { r: typeof rows[number]; i: number }) => {
  const ref = useReveal<HTMLDivElement>({ threshold: 0.3 });
  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${i * 0.12}s`,
        opacity: 0,
        transform: "translateX(-40px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
      className="reveal-x flex flex-col md:grid md:grid-cols-12 gap-2 md:gap-4 py-6 md:py-8 border-b border-flow-cream/15 md:items-center"
    >
      <div className="flex items-center gap-3 md:contents">
        <span className="md:col-span-1 font-sans text-[10px] uppercase tracking-widest text-flow-cream/40 tabular-nums">
          <CountUp to={i + 1} />
        </span>
        <div className="md:col-span-4 flex items-center gap-3">
          <DrawIcon d={r.icon} delay={i * 0.12} />
          <span className="font-display lowercase text-2xl md:text-3xl tracking-tight">{r.ingredient}</span>
        </div>
      </div>
      <span className="md:col-span-4 font-sans text-sm text-flow-cream/60 pl-7 md:pl-0">{r.function}</span>
      <span className="md:col-span-3 font-sans text-[10px] md:text-sm uppercase tracking-widest text-flow-yellow md:text-right pl-7 md:pl-0 inline-block animate-highlight-pulse px-2 py-1">
        {r.benefit}
      </span>
    </div>
  );
};

export const Ingredients = () => (
  <section id="science" className="bg-flow-ink text-flow-cream py-16 md:py-28 px-5 md:px-6 overflow-hidden">
    <style>{`.reveal-x.is-visible { opacity: 1 !important; transform: translateX(0) !important; }`}</style>
    <div className="max-w-6xl mx-auto">
      <div className="grid md:grid-cols-12 gap-4 md:gap-8 mb-10 md:mb-12">
        <p className="md:col-span-3 font-sans text-[10px] uppercase tracking-[0.4em] text-flow-yellow">composição</p>
        <h2 className="md:col-span-9 font-display lowercase text-[2.5rem] sm:text-5xl md:text-6xl leading-[0.95] tracking-tight">
          composição limpa.<br/><span className="text-flow-cream/40">decisões claras.</span>
        </h2>
      </div>

      <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-start">
        <div className="md:col-span-8 border-t border-flow-cream/15">
          {rows.map((r, i) => (
            <IngredientRow key={r.ingredient} r={r} i={i} />
          ))}
        </div>

        {/* Diagrama infográfico da lata */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="hidden md:block md:col-span-4"
          aria-hidden
        >
          <svg viewBox="0 0 280 380" className="w-full h-auto">
            {/* Lata */}
            <ellipse cx="140" cy="40" rx="60" ry="10" fill="none" stroke="hsl(var(--flow-cream) / 0.4)" strokeWidth="1" />
            <rect x="80" y="40" width="120" height="280" fill="none" stroke="hsl(var(--flow-cream) / 0.4)" strokeWidth="1" />
            <ellipse cx="140" cy="320" rx="60" ry="10" fill="none" stroke="hsl(var(--flow-cream) / 0.4)" strokeWidth="1" />
            <text x="140" y="180" textAnchor="middle" fill="hsl(var(--flow-yellow))" fontFamily="Helvena, sans-serif" fontSize="22" fontWeight="700">flow</text>

            {/* Setas indicadoras */}
            <g fontFamily="Helvena, sans-serif" fontSize="9" letterSpacing="2" fill="hsl(var(--flow-cream) / 0.6)">
              <line x1="80" y1="100" x2="20" y2="100" stroke="hsl(var(--flow-yellow))" strokeWidth="1" />
              <circle cx="20" cy="100" r="2" fill="hsl(var(--flow-yellow))" />
              <text x="18" y="92" textAnchor="end">ELETRÓLITOS</text>

              <line x1="80" y1="180" x2="20" y2="180" stroke="hsl(var(--flow-yellow))" strokeWidth="1" />
              <circle cx="20" cy="180" r="2" fill="hsl(var(--flow-yellow))" />
              <text x="18" y="172" textAnchor="end">CAFEÍNA</text>

              <line x1="80" y1="260" x2="20" y2="260" stroke="hsl(var(--flow-yellow))" strokeWidth="1" />
              <circle cx="20" cy="260" r="2" fill="hsl(var(--flow-yellow))" />
              <text x="18" y="252" textAnchor="end">AROMAS</text>
            </g>

            <text x="140" y="365" textAnchor="middle" fill="hsl(var(--flow-cream) / 0.4)" fontFamily="Helvena, sans-serif" fontSize="8" letterSpacing="3">EDIÇÃO 01 · 269ML</text>
          </svg>
        </motion.div>
      </div>

      <p className="font-sans text-xs text-flow-cream/40 mt-8 max-w-md">
        Composição funcional. Não substitui alimentação balanceada nem orientação médica.
      </p>
    </div>
  </section>
);
