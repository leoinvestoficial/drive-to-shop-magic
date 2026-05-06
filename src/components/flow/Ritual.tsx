import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import ritualHand from "@/assets/brand/water-pour.jpg";
import cyclist from "@/assets/brand/runners-track.jpg";
import focus from "@/assets/brand/glass-lemon.jpg";
import runner from "@/assets/brand/stairs-runner.jpg";

const moments = [
  { time: "06:00", label: "antes do treino", img: runner, text: "Hidratação leve. Foco antes do esforço." },
  { time: "09:30", label: "rotina ativa", img: cyclist, text: "Energia limpa para manter o pace." },
  { time: "13:00", label: "trabalho · foco", img: focus, text: "Clareza mental sem ansiedade." },
  { time: "18:00", label: "pós-treino", img: ritualHand, text: "Reposição funcional. Sabor leve." },
];

export const Ritual = () => {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-75%"]);

  return (
    <section ref={ref} id="ritual" className="relative bg-flow-cream text-flow-ink h-[400vh]">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
        <div className="px-6 md:px-16 pt-12 md:pt-20 mb-8 flex justify-between items-end">
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-flow-ink/50 mb-3">/ 04 · ritual</p>
            <h2 className="font-display lowercase text-4xl md:text-6xl leading-[0.9] tracking-tight">um dia em <span className="text-flow-ink/40">flow.</span></h2>
          </div>
          <p className="hidden md:block text-[10px] uppercase tracking-[0.3em] text-flow-ink/40">arraste · scroll →</p>
        </div>

        <motion.div style={{ x }} className="flex flex-1 will-change-transform">
          {moments.map((m, i) => (
            <div key={m.time} className="relative w-screen h-full flex-shrink-0 px-6 md:px-16 pb-12 flex flex-col">
              <div className="grid md:grid-cols-12 gap-6 h-full">
                <div className="md:col-span-7 relative bg-flow-ink overflow-hidden">
                  <img src={m.img} alt={m.label} loading="lazy" className="absolute inset-0 w-full h-full object-cover opacity-90" />
                </div>
                <div className="md:col-span-5 flex flex-col justify-between py-6">
                  <span className="font-display text-7xl md:text-9xl text-flow-ink leading-none">{m.time}</span>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-flow-ink/50 mb-2">/ 0{i + 1}</p>
                    <h3 className="font-display lowercase text-3xl md:text-4xl mb-4 tracking-tight">{m.label}</h3>
                    <p className="text-flow-ink/60 max-w-xs">{m.text}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
