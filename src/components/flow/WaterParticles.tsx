import { useReducedMotion } from "framer-motion";

const drops = Array.from({ length: 14 }).map((_, i) => {
  const seed = i * 37;
  return {
    left: (seed * 13) % 100,
    top: (seed * 7) % 100,
    size: 6 + ((seed * 3) % 14),
    delay: (i % 7) * 0.7,
    duration: 6 + ((seed * 5) % 6),
  };
});

export const WaterParticles = () => {
  const reduce = useReducedMotion();
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden z-0">
      {drops.map((d, i) => (
        <span
          key={i}
          className={reduce ? "" : "animate-drift"}
          style={{
            position: "absolute",
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.size,
            height: d.size,
            opacity: 0.15,
            animationDelay: `${d.delay}s`,
            animationDuration: `${d.duration}s`,
          }}
        >
          <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none">
            <path
              d="M12 2c3 5 6 9 6 13a6 6 0 1 1-12 0c0-4 3-8 6-13z"
              fill="hsl(var(--flow-water))"
            />
          </svg>
        </span>
      ))}
    </div>
  );
};