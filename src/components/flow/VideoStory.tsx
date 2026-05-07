import { motion } from "framer-motion";
import { useState } from "react";

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
          {playing ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
              title={title}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          ) : (
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
              <span className="absolute inset-0 bg-flow-ink/20 group-hover:bg-flow-ink/10 transition-colors" />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-flow-cream text-flow-ink shadow-[0_20px_60px_-20px_hsl(var(--flow-ink)/0.5)] group-hover:bg-flow-yellow transition-colors">
                <svg viewBox="0 0 24 24" className="w-7 h-7 md:w-8 md:h-8 ml-1" fill="currentColor" aria-hidden>
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              <span className="absolute bottom-4 left-4 font-sans text-[10px] uppercase tracking-[0.4em] text-flow-cream">
                play · vídeo
              </span>
            </button>
          )}
        </motion.div>

        {/* Texto */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="md:col-span-5"
        >
          <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-flow-ink/50 mb-4">
            {eyebrow}
          </p>
          <h2 className="font-display lowercase text-[2.25rem] md:text-5xl leading-[0.95] tracking-tight mb-5">
            {title}
          </h2>
          <p className="font-sans text-[15px] md:text-base text-flow-ink/70 leading-relaxed mb-8">
            {description}
          </p>
          <a
            href={ctaHref}
            className="inline-flex items-center gap-3 font-sans text-[10px] uppercase tracking-[0.3em] text-flow-ink border-b border-flow-ink/30 hover:border-flow-ink pb-1 transition-colors"
          >
            {ctaLabel} <span aria-hidden>→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};
