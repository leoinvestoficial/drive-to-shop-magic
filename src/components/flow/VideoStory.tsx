import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Play, X } from "lucide-react";

interface VideoStoryProps {
  videoId?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

const getYouTubeId = (input: string) => {
  if (!input) return "";
  // Accept raw ID or full URL
  const m = input.match(/(?:youtu\.be\/|v=|\/embed\/|\/shorts\/)([A-Za-z0-9_-]{11})/);
  return m ? m[1] : input;
};

export const VideoStory = ({
  videoId = "dQw4w9WgXcQ",
  eyebrow = "por trás da flow",
  title = "uma bebida pensada para o seu ritmo.",
  description = "Conheça a história e o propósito por trás da edição 01. Hidratação funcional, ingredientes selecionados e um conceito que acompanha o seu movimento — do treino ao café.",
  ctaLabel = "conheça a marca",
  ctaHref = "#movimento",
}: VideoStoryProps) => {
  const id = getYouTubeId(videoId);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setPlaying(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [playing]);

  return (
    <section className="bg-flow-cream text-flow-ink py-16 md:py-28 px-5 md:px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-8 md:gap-12 items-center">
        {/* Vídeo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="md:col-span-7 relative aspect-video bg-flow-ink/90 overflow-hidden border border-flow-ink/10 group"
        >
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label="reproduzir vídeo"
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`}
              alt={title}
              loading="lazy"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
              }}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-[rgba(0,0,0,0.4)] group-hover:bg-[rgba(0,0,0,0.3)] transition-colors" />
            {/* Botão de play com 2 anéis pulsando */}
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-20 h-20 md:w-24 md:h-24">
              <span className="absolute inset-0 rounded-full bg-flow-cream/40 animate-pulse-ring" />
              <span className="absolute inset-0 rounded-full bg-flow-cream/30 animate-pulse-ring" style={{ animationDelay: "0.6s" }} />
              <span className="relative z-10 flex items-center justify-center w-full h-full rounded-full bg-flow-cream text-flow-ink shadow-[0_20px_60px_-20px_hsl(var(--flow-ink)/0.5)] group-hover:bg-flow-yellow transition-colors">
                <Play className="w-7 h-7 md:w-8 md:h-8 ml-1" fill="currentColor" />
              </span>
            </span>
            <span className="absolute bottom-4 left-4 font-sans text-[10px] uppercase tracking-[0.4em] text-flow-cream">
              play · vídeo
            </span>
          </button>
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

      {/* Lightbox */}
      <AnimatePresence>
        {playing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-md p-5"
            onClick={() => setPlaying(false)}
          >
            <button
              type="button"
              onClick={() => setPlaying(false)}
              aria-label="Fechar vídeo"
              className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center text-white hover:text-flow-yellow transition-colors"
            >
              <X size={22} />
            </button>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-5xl aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
