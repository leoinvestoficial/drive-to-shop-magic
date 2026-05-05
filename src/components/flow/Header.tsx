import { Link } from "react-router-dom";
import logoMark from "@/assets/brand/flow-logo-mark.svg";
import { CartDrawer } from "./CartDrawer";

export const Header = () => {
  return (
    <header className="sticky top-0 z-40 bg-background/85 backdrop-blur-md border-b border-foreground/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-6">
        <Link to="/" className="flex items-center gap-2">
          <img src={logoMark} alt="FLOW" className="h-8 w-8" />
          <span className="font-display text-2xl uppercase tracking-tight">flow</span>
        </Link>
        <nav className="hidden md:flex items-center gap-10 text-xs uppercase tracking-widest">
          <a href="#products" className="hover:text-flow-yellow transition-colors">Produtos</a>
          <a href="#manifesto" className="hover:text-flow-yellow transition-colors">Manifesto</a>
          <a href="#pillars" className="hover:text-flow-yellow transition-colors">Pilares</a>
        </nav>
        <CartDrawer />
      </div>
    </header>
  );
};