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
    <>
    {/* MOBILE — welcome screen + content screen */}
    <section className="md:hidden bg-flow-cream text-flow-ink">
      {/* Mobile: tudo em uma única tela */}
      <div className="relative min-h-[100svh] overflow-hidden flex flex-col px-5 pt-24 pb-10">
        {/* Grafismo de fundo com rotação contínua */}
        <motion.img
          src={grafismo} alt="" aria-hidden
          initial={{ opacity: 0, scale: 0.9 }}
          animate={reduce ? { opacity: 0.12, scale: 1 } : { opacity: 0.14, scale: [1, 1.06, 1], rotate: [0, 360] }}
          transition={reduce ? { duration: 1 } : {
            opacity: { duration: 1.4, ease: "easeOut" },
            scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 60, repeat: Infinity, ease: "linear" },
          }}
          className="absolute left-1/2 top-[28%] -translate-x-1/2 -translate-y-1/2 w-[140vmin] h-[140vmin] pointer-events-none select-none"
        />

        {/* Topo: edição + logo animado */}
        <div className="relative flex flex-col items-center text-center">
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-sans text-[10px] uppercase tracking-[0.4em] text-flow-ink/60 mb-6"
          >
            / edição <span className="tabular-nums">01</span> · <span className="tabular-nums">2026</span>
          </motion.p>

          <motion.img
            src={logo} alt="flow — bebida funcional"
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={reduce
              ? { opacity: 1, scale: 1, y: 0 }
              : { opacity: 1, scale: [1, 1.03, 1], y: 0 }}
            transition={reduce ? { duration: 0.9 } : {
              opacity: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
              y: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
              scale: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 },
            }}
            className="relative z-10 w-[72vw] max-w-[380px] h-auto select-none"
          />
        </div>

        {/* Conteúdo */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
          className="relative w-full mt-8"
        >
          <h1 className="font-display lowercase text-[2.25rem] leading-[0.95] mb-3 tracking-tight">
            sua hidratação<br/>funcional <span className="text-flow-green">chegou.</span>
          </h1>
          <p className="font-sans text-sm text-flow-ink/65 mb-5">
            Três packs · condição especial de lançamento · frete grátis no misto.
          </p>
          <div className="flex flex-col gap-2.5 mb-5">
            <a href="#packs" className="inline-flex items-center justify-center bg-flow-ink text-flow-cream px-6 py-3.5 font-sans text-[10px] uppercase tracking-[0.25em] font-semibold hover:bg-flow-yellow hover:text-flow-ink transition-colors">ver os packs</a>
            <button onClick={openLeadCapture} className="inline-flex items-center justify-center border border-flow-ink/30 px-6 py-3.5 font-sans text-[10px] uppercase tracking-[0.25em] hover:border-flow-ink transition-colors">cupom de <span className="tabular-nums ml-1">10%</span></button>
          </div>
          <div className="font-sans text-[10px] uppercase tracking-[0.3em] text-flow-ink/50 border-t border-flow-ink/10 pt-4 flex items-center justify-between">
            <span>edição limitada</span>
            <span className="text-flow-yellow">enquanto durar o estoque</span>
          </div>
        </motion.div>

        <motion.a
          href="#packs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-auto pt-6 flex flex-col items-center gap-1 text-flow-ink/55 hover:text-flow-ink transition-colors"
        >
          <span className="font-sans text-[9px] uppercase tracking-[0.4em]">role para descobrir</span>
          <motion.span
            animate={reduce ? {} : { y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="font-sans text-base"
          >↓</motion.span>
        </motion.a>
      </div>
    </section>

    {/* DESKTOP — original sticky/scroll-driven hero */}
    <section ref={ref} className="hidden md:block relative h-[120vh] bg-flow-cream text-flow-ink">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
        <div className="flex-1 relative flex items-start md:items-center justify-center pt-24 md:pt-0">
          <motion.img
            src={grafismo} alt="" aria-hidden
            style={{ rotate: ringRot, scale: ringScale, opacity: 0.18 }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vmin] h-[120vmin] md:w-[110vmin] md:h-[110vmin] pointer-events-none select-none"
          />
          <motion.img
            src={logo} alt="flow — bebida funcional"
            style={{ scale: logoScale, y: logoY }}
            className="relative z-10 w-[80vw] md:w-[78vw] max-w-[820px] h-auto select-none origin-top md:origin-center mt-0"
          />

          <motion.div style={{ opacity: textOpacity }} className="absolute left-5 right-5 md:right-auto md:left-12 bottom-12 md:bottom-16 md:max-w-sm z-20">
            <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-flow-ink/60 mb-3">/ lançamento · edição <span className="tabular-nums">01</span> · <span className="tabular-nums">2026</span></p>
            <h1 className="font-display lowercase text-[2.25rem] sm:text-4xl md:text-5xl leading-[0.95] mb-3 tracking-tight">
              sua hidratação<br/>funcional <span className="text-flow-green">chegou.</span>
            </h1>
            <p className="font-sans text-sm md:text-base text-flow-ink/65 mb-5 md:mb-6">
              Três packs · condição especial de lançamento · frete grátis no misto.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="#packs" className="inline-flex items-center justify-center bg-flow-ink text-flow-cream px-6 py-3.5 font-sans text-[10px] uppercase tracking-[0.25em] font-semibold hover:bg-flow-yellow hover:text-flow-ink transition-colors">ver os packs</a>
              <button onClick={openLeadCapture} className="inline-flex items-center justify-center border border-flow-ink/30 px-6 py-3.5 font-sans text-[10px] uppercase tracking-[0.25em] hover:border-flow-ink transition-colors">cupom de <span className="tabular-nums ml-1">10%</span></button>
            </div>
          </motion.div>

          <div className="hidden md:block absolute top-10 right-12 font-sans text-[10px] uppercase tracking-[0.3em] text-flow-ink/50 text-right z-20">
            <p>edição limitada</p>
            <p className="mt-1 text-flow-yellow">enquanto durar o estoque</p>
          </div>
        </div>

        <motion.a href="#packs" style={{ opacity: textOpacity }} className="hidden md:block absolute bottom-6 left-1/2 -translate-x-1/2 font-sans text-[10px] uppercase tracking-[0.4em] text-flow-ink/50 hover:text-flow-ink transition-colors">
          scroll ↓
        </motion.a>
      </div>
    </section>
    </>
  );
};
