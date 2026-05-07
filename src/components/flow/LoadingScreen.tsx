import { useEffect, useState } from "react";
import logo from "@/assets/brand/drive/flow-logo-1.svg";

const KEY = "flow_loaded_v1";

export const LoadingScreen = () => {
  // Mostra uma vez por sessão. Skip em prefers-reduced-motion.
  const [hidden, setHidden] = useState(() => {
    if (typeof window === "undefined") return true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
    return sessionStorage.getItem(KEY) === "1";
  });
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (hidden) return;
    document.body.style.overflow = "hidden";
    const fadeT = setTimeout(() => setFading(true), 1300);
    const removeT = setTimeout(() => {
      setHidden(true);
      sessionStorage.setItem(KEY, "1");
      document.body.style.overflow = "";
    }, 1800);
    return () => {
      clearTimeout(fadeT);
      clearTimeout(removeT);
      document.body.style.overflow = "";
    };
  }, [hidden]);

  if (hidden) return null;

  return (
    <div
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center bg-flow-cream transition-opacity duration-500 ${
        fading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <img src={logo} alt="flow" className="w-[60vw] max-w-[420px] h-auto mb-6 animate-in fade-in zoom-in-95 duration-700" />
      <span className="block h-px bg-flow-ink/80 origin-left animate-grow-x" style={{ width: "min(60vw, 420px)" }} />
    </div>
  );
};