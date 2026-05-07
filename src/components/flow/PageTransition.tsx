import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";

/**
 * Page transition: overlay preto desliza de baixo (translateY 100% → 0)
 * antes do destino renderizar, depois sai (0 → -100%).
 */
export const PageTransition = () => {
  const location = useLocation();
  const first = useRef(true);
  const [phase, setPhase] = useState<"idle" | "in" | "out">("idle");

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setPhase("in");
    const t1 = setTimeout(() => setPhase("out"), 380);
    const t2 = setTimeout(() => setPhase("idle"), 760);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [location.pathname]);

  if (phase === "idle") return null;

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[150] bg-flow-ink pointer-events-none"
      style={{
        transform: phase === "in" ? "translateY(0)" : "translateY(-100%)",
        transition: "transform 0.38s cubic-bezier(0.76, 0, 0.24, 1)",
        willChange: "transform",
        ...(phase === "in" ? { animation: "slideUp 0.38s cubic-bezier(0.76, 0, 0.24, 1) both" } : {}),
      }}
    />
  );
};

// Inject keyframes once
if (typeof document !== "undefined" && !document.getElementById("page-transition-kf")) {
  const s = document.createElement("style");
  s.id = "page-transition-kf";
  s.textContent = `@keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }`;
  document.head.appendChild(s);
}