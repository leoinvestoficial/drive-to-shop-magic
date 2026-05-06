import { Link } from "react-router-dom";
import logo from "@/assets/brand/drive/flow-logo-1.svg";

export const Footer = () => (
  <footer className="bg-flow-ink text-flow-cream py-12 md:py-16 px-5 md:px-6 border-t border-flow-cream/10">
    <div className="max-w-7xl mx-auto flex justify-center mb-10 md:mb-12">
      <a href="#packs" className="flex flex-col items-center gap-2 text-flow-cream/60 hover:text-flow-yellow transition-colors">
        <span className="font-sans text-[10px] uppercase tracking-[0.4em]">ver os packs</span>
        <span className="font-sans text-base">↑</span>
      </a>
    </div>
    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-12">
      <div className="sm:col-span-2 md:col-span-1">
        <img src={logo} alt="FLOW" className="h-16 md:h-20 w-auto mb-4 md:mb-6 [filter:invert(1)]" />
        <p className="font-sans text-sm text-flow-cream/60 max-w-xs">Bebidas funcionais. Movimento contínuo. Stay in flow.</p>
      </div>
      <div>
        <p className="font-sans text-xs uppercase tracking-widest text-flow-yellow mb-3 md:mb-4">Lançamento</p>
        <ul className="space-y-2 font-sans text-sm">
          <li><a href="/#packs" className="hover:text-flow-yellow transition-colors">Packs</a></li>
          <li><a href="/#science" className="hover:text-flow-yellow transition-colors">Composição</a></li>
          <li><Link to="/faq" className="hover:text-flow-yellow transition-colors">FAQ</Link></li>
        </ul>
      </div>
      <div>
        <p className="font-sans text-xs uppercase tracking-widest text-flow-yellow mb-3 md:mb-4">Institucional</p>
        <ul className="space-y-2 font-sans text-sm">
          <li><Link to="/politica-de-privacidade" className="hover:text-flow-yellow transition-colors">Política de Privacidade</Link></li>
          <li><Link to="/termos-de-uso" className="hover:text-flow-yellow transition-colors">Termos de Uso</Link></li>
          <li><Link to="/politica-de-entrega" className="hover:text-flow-yellow transition-colors">Política de Entrega</Link></li>
          <li><Link to="/politica-de-troca-e-devolucao" className="hover:text-flow-yellow transition-colors">Troca e Devolução</Link></li>
          <li><Link to="/politica-de-cancelamento" className="hover:text-flow-yellow transition-colors">Cancelamento</Link></li>
        </ul>
      </div>
      <div>
        <p className="font-sans text-xs uppercase tracking-widest text-flow-yellow mb-3 md:mb-4">Contato</p>
        <ul className="space-y-2 font-sans text-sm text-flow-cream/70">
          <li>
            <a href="https://wa.me/5571999470825" target="_blank" rel="noopener" className="hover:text-flow-yellow transition-colors tabular-nums">
              WhatsApp (71) 99947-0825
            </a>
          </li>
          <li>
            <a href="mailto:contato@bebaflow.com" className="hover:text-flow-yellow transition-colors break-all">
              contato@bebaflow.com
            </a>
          </li>
          <li>
            <a href="https://instagram.com/flow.bebidas" target="_blank" rel="noopener" className="hover:text-flow-yellow transition-colors">
              @flow.bebidas
            </a>
          </li>
          <li className="pt-1"><Link to="/contato" className="font-semibold uppercase tracking-widest text-[10px] hover:text-flow-yellow transition-colors">fale com a flow →</Link></li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-10 md:mt-16 pt-6 md:pt-8 border-t border-flow-cream/10 flex flex-col md:flex-row gap-2 md:justify-between font-sans text-[10px] md:text-xs uppercase tracking-widest text-flow-cream/40">
      <span>© <span className="tabular-nums">2026</span> flow</span>
      <span>your movement is our identity</span>
    </div>
  </footer>
);
