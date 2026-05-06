import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import grafismo from "@/assets/brand/drive/grafismo-2.svg";
import logo from "@/assets/brand/drive/flow-logo-1.svg";
import { openLeadCapture } from "./LeadCaptureModal";

export const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const logoScale = useTransform(scrollYProgress, [0, 0.8], [1, reduce ? 1 : 0.55]);
  const logoY = useTransform(scrollYProgress, [0, 0.8], [0, reduce ? 0 : -120]);
  const ringRot = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 40]);
  const ringScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.25]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <section ref={ref} className="relative h-[120vh] bg-flow-cream text-flow-ink">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
        <div className="flex-1 relative flex items-center justify-center">
          <motion.img
            src={grafismo} alt="" aria-hidden
            style={{ rotate: ringRot, scale: ringScale, opacity: 0.18 }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[110vmin] h-[110vmin] pointer-events-none select-none"
          />
          <motion.img
            src={logo} alt="flow — bebida funcional"
            style={{ scale: logoScale, y: logoY }}
            className="relative z-10 w-[78vw] max-w-[820px] h-auto select-none origin-center"
          />

          <motion.div style={{ opacity: textOpacity }} className="absolute left-6 md:left-12 bottom-12 md:bottom-16 max-w-sm z-20">
            <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-flow-ink/60 mb-3">/ lançamento · edição 01 · 2026</p>
            <h1 className="font-display lowercase text-4xl md:text-5xl leading-[0.95] mb-3 tracking-tight">
              sua hidratação<br/>funcional <span className="text-flow-ink/45">chegou.</span>
            </h1>
            <p className="font-sans text-sm md:text-base text-flow-ink/65 mb-6">
              Três packs · condição especial de lançamento · frete grátis no misto.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#packs" className="inline-flex items-center bg-flow-ink text-flow-cream px-6 py-3 font-sans text-[10px] uppercase tracking-[0.25em] font-semibold hover:bg-flow-yellow hover:text-flow-ink transition-colors">ver os packs</a>
              <button onClick={openLeadCapture} className="inline-flex items-center border border-flow-ink/30 px-6 py-3 font-sans text-[10px] uppercase tracking-[0.25em] hover:border-flow-ink transition-colors">cupom de lançamento</button>
            </div>
          </motion.div>

          <div className="absolute top-6 right-6 md:top-10 md:right-12 font-sans text-[10px] uppercase tracking-[0.3em] text-flow-ink/50 text-right z-20">
            <p>edição limitada</p>
            <p className="mt-1 text-flow-yellow">enquanto durar o estoque</p>
          </div>
        </div>

        <motion.div style={{ opacity: textOpacity }} className="absolute bottom-6 left-1/2 -translate-x-1/2 font-sans text-[10px] uppercase tracking-[0.4em] text-flow-ink/50">
          scroll ↓
        </motion.div>
      </div>
    </section>
  );
};
