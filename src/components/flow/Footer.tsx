import logo from "@/assets/brand/drive/flow-logo-1.svg";

export const Footer = () => (
  <footer className="bg-flow-ink text-flow-cream py-16 px-6 border-t border-flow-cream/10">
    <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
      <div>
        <img src={logo} alt="FLOW" className="h-16 w-auto mb-6 [filter:invert(1)]" />
        <p className="text-sm text-flow-cream/60 max-w-xs">Bebidas funcionais. Movimento contínuo. Stay in flow.</p>
      </div>
      <div>
        <p className="text-xs uppercase tracking-widest text-flow-yellow mb-4">Loja</p>
        <ul className="space-y-2 text-sm">
          <li><a href="#products" className="hover:text-flow-yellow transition-colors">Produtos</a></li>
          <li><a href="#manifesto" className="hover:text-flow-yellow transition-colors">Manifesto</a></li>
          <li><a href="#pillars" className="hover:text-flow-yellow transition-colors">Pilares</a></li>
        </ul>
      </div>
      <div>
        <p className="text-xs uppercase tracking-widest text-flow-yellow mb-4">Contato</p>
        <ul className="space-y-2 text-sm text-flow-cream/70">
          <li>contato@flow.com</li>
          <li>@flow.bebidas</li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-flow-cream/10 flex justify-between text-xs uppercase tracking-widest text-flow-cream/40">
      <span>© 2026 flow</span>
      <span>your movement is our identity</span>
    </div>
  </footer>
);
