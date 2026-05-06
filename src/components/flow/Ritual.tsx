import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import ritualHand from "@/assets/brand/water-pour.jpg";
import cyclist from "@/assets/brand/runners-track.jpg";
import focus from "@/assets/brand/pullups.jpg";
import runner from "@/assets/brand/stairs-runner.jpg";

const moments = [
  { time: "06:00", label: "antes do treino", img: runner, text: "Hidratação leve. Foco antes do esforço." },
  { time: "09:30", label: "rotina ativa", img: cyclist, text: "Energia limpa para manter o pace." },
  { time: "13:00", label: "trabalho · foco", img: focus, text: "Clareza mental sem ansiedade." },
  { time: "18:00", label: "pós-treino", img: ritualHand, text: "Reposição funcional. Sabor leve." },
];

const Header = () => (
  <div className="px-6 md:px-16 pt-12 md:pt-20 mb-8 flex justify-between items-end">
    <div>
      <p className="text-[10px] uppercase tracking-[0.4em] text-flow-ink/50 mb-3">/ 04 · ritual</p>
      <h2 className="font-display lowercase text-4xl md:text-6xl leading-[0.9] tracking-tight">
        um dia em <span className="text-flow-ink/40">flow.</span>
      </h2>
    </div>
  </div>
);

// Desktop: horizontal scroll synced to vertical scrollY
const RitualDesktop = () => {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // Move 3 panel-widths to the left (4 panels total = 75% translation)
  const x = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-75%"]);
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={ref} id="ritual" className="hidden lg:block relative bg-flow-cream text-flow-ink h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
        <Header />
        {/* progress bar */}
        <div className="px-6 md:px-16 mb-6">
          <div className="h-px bg-flow-ink/15 relative">
            <motion.div style={{ width: progress }} className="absolute inset-y-0 left-0 bg-flow-ink" />
          </div>
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
                    <p className="text-[10px] uppercase tracking-[0.3em] text-flow-ink/50 mb-2">/ 0{i + 1} de 0{moments.length}</p>
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

// Mobile/tablet: stacked vertical cards with parallax
const RitualMobile = () => (
  <section id="ritual" className="lg:hidden relative bg-flow-cream text-flow-ink">
    <Header />
    <div className="space-y-6 px-6 pb-16">
      {moments.map((m, i) => (
        <motion.article
          key={m.time}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative bg-flow-ink text-flow-cream overflow-hidden"
        >
          <div className="relative aspect-[4/5] overflow-hidden">
            <motion.img
              src={m.img}
              alt={m.label}
              loading="lazy"
              initial={{ scale: 1.1 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-flow-ink via-flow-ink/30 to-transparent" />
            <span className="absolute top-4 left-4 font-display text-6xl leading-none">{m.time}</span>
            <span className="absolute top-6 right-4 text-[10px] uppercase tracking-[0.3em] text-flow-cream/60">/ 0{i + 1}</span>
            <div className="absolute bottom-5 left-4 right-4">
              <h3 className="font-display lowercase text-2xl mb-2 tracking-tight">{m.label}</h3>
              <p className="text-flow-cream/70 text-sm">{m.text}</p>
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  </section>
);

export const Ritual = () => (
  <>
    <RitualDesktop />
    <RitualMobile />
  </>
);
