import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CartDrawer } from "./CartDrawer";

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.5);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-40">
      <div className={`transition-colors duration-500 ${scrolled ? "bg-flow-cream/90 backdrop-blur-md border-b border-flow-ink/10" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-6">
          <Link to="/" className="flex items-center gap-2 text-flow-ink">
            <AnimatePresence>
              {scrolled && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="font-display text-2xl uppercase tracking-tight leading-none"
                >
                  flow
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
          <nav className="hidden md:flex items-center gap-10 text-[10px] uppercase tracking-[0.3em] text-flow-ink">
            <a href="#benefits" className="hover:text-flow-yellow transition-colors">Benefícios</a>
            <a href="#science" className="hover:text-flow-yellow transition-colors">Ciência</a>
            <a href="#ritual" className="hover:text-flow-yellow transition-colors">Como usar</a>
            <a href="#products" className="hover:text-flow-yellow transition-colors">Comprar</a>
          </nav>
          <CartDrawer />
        </div>
      </div>
    </header>
  );
};
