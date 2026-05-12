import { motion, useReducedMotion, MotionValue, useTransform, useMotionValue } from "framer-motion";
import canSrc from "@/assets/brand/can-lemon-real.png";

interface HeroCanProps {
  scrollYProgress?: MotionValue<number>;
  className?: string;
  imgClassName?: string;
}

export const HeroCan = ({ scrollYProgress, className = "", imgClassName = "" }: HeroCanProps) => {
  const reduce = useReducedMotion();
  const fallback = useMotionValue(0);
  const tiltSource = scrollYProgress ?? fallback;
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
        style={{ objectFit: "contain" }}
        className={`${imgClassName || "w-full h-auto"} object-contain drop-shadow-[0_30px_40px_rgba(15,15,15,0.25)] ${reduce ? "" : "animate-float"}`}
      />
    </motion.div>
  );
};