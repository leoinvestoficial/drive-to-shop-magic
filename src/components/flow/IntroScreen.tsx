import logo from "@/assets/brand/drive/flow-logo-1.svg";
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
      <img
        src={logo}
        alt="flow"
        className="w-[140px] md:w-[180px] h-auto opacity-0 animate-[fade-in_0.8s_ease_0.2s_forwards]"
      />
      <button
        type="button"
        onClick={handleScroll}
        aria-label="role para descobrir"
        className="absolute left-1/2 -translate-x-1/2 bottom-8 md:bottom-10 flex flex-col items-center gap-2 min-w-[44px] min-h-[44px] justify-center"
      >
        <span
          className="font-sans uppercase"
          style={{ fontSize: 10, letterSpacing: "3px", color: "#999", fontWeight: 400 }}
        >
          role para descobrir
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#999"
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