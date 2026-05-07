import { motion, useScroll, useTransform, useReducedMotion, Variants } from "framer-motion";
import { useRef } from "react";
import grafismo from "@/assets/brand/drive/grafismo-2.svg";
import logo from "@/assets/brand/drive/flow-logo-1.svg";
import { openLeadCapture } from "./LeadCaptureModal";
import { HeroCan } from "./HeroCan";
import { WaterParticles } from "./WaterParticles";

const headlineWords = ["sua", "hidratação", "funcional", "chegou."];
const wordContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};
const wordItem: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const HeadlineReveal = ({ trigger = "mount" }: { trigger?: "mount" | "inView" }) => {
  const animateProps =
    trigger === "inView"
      ? { initial: "hidden", whileInView: "visible", viewport: { once: true, amount: 0.4 } }
      : { initial: "hidden", animate: "visible" };
  return (
    <motion.h1
      {...animateProps}
      variants={wordContainer}
      className="font-display lowercase text-[2.5rem] sm:text-4xl md:text-6xl leading-[0.95] mb-3 tracking-tight"
    >
      {headlineWords.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.25em]">
          <motion.span
            variants={wordItem}
            className={`inline-block ${w === "chegou." ? "text-flow-green" : ""}`}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </motion.h1>
  );
};

const ScrollIndicator = ({ opacity }: { opacity?: any }) => (
  <motion.a
    href="#packs"
    style={opacity ? { opacity } : undefined}
    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-flow-ink/60 hover:text-flow-ink transition-colors z-20"
  >
    <span className="font-sans text-[10px] uppercase tracking-[0.4em]">role para descobrir</span>
    <span className="relative flex items-center justify-center w-9 h-9 rounded-full border border-flow-ink/30">
      <span className="absolute inset-0 rounded-full border border-flow-ink/30 animate-ripple" />
      <span className="font-sans text-base animate-bounce-arrow">↓</span>
    </span>
  </motion.a>
);

export const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const logoScale = useTransform(scrollYProgress, [0, 0.8], [1, reduce ? 1 : 0.55]);
  const logoY = useTransform(scrollYProgress, [0, 0.8], [0, reduce ? 0 : -120]);
  const ringRot = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 40]);
  const ringScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.25]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  // MOBILE: motion 100% guiado pelo scroll — nada se move sozinho.
  const mobileRef = useRef<HTMLElement>(null);
  const { scrollYProgress: mScroll } = useScroll({ target: mobileRef, offset: ["start start", "end start"] });
  const mRingRot = useTransform(mScroll, [0, 1], [0, reduce ? 0 : 180]);
  const mRingScale = useTransform(mScroll, [0, 1], [1, reduce ? 1 : 1.4]);
  const mRingOpacity = useTransform(mScroll, [0, 0.5, 1], [0.16, 0.22, 0.04]);
  const mLogoScale = useTransform(mScroll, [0, 1], [1, reduce ? 1 : 0.7]);
  const mLogoY = useTransform(mScroll, [0, 1], [0, reduce ? 0 : -80]);
  const mLogoOpacity = useTransform(mScroll, [0, 0.7, 1], [1, 0.5, 0]);
  const mEyebrowOpacity = useTransform(mScroll, [0, 0.4], [1, 0]);

  return (
    <>
    {/* MOBILE — banner inicial limpo (só logo + grafismo) + bloco de conteúdo */}
    <section ref={mobileRef} className="md:hidden bg-flow-cream text-flow-ink">
      {/* Bloco 1: boas-vindas */}
      <div className="relative h-[100svh] overflow-hidden flex flex-col items-center justify-center px-5">
        <motion.img
          src={grafismo} alt="" aria-hidden
          style={{ rotate: mRingRot, scale: mRingScale, opacity: mRingOpacity }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[140vmin] h-[140vmin] pointer-events-none select-none"
        />

        <motion.p
          style={{ opacity: mEyebrowOpacity }}
          initial={{ y: -6 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute top-24 font-sans text-[10px] uppercase tracking-[0.4em] text-flow-ink/60"
        >
          / edição <span className="tabular-nums">01</span> · <span className="tabular-nums">2026</span>
        </motion.p>

        <motion.img
          src={logo} alt="flow — bebida funcional"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          style={{ scale: mLogoScale, y: mLogoY, opacity: mLogoOpacity }}
          className="relative z-10 w-[78vw] max-w-[420px] h-auto select-none"
        />

        <ScrollIndicator opacity={mEyebrowOpacity} />
      </div>

      {/* Bloco 2: conteúdo — lata + texto empilhados */}
      <div className="relative min-h-[100svh] px-5 py-16 overflow-hidden">
        <WaterParticles />
        <div className="relative z-10 w-full flex flex-col items-center">
          <HeroCan className="w-[55vw] max-w-[260px] mb-10" />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-sans text-[10px] uppercase tracking-[0.4em] text-flow-ink/60 mb-3"
          >
            / lançamento · edição <span className="tabular-nums">01</span> · <span className="tabular-nums">2026</span>
          </motion.p>
          <HeadlineReveal trigger="inView" />
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
          >
            <p className="font-sans text-base text-flow-ink/65 mb-6 mt-2">
              Três packs · condição especial de lançamento · frete grátis no misto.
            </p>
            <div className="flex flex-col gap-3 mb-8">
              <a href="#packs" className="inline-flex items-center justify-center bg-flow-ink text-flow-cream px-6 py-4 font-sans text-[10px] uppercase tracking-[0.25em] font-semibold hover:bg-flow-yellow hover:text-flow-ink transition-colors">ver os packs</a>
              <button onClick={openLeadCapture} className="inline-flex items-center justify-center border border-flow-ink/30 px-6 py-4 font-sans text-[10px] uppercase tracking-[0.25em] hover:border-flow-ink transition-colors">cupom de <span className="tabular-nums ml-1">10%</span></button>
            </div>
            <div className="font-sans text-[10px] uppercase tracking-[0.3em] text-flow-ink/50 border-t border-flow-ink/10 pt-5">
              <p>edição limitada</p>
              <p className="mt-1 text-flow-yellow">enquanto durar o estoque</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* DESKTOP — original sticky/scroll-driven hero */}
    <section ref={ref} className="hidden md:block relative h-[120vh] bg-flow-cream text-flow-ink">
      <div className="sticky top-0 h-screen overflow-hidden">
        <WaterParticles />
        <motion.img
          src={grafismo} alt="" aria-hidden
          style={{ rotate: ringRot, scale: ringScale, opacity: 0.18 }}
          className="absolute right-[-8vw] top-1/2 -translate-y-1/2 w-[80vmin] h-[80vmin] pointer-events-none select-none"
        />

        <div className="relative z-10 h-full grid grid-cols-2 items-center gap-8 px-12 lg:px-20">
          {/* Esquerda: texto */}
          <motion.div style={{ opacity: textOpacity }} className="max-w-xl">
            <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-flow-ink/60 mb-4">/ lançamento · edição <span className="tabular-nums">01</span> · <span className="tabular-nums">2026</span></p>
            <HeadlineReveal trigger="mount" />
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-sans text-sm md:text-base text-flow-ink/65 mb-6">
                Três packs · condição especial de lançamento · frete grátis no misto.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="#packs" className="inline-flex items-center justify-center bg-flow-ink text-flow-cream px-6 py-3.5 font-sans text-[10px] uppercase tracking-[0.25em] font-semibold hover:bg-flow-yellow hover:text-flow-ink transition-colors">ver os packs</a>
                <button onClick={openLeadCapture} className="inline-flex items-center justify-center border border-flow-ink/30 px-6 py-3.5 font-sans text-[10px] uppercase tracking-[0.25em] hover:border-flow-ink transition-colors">cupom de <span className="tabular-nums ml-1">10%</span></button>
              </div>
            </motion.div>
          </motion.div>

          {/* Direita: lata flutuante */}
          <div className="flex items-center justify-center">
            <HeroCan scrollYProgress={scrollYProgress} className="w-[55%] max-w-[360px]" />
          </div>
        </div>

        <div className="absolute top-10 right-12 font-sans text-[10px] uppercase tracking-[0.3em] text-flow-ink/50 text-right z-20">
          <p>edição limitada</p>
          <p className="mt-1 text-flow-yellow">enquanto durar o estoque</p>
        </div>

        <ScrollIndicator opacity={textOpacity} />
      </div>
    </section>
    </>
  );
};
