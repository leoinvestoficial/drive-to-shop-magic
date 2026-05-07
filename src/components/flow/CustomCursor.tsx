import { useEffect, useRef, useState } from "react";

/**
 * Cursor magnético: dot sólido 12px (flow-yellow) + outline 32px com lerp 0.1.
 * Outline escala 0.5x sobre links e botões. Desktop only.
 */
export const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Skip on touch devices and prefers-reduced-motion
    const isTouch = window.matchMedia("(hover: none)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reduce) return;
    setEnabled(true);

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const outline = { x: target.x, y: target.y };
    let raf = 0;
    let hovering = false;

    const tick = () => {
      outline.x += (target.x - outline.x) * 0.18;
      outline.y += (target.y - outline.y) * 0.18;
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${target.x - 6}px, ${target.y - 6}px, 0)`;
      if (outlineRef.current) {
        outlineRef.current.style.transform = `translate3d(${outline.x - 16}px, ${outline.y - 16}px, 0) scale(${hovering ? 0.5 : 1})`;
      }
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      const el = e.target as HTMLElement | null;
      hovering = !!el?.closest("a, button, [role='button'], input, textarea, select, label");
    };

    document.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);
    document.documentElement.style.cursor = "none";

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      document.documentElement.style.cursor = "";
    };
  }, []);

  if (!enabled) return null;
  return (
    <>
      <div
        ref={outlineRef}
        aria-hidden
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-flow-ink/60 pointer-events-none z-[100] mix-blend-difference will-change-transform transition-[width,height,border-color] duration-200"
        style={{ transitionProperty: "transform", transitionDuration: "0ms" }}
      />
      <div
        ref={dotRef}
        aria-hidden
        className="fixed top-0 left-0 w-3 h-3 rounded-full bg-flow-yellow pointer-events-none z-[100] will-change-transform"
      />
    </>
  );
};