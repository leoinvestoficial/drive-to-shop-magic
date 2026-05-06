import logo from "@/assets/brand/drive/flow-logo-1.svg";

export const Footer = () => (
  <footer className="bg-flow-ink text-flow-cream py-12 md:py-16 px-5 md:px-6 border-t border-flow-cream/10">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
      <div>
        <img src={logo} alt="FLOW" className="h-16 md:h-20 w-auto mb-4 md:mb-6 [filter:invert(1)]" />
        <p className="font-sans text-sm text-flow-cream/60 max-w-xs">Bebidas funcionais. Movimento contínuo. Stay in flow.</p>
      </div>
      <div>
        <p className="font-sans text-xs uppercase tracking-widest text-flow-yellow mb-3 md:mb-4">Lançamento</p>
        <ul className="space-y-2 font-sans text-sm">
          <li><a href="#packs" className="hover:text-flow-yellow transition-colors">Packs</a></li>
          <li><a href="#science" className="hover:text-flow-yellow transition-colors">Composição</a></li>
          <li><a href="#faq" className="hover:text-flow-yellow transition-colors">FAQ</a></li>
        </ul>
      </div>
      <div>
        <p className="font-sans text-xs uppercase tracking-widest text-flow-yellow mb-3 md:mb-4">Contato</p>
        <ul className="space-y-2 font-sans text-sm text-flow-cream/70">
          <li>contato@flow.com</li>
          <li>@flow.bebidas</li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-10 md:mt-16 pt-6 md:pt-8 border-t border-flow-cream/10 flex flex-col md:flex-row gap-2 md:justify-between font-sans text-[10px] md:text-xs uppercase tracking-widest text-flow-cream/40">
      <span>© <span className="tabular-nums">2026</span> flow</span>
      <span>your movement is our identity</span>
    </div>
  </footer>
);
