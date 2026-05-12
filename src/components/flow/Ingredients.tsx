import { motion } from "framer-motion";
import { useReveal } from "@/hooks/useReveal";
import { CountUp } from "./CountUp";
import canReal from "@/assets/brand/can-lemon-real.png";

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
      className="reveal-x py-4 md:py-8 md:grid md:grid-cols-12 md:gap-4 md:items-center border-b border-[#222] md:border-flow-cream/15"
    >
      {/* Mobile compact card */}
      <div className="md:hidden flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <span className="font-sans text-[11px] uppercase tracking-widest text-flow-cream/40 tabular-nums">
            <CountUp to={i + 1} />
          </span>
          <DrawIcon d={r.icon} delay={i * 0.12} />
          <span className="font-display lowercase text-[20px] tracking-tight">{r.ingredient}</span>
        </div>
        <p className="font-sans text-[13px] text-[#888] pl-9">{r.function}</p>
        <span className="self-start ml-9 font-sans text-[10px] uppercase tracking-[0.2em] text-flow-yellow border border-flow-yellow/30 px-2 py-1">
          {r.benefit}
        </span>
      </div>
      {/* Desktop layout */}
      <span className="hidden md:inline md:col-span-1 font-sans text-[10px] uppercase tracking-widest text-flow-cream/40 tabular-nums">
        <CountUp to={i + 1} />
      </span>
      <div className="hidden md:flex md:col-span-4 items-center gap-3">
        <DrawIcon d={r.icon} delay={i * 0.12} />
        <span className="font-display lowercase text-3xl tracking-tight">{r.ingredient}</span>
      </div>
      <span className="hidden md:inline md:col-span-4 font-sans text-sm text-flow-cream/60">{r.function}</span>
      <span className="hidden md:inline md:col-span-3 font-sans text-sm uppercase tracking-widest text-flow-yellow text-right animate-highlight-pulse px-2 py-1">
        {r.benefit}
      </span>
    </div>
  );
};

export const Ingredients = () => (
  <section id="science" className="bg-flow-ink text-flow-cream py-16 md:py-28 px-5 md:px-6 overflow-hidden">
    <style>{`.reveal-x.is-visible { opacity: 1 !important; transform: translateX(0) !important; }`}</style>
    <div className="max-w-6xl mx-auto">
      <div className="grid md:grid-cols-12 gap-3 md:gap-8 mb-6 md:mb-12">
        <p className="md:col-span-3 font-sans text-[10px] uppercase tracking-[0.4em] text-flow-yellow">composição</p>
        <h2 className="md:col-span-9 font-display lowercase text-[28px] sm:text-5xl md:text-6xl leading-[1.05] md:leading-[0.95] tracking-tight">
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
          className="hidden md:block md:col-span-4 relative"
          aria-hidden
        >
          {/* Foto real da lata + contorno técnico com anotações */}
          <div className="relative w-full aspect-[3/4] flex items-center justify-center">
            {/* halo sutil atrás */}
            <div
              className="absolute inset-0 m-auto w-[70%] h-[70%] rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at center, hsl(var(--flow-yellow) / 0.18) 0%, transparent 65%)",
              }}
            />
            <img
              src={canReal}
              alt=""
              loading="lazy"
              style={{ mixBlendMode: "lighten" }}
              className="relative z-[1] h-full w-auto object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)]"
            />
            {/* SVG overlay: contorno + linhas indicativas */}
            <svg
              viewBox="0 0 300 400"
              className="absolute inset-0 w-full h-full pointer-events-none"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Contorno estilizado da lata */}
              <g stroke="hsl(var(--flow-yellow))" strokeWidth="1" fill="none" opacity="0.7">
                <ellipse cx="150" cy="58" rx="48" ry="7" />
                <path d="M102 58 L102 350 Q102 360 110 362 L190 362 Q198 360 198 350 L198 58" />
                <ellipse cx="150" cy="350" rx="48" ry="7" opacity="0.4" />
              </g>
              {/* Linhas indicativas */}
              <g
                fontFamily="Helvena, ui-sans-serif, system-ui, sans-serif"
                fontSize="8"
                letterSpacing="2.5"
                fill="hsl(var(--flow-cream) / 0.85)"
              >
                {/* Eletrólitos — topo esquerda */}
                <g>
                  <line x1="102" y1="120" x2="40" y2="100" stroke="hsl(var(--flow-yellow))" strokeWidth="0.8" />
                  <circle cx="102" cy="120" r="2.5" fill="hsl(var(--flow-yellow))" />
                  <text x="38" y="92" textAnchor="end">ELETRÓLITOS</text>
                  <text x="38" y="104" textAnchor="end" fill="hsl(var(--flow-cream) / 0.5)" fontSize="7">SÓDIO · POTÁSSIO</text>
                </g>
                {/* Cafeína — meio esquerda */}
                <g>
                  <line x1="102" y1="210" x2="40" y2="210" stroke="hsl(var(--flow-yellow))" strokeWidth="0.8" />
                  <circle cx="102" cy="210" r="2.5" fill="hsl(var(--flow-yellow))" />
                  <text x="38" y="202" textAnchor="end">CAFEÍNA</text>
                  <text x="38" y="214" textAnchor="end" fill="hsl(var(--flow-cream) / 0.5)" fontSize="7">DO GUARANÁ</text>
                </g>
                {/* Aromas naturais — base esquerda */}
                <g>
                  <line x1="102" y1="300" x2="40" y2="320" stroke="hsl(var(--flow-yellow))" strokeWidth="0.8" />
                  <circle cx="102" cy="300" r="2.5" fill="hsl(var(--flow-yellow))" />
                  <text x="38" y="312" textAnchor="end">AROMAS NATURAIS</text>
                  <text x="38" y="324" textAnchor="end" fill="hsl(var(--flow-cream) / 0.5)" fontSize="7">SEM ARTIFICIAIS</text>
                </g>
                {/* Zero calorias — direita topo */}
                <g>
                  <line x1="198" y1="150" x2="260" y2="135" stroke="hsl(var(--flow-yellow))" strokeWidth="0.8" />
                  <circle cx="198" cy="150" r="2.5" fill="hsl(var(--flow-yellow))" />
                  <text x="262" y="127" textAnchor="start">ZERO CALORIAS</text>
                  <text x="262" y="139" textAnchor="start" fill="hsl(var(--flow-cream) / 0.5)" fontSize="7">100% NATURAL</text>
                </g>
                {/* 355 ml — direita base */}
                <g>
                  <line x1="198" y1="280" x2="260" y2="295" stroke="hsl(var(--flow-yellow))" strokeWidth="0.8" />
                  <circle cx="198" cy="280" r="2.5" fill="hsl(var(--flow-yellow))" />
                  <text x="262" y="287" textAnchor="start">355 ML</text>
                  <text x="262" y="299" textAnchor="start" fill="hsl(var(--flow-cream) / 0.5)" fontSize="7">EDIÇÃO 01</text>
                </g>
              </g>
            </svg>
          </div>
        </motion.div>
      </div>

      <p className="font-sans text-[12px] font-normal text-[#555] mt-8 max-w-md">
        Composição funcional. Não substitui alimentação balanceada nem orientação médica.
      </p>
    </div>
  </section>
);
