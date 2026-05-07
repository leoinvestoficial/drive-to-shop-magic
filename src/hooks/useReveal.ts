import { useEffect, useRef } from "react";

/**
 * Adds `is-visible` class when the element enters the viewport.
 * Pair with the `.reveal` utility (opacity:0 + translateY:30px → 0).
 */
export const useReveal = <T extends HTMLElement = HTMLDivElement>(
  options: IntersectionObserverInit = { threshold: 0.15 }
) => {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      node.classList.add("is-visible");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      options
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return ref;
};