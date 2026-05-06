import { motion } from "framer-motion";
import runner from "@/assets/brand/community-runner.jpg";
import swimmer from "@/assets/brand/community-swimmer.jpg";
import focus from "@/assets/brand/community-focus.jpg";
import cyclist from "@/assets/brand/athlete-cyclist.jpg";

const items = [
  { img: runner, tag: "@isa.runs", caption: "5km antes do trabalho." },
  { img: swimmer, tag: "@trio.maranhao", caption: "Open water. Domingo." },
  { img: cyclist, tag: "@bruno.rides", caption: "Pedal de 80km." },
  { img: focus, tag: "@design.studio", caption: "Sprint de 4h." },
];

export const Community = () => (
  <section id="community" className="bg-flow-ink text-flow-cream py-24 md:py-32 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-wrap items-end justify-between gap-6 mb-16">
        <div>
          <p className="text-[10px] uppercase tracking-[0.4em] text-flow-yellow mb-3">/ 06 · comunidade</p>
          <h2 className="font-display uppercase text-4xl md:text-6xl leading-[0.9] max-w-2xl">performance real.<br/><span className="text-flow-cream/40">rotinas reais.</span></h2>
        </div>
        <p className="text-flow-cream/60 max-w-sm text-sm">Pessoas que vivem em movimento. Sem pose, sem filtro. Apenas ritmo.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {items.map((it, i) => (
          <motion.figure
            key={it.tag}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className={i % 2 === 0 ? "md:translate-y-12" : ""}
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-flow-cream/5 group">
              <img src={it.img} alt={it.caption} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <figcaption className="mt-3 flex justify-between text-[10px] uppercase tracking-widest">
              <span className="text-flow-yellow">{it.tag}</span>
              <span className="text-flow-cream/50">{it.caption}</span>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </div>
  </section>
);
