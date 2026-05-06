import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CartDrawer } from "./CartDrawer";
import logo from "@/assets/brand/drive/flow-logo-1.svg";
import { openLeadCapture } from "./LeadCaptureModal";

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
                <motion.img
                  src={logo}
                  alt="flow"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="h-7 w-auto"
                />
              )}
            </AnimatePresence>
          </Link>
          <nav className="hidden md:flex items-center gap-10 font-sans text-[10px] uppercase tracking-[0.3em] text-flow-ink">
            <a href="#packs" className="hover:text-flow-yellow transition-colors">Packs</a>
            <a href="#science" className="hover:text-flow-yellow transition-colors">Composição</a>
            <a href="#faq" className="hover:text-flow-yellow transition-colors">FAQ</a>
          </nav>
          <div className="flex items-center gap-3">
            <button
              onClick={openLeadCapture}
              className="hidden sm:inline-flex items-center bg-flow-ink text-flow-cream px-4 py-2 font-sans text-[10px] uppercase tracking-[0.25em] font-semibold hover:bg-flow-yellow hover:text-flow-ink transition-colors"
            >
              entrar no grupo
            </button>
            <CartDrawer />
          </div>
        </div>
      </div>
    </header>
  );
};
