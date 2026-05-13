import { motion } from "framer-motion";
import { Play } from "lucide-react";

interface VideoStoryProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export const VideoStory = ({
  eyebrow = "por trás da flow",
  title = "uma bebida pensada para o seu ritmo.",
  description = "Conheça a história e o propósito por trás da edição 01. Hidratação funcional, ingredientes selecionados e um conceito que acompanha o seu movimento — do treino ao café.",
  ctaLabel = "conheça a marca",
  ctaHref = "#movement",
}: VideoStoryProps) => {
  return (
    <section className="bg-flow-cream text-flow-ink py-16 md:py-28 px-5 md:px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-8 md:gap-12 items-center">
        {/* Player elegante (placeholder, sem terceiros) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="md:col-span-7 relative aspect-video overflow-hidden border border-flow-ink/10 group bg-flow-ink"
        >
          {/* Fundo sutil em radial pra dar profundidade sem usar imagem */}
          <span
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, hsl(var(--flow-ink) / 0.6) 0%, hsl(var(--flow-ink)) 70%)",
            }}
          />
          <button
            type="button"
            aria-label="assista ao filme da flow"
            className="relative z-10 w-full h-full flex flex-col items-center justify-center gap-5 md:gap-6 cursor-pointer"
          >
            <span className="relative flex items-center justify-center w-20 h-20 md:w-24 md:h-24">
              <span className="absolute inset-0 rounded-full border border-flow-cream/40 animate-pulse-ring" />
              <span
                className="absolute inset-0 rounded-full border border-flow-cream/30 animate-pulse-ring"
                style={{ animationDelay: "0.6s" }}
              />
              <span className="relative z-10 flex items-center justify-center w-full h-full rounded-full border-2 border-flow-cream text-flow-cream group-hover:bg-flow-yellow group-hover:border-flow-yellow group-hover:text-flow-ink transition-colors">
                <Play className="w-7 h-7 md:w-8 md:h-8 ml-1" fill="currentColor" />
              </span>
            </span>
            <span className="font-sans text-[11px] md:text-[12px] uppercase tracking-[0.4em] text-flow-cream group-hover:text-flow-yellow transition-colors">
              ▶ assista ao filme da flow
            </span>
          </button>
          <span className="absolute bottom-4 left-4 font-sans text-[10px] uppercase tracking-[0.4em] text-flow-cream/60 z-10">
            play · vídeo
          </span>
        </motion.div>

        {/* Texto */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ visible: { transition: { staggerChildren: 0.2, delayChildren: 0.1 } } }}
          className="md:col-span-5"
        >
          {[
            <p key="eb" className="font-sans text-[10px] uppercase tracking-[0.4em] text-flow-ink/50 mb-4">{eyebrow}</p>,
            <blockquote key="q" className="relative pl-5 mb-6 border-l-2 border-flow-yellow">
              <p className="font-display lowercase text-2xl md:text-3xl leading-tight tracking-tight">
                "feita para quem está em movimento."
              </p>
            </blockquote>,
            <h2 key="t" className="font-display lowercase text-[2.25rem] md:text-5xl leading-[0.95] tracking-tight mb-5">
              {title}
            </h2>,
            <p key="d" className="font-sans text-[15px] md:text-base text-flow-ink/70 leading-relaxed mb-8">
              {description}
            </p>,
            <a
              key="cta"
              href={ctaHref}
              className="group/cta inline-flex items-center gap-3 font-sans text-[10px] uppercase tracking-[0.3em] text-flow-ink border-b border-flow-ink/30 hover:border-flow-ink pb-1 transition-colors"
            >
              {ctaLabel}
              <span aria-hidden className="inline-block transition-transform duration-300 group-hover/cta:translate-x-1">→</span>
            </a>,
          ].map((child, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
              }}
            >
              {child}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
