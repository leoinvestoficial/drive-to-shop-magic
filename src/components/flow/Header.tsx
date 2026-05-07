import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { CartDrawer } from "./CartDrawer";
import logo from "@/assets/brand/drive/flow-logo-1.svg";
import { openLeadCapture } from "./LeadCaptureModal";

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 80);
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docH > 0 ? Math.min(100, (y / docH) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-40">
      <div
        className={`transition-all duration-500 ${
          scrolled
            ? "bg-[hsl(var(--flow-cream)/0.85)] backdrop-blur-[12px] border-b border-flow-ink/10 shadow-[0_4px_24px_-12px_hsl(var(--flow-ink)/0.15)]"
            : "bg-flow-cream/70 backdrop-blur-sm md:bg-transparent md:backdrop-blur-none border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16 md:h-20 px-4 md:px-6">
          <Link to="/" className="flex items-center text-flow-ink group" aria-label="FLOW">
            <img
              src={logo}
              alt="flow"
              className="h-12 md:h-14 w-auto transition-transform duration-200 ease-out group-hover:scale-105"
            />
          </Link>
          <nav className="hidden md:flex items-center gap-10 font-sans text-[10px] uppercase tracking-[0.3em] text-flow-ink">
            {[
              { href: "#packs", label: "Packs" },
              { href: "#science", label: "Composição" },
              { href: "#faq", label: "FAQ" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="relative inline-block transition-colors hover:text-flow-yellow after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-flow-yellow after:transition-transform after:duration-300 hover:after:scale-x-100"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2 md:gap-3">
            <button
              onClick={openLeadCapture}
              className="shimmer-cta inline-flex items-center bg-flow-ink text-flow-cream px-3 py-2 md:px-4 font-sans text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.25em] font-semibold hover:bg-flow-yellow hover:text-flow-ink transition-colors whitespace-nowrap"
            >
              cupom <span className="tabular-nums ml-1">10%</span>
            </button>
            <CartDrawer />
          </div>
        </div>
        {/* Reading-progress bar */}
        <div
          aria-hidden
          className="absolute left-0 bottom-0 h-[2px] bg-flow-yellow transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </header>
  );
};
