import logo from "@/assets/brand/drive/flow-logo-1.svg";
import canLemon from "@/assets/brand/can-lemon-transparent.png";
import canOrange from "@/assets/brand/can-orange-transparent.png";
import { useEffect, useState } from "react";

export const IntroScreen = () => {
  const [fading, setFading] = useState(false);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    if (!mounted) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;
    const dismiss = () => {
      if (fading) return;
      setFading(true);
      document.body.style.overflow = "";
      window.setTimeout(() => {
        setMounted(false);
        document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
      }, 600);
    };
    const onWheel = (e: WheelEvent) => { if (e.deltaY > 0) dismiss(); };
    const onKey = (e: KeyboardEvent) => {
      if (["ArrowDown", "PageDown", "Space", " "].includes(e.key)) dismiss();
    };
    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => { touchStartY = e.touches[0].clientY; };
    const onTouchMove = (e: TouchEvent) => {
      if (touchStartY - e.touches[0].clientY > 10) dismiss();
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("keydown", onKey);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [fading, mounted]);

  if (!mounted) return null;

  const handleScroll = () => {
    if (fading) return;
    setFading(true);
    document.body.style.overflow = "";
    window.setTimeout(() => {
      setMounted(false);
      document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
    }, 600);
  };
  return (
    <section
      id="intro"
      className="fixed inset-0 z-[200] w-full overflow-hidden flex flex-col items-center justify-center bg-flow-cream transition-opacity duration-[600ms] ease-out"
      style={{ height: "100vh", opacity: fading ? 0 : 1, pointerEvents: fading ? "none" : "auto" }}
    >
      {/* Chuva de latas */}
      <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 9 }).map((_, i) => {
          const isOrange = i % 2 === 1;
          const left = (i * 11 + 5) % 95;
          const delay = (i % 5) * 0.6;
          const duration = 6 + (i % 3) * 1.2;
          const size = 60 + (i % 4) * 22;
          const rot = (i % 2 === 0 ? -1 : 1) * (4 + (i % 3) * 6);
          return (
            <span
              key={i}
              style={{
                left: `${left}%`,
                width: `${size}px`,
                animation: `can-fall ${duration}s linear ${delay}s infinite`,
              }}
              className="absolute -top-40 will-change-transform select-none block"
            >
              <img
                src={isOrange ? canOrange : canLemon}
                alt=""
                loading="eager"
                style={{
                  transform: `rotate(${rot}deg)`,
                  filter: "drop-shadow(0 12px 16px rgba(15,15,15,0.18))",
                }}
                className="w-full h-auto"
              />
            </span>
          );
        })}
      </div>
      <style>{`
        @keyframes can-fall {
          0%   { transform: translate3d(0, -20vh, 0); }
          100% { transform: translate3d(0, 130vh, 0); }
        }
      `}</style>

      <img
        src={logo}
        alt="flow"
        className="relative z-10 w-[240px] md:w-[340px] h-auto opacity-0 animate-[fade-in_0.8s_ease_0.2s_forwards]"
      />
      <button
        type="button"
        onClick={handleScroll}
        aria-label="role para descobrir"
        className="absolute z-10 left-1/2 -translate-x-1/2 bottom-16 md:bottom-20 flex flex-col items-center gap-2.5 min-w-[44px] min-h-[44px] justify-center"
      >
        <span
          className="font-sans uppercase"
          style={{ fontSize: 12, letterSpacing: "4px", color: "hsl(var(--flow-ink) / 0.85)", fontWeight: 500 }}
        >
          role para descobrir
        </span>
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="hsl(var(--flow-ink) / 0.85)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-intro-arrow"
          aria-hidden
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </button>
    </section>
  );
};