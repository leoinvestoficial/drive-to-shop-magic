import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import productHero from "@/assets/brand/product-hero.jpg";

const benefits = [
  { n: "01", title: "Hidratação funcional", text: "Eletrólitos balanceados para reposição contínua." },
  { n: "02", title: "Energia limpa", text: "Cafeína natural em dose precisa. Sem picos." },
  { n: "03", title: "Foco sustentado", text: "L-teanina e adaptógenos para clareza mental." },
  { n: "04", title: "Rotina ativa", text: "Composição leve. Para todos os dias." },
  { n: "05", title: "Sabor leve", text: "Cítrico, seco e refrescante. Zero açúcar." },
];

export const StickyProduct = () => {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [-8, reduce ? -8 : 12]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.95]);

  return (
    <section ref={ref} id="benefits" className="relative bg-flow-cream text-flow-ink">
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-12">
        <p className="text-[10px] uppercase tracking-[0.4em] text-flow-ink/50 mb-3">/ 02 · benefícios</p>
        <h2 className="font-display uppercase text-5xl sm:text-7xl leading-[0.9] max-w-3xl">tudo o que você precisa.<br/><span className="text-flow-ink/40">nada além.</span></h2>
      </div>

      <div className="relative grid lg:grid-cols-2 max-w-7xl mx-auto px-6 gap-12">
        {/* Sticky product */}
        <div className="hidden lg:block">
          <div className="sticky top-24 h-[80vh] flex items-center justify-center">
            <motion.img
              src={productHero}
              alt="FLOW lata"
              loading="lazy"
              style={{ rotate, scale }}
              className="h-[70vh] w-auto object-contain drop-shadow-[0_40px_60px_rgba(0,0,0,0.2)]"
            />
          </div>
        </div>

        {/* Benefits list */}
        <div className="space-y-24 py-12 lg:py-32">
          {benefits.map((b) => (
            <motion.div
              key={b.n}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-150px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="border-t border-flow-ink/20 pt-8"
            >
              <div className="flex items-baseline justify-between mb-4">
                <span className="font-display text-5xl text-flow-yellow">{b.n}</span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-flow-ink/40">flow é</span>
              </div>
              <h3 className="font-display uppercase text-3xl sm:text-4xl mb-3">{b.title}</h3>
              <p className="text-flow-ink/60 max-w-md text-base">{b.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
