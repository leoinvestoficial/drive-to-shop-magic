import { motion, useScroll, useTransform, useReducedMotion, MotionValue } from "framer-motion";
import { useRef } from "react";
import runners from "@/assets/brand/runners-track.jpg";

const words = ["ritmo.", "respiração.", "movimento.", "flow."];

const Word = ({
  word,
  index,
  total,
  scrollYProgress,
  highlight,
}: {
  word: string;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  highlight?: boolean;
}) => {
  const reduce = useReducedMotion();
  const start = 0.15 + (index / total) * 0.4;
  const end = start + 0.18;
  const opacity = useTransform(scrollYProgress, [start - 0.05, start, end], [0, 0.3, 1]);
  const blur = useTransform(scrollYProgress, [start - 0.05, end], [reduce ? 0 : 8, 0]);
  const y = useTransform(scrollYProgress, [start - 0.05, end], [reduce ? 0 : 30, 0]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);

  return (
    <motion.span
      style={{ opacity, y, filter }}
      className={`block ${
        highlight ? "text-flow-yellow [text-shadow:0_0_20px_hsl(var(--flow-yellow)/0.6)]" : ""
      }`}
    >
      {word}
    </motion.span>
  );
};

export const Movement = () => {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const mediaY = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : -60, reduce ? 0 : 60]);
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);

  return (
    <section ref={ref} id="movement" className="relative bg-flow-ink text-flow-cream overflow-hidden">
      <div className="relative min-h-[85svh] md:h-screen">
        <motion.div style={{ y: mediaY, scale: mediaScale }} className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={runners}
            className="w-full h-full object-cover opacity-70"
            aria-hidden
          >
            <source
              src="https://cdn.coverr.co/videos/coverr-running-on-the-beach-7770/1080p.mp4"
              type="video/mp4"
            />
          </video>
        </motion.div>
        {/* Gradiente radial: claro no centro, escuro nas bordas */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.75) 100%)",
          }}
        />
        {/* Grain/noise overlay */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-[0.08] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          }}
        />

        <div className="relative z-10 min-h-[85svh] md:h-full flex flex-col justify-between p-5 py-16 md:p-16 gap-10">
          <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-flow-yellow">movimento</p>

          <div className="max-w-3xl">
            <h2 className="font-display lowercase leading-[0.9] text-[3.25rem] sm:text-7xl md:text-8xl tracking-tight">
              {words.map((w, i) => (
                <Word
                  key={w}
                  word={w}
                  index={i}
                  total={words.length}
                  scrollYProgress={scrollYProgress}
                  highlight={i === words.length - 1}
                />
              ))}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl">
            {["Energia controlada", "Hidratação inteligente", "Sem excessos"].map((t, i) => (
              <motion.div
                key={t}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.15, duration: 0.6 }}
                className="relative pl-4"
              >
                <motion.span
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute left-0 top-0 bottom-0 w-px bg-flow-yellow origin-top"
                />
                <p className="font-sans text-xs md:text-sm uppercase tracking-widest text-flow-cream/70">{t}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
