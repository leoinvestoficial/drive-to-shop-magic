import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { CartDrawer } from "./CartDrawer";
import logo from "@/assets/brand/drive/flow-logo-1.svg";
import { openLeadCapture } from "./LeadCaptureModal";

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
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
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navItems = [
    { href: "#packs", label: "Packs" },
    { href: "#science", label: "Composição" },
    { href: "#faq", label: "FAQ" },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50">
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
            {navItems.map((item) => (
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
              className="shimmer-cta hidden sm:inline-flex items-center bg-flow-ink text-flow-cream px-3 py-2 md:px-4 font-sans text-[11px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.25em] font-semibold hover:bg-flow-yellow hover:text-flow-ink transition-colors whitespace-nowrap max-w-[140px]"
              style={{ padding: "8px 12px" }}
            >
              cupom <span className="tabular-nums ml-1">10%</span>
            </button>
            <CartDrawer />
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="abrir menu"
              className="md:hidden flex items-center justify-center w-10 h-10 text-flow-ink"
            >
              <Menu size={22} strokeWidth={1.5} />
            </button>
          </div>
        </div>
        {/* Reading-progress bar */}
        <div
          aria-hidden
          className="absolute left-0 bottom-0 h-[2px] bg-flow-yellow transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Mobile fullscreen drawer */}
      <div
        className={`md:hidden fixed inset-0 z-[60] bg-[#0A0A0A] text-flow-cream transition-transform duration-300 ease-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!menuOpen}
      >
        <button
          type="button"
          onClick={() => setMenuOpen(false)}
          aria-label="fechar menu"
          className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center text-flow-cream"
        >
          <X size={28} strokeWidth={1.5} />
        </button>
        <nav className="h-full flex flex-col items-center justify-center gap-8 font-display lowercase tracking-tight" style={{ fontSize: 28 }}>
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="hover:text-flow-yellow transition-colors"
            >
              {item.label.toLowerCase()}
            </a>
          ))}
          <button
            onClick={() => { setMenuOpen(false); openLeadCapture(); }}
            className="hover:text-flow-yellow transition-colors"
          >
            cupom 10%
          </button>
        </nav>
      </div>
    </header>
  );
};
