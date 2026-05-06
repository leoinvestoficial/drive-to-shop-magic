import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import cyclist from "@/assets/brand/athlete-cyclist.jpg";

const words = ["ritmo.", "respiração.", "movimento.", "flow."];

export const Movement = () => {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : -80, reduce ? 0 : 80]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);

  return (
    <section ref={ref} id="movement" className="relative bg-flow-ink text-flow-cream overflow-hidden">
      <div className="relative h-[110vh] md:h-screen">
        <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0">
          <img src={cyclist} alt="Ciclista ao amanhecer" loading="lazy" className="w-full h-full object-cover opacity-60" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-flow-ink/40 via-transparent to-flow-ink" />

        <div className="relative z-10 h-full flex flex-col justify-between p-6 md:p-16">
          <p className="text-[10px] uppercase tracking-[0.4em] text-flow-yellow">/ 01 · movimento</p>

          <div className="max-w-3xl">
            <h2 className="font-display uppercase leading-[0.9] text-5xl sm:text-7xl md:text-8xl">
              {words.map((w, i) => (
                <motion.span
                  key={w}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="block"
                >
                  {i === words.length - 1 ? <span className="text-flow-yellow">{w}</span> : w}
                </motion.span>
              ))}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl">
            {["Energia controlada", "Hidratação inteligente", "Sem excessos"].map((t, i) => (
              <motion.p
                key={t}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="text-sm uppercase tracking-widest text-flow-cream/70 border-l border-flow-yellow pl-4"
              >
                {t}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
