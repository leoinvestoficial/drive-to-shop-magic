import { motion, useReducedMotion, MotionValue, useTransform } from "framer-motion";
import canSrc from "@/assets/brand/can-flow.svg";

interface HeroCanProps {
  scrollYProgress?: MotionValue<number>;
  className?: string;
}

export const HeroCan = ({ scrollYProgress, className = "" }: HeroCanProps) => {
  const reduce = useReducedMotion();
  // tilt reativo ao scroll (não move sozinho fora do float)
  const tiltSource = scrollYProgress ?? new MotionValue<number>();
  const rotate = useTransform(tiltSource, [0, 1], [reduce ? 0 : -4, reduce ? 0 : 2]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotate }}
      className={`relative ${className}`}
    >
      <img
        src={canSrc}
        alt="lata flow — bebida funcional"
        loading="eager"
        className={`w-full h-auto drop-shadow-[0_30px_40px_rgba(15,15,15,0.25)] ${reduce ? "" : "animate-float"}`}
      />
    </motion.div>
  );
};