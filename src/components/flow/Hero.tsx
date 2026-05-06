import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import productHero from "@/assets/brand/product-hero.jpg";

export const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const logoScale = useTransform(scrollYProgress, [0, 0.6], [1, reduce ? 1 : 0.15]);
  const logoY = useTransform(scrollYProgress, [0, 0.6], [0, reduce ? 0 : -200]);
  const productY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -120]);
  const productRot = useTransform(scrollYProgress, [0, 1], [-4, reduce ? -4 : 6]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <section ref={ref} className="relative h-[180vh] bg-flow-cream text-flow-ink">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
        <div className="flex-1 relative grid grid-cols-12 items-center">
          {/* Giant FLOW logotype */}
          <motion.div
            style={{ scale: logoScale, y: logoY }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none origin-center"
          >
            <span className="font-display uppercase leading-none text-flow-ink select-none" style={{ fontSize: "clamp(8rem, 32vw, 28rem)", letterSpacing: "-0.04em" }}>
              flow
            </span>
          </motion.div>

          {/* Product can */}
          <motion.div
            style={{ y: productY, rotate: productRot }}
            className="col-span-12 md:col-start-8 md:col-span-4 relative z-10 flex justify-center md:justify-end pr-6 md:pr-12"
          >
            <img
              src={productHero}
              alt="FLOW lata branca com faixa amarelo lima"
              width={520}
              height={780}
              className="h-[55vh] md:h-[80vh] w-auto object-contain drop-shadow-[0_40px_60px_rgba(0,0,0,0.25)]"
            />
          </motion.div>

          {/* Side text */}
          <motion.div style={{ opacity: textOpacity }} className="absolute left-6 md:left-12 bottom-12 md:bottom-16 max-w-xs z-20">
            <p className="text-[10px] uppercase tracking-[0.4em] text-flow-ink/60 mb-3">/ FLOW · bebidas funcionais</p>
            <p className="font-display uppercase text-2xl md:text-3xl leading-[0.95] mb-6">stay in flow.<br/><span className="text-flow-ink/50">funcional para o seu ritmo.</span></p>
            <div className="flex gap-3">
              <a href="#products" className="inline-flex items-center bg-flow-ink text-flow-cream px-6 py-3 text-[10px] uppercase tracking-[0.25em] font-semibold hover:bg-flow-yellow hover:text-flow-ink transition-colors">comprar agora</a>
              <a href="#movement" className="inline-flex items-center border border-flow-ink/30 px-6 py-3 text-[10px] uppercase tracking-[0.25em] hover:border-flow-ink transition-colors">explorar</a>
            </div>
          </motion.div>

          {/* Top metadata */}
          <div className="absolute top-6 right-6 md:top-10 md:right-12 text-[10px] uppercase tracking-[0.3em] text-flow-ink/50 text-right z-20">
            <p>edição 01 · 2026</p>
            <p className="mt-1">your movement is our identity</p>
          </div>
        </div>

        {/* Scroll cue */}
        <motion.div style={{ opacity: textOpacity }} className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.4em] text-flow-ink/50">
          scroll ↓
        </motion.div>
      </div>
    </section>
  );
};
