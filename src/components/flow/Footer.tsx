import { Link } from "react-router-dom";
import { useEffect, useState, FormEvent } from "react";
import { Instagram, Youtube, Music2, Lock, ArrowRight } from "lucide-react";
import logo from "@/assets/brand/drive/flow-logo-1.svg";
import { useReveal } from "@/hooks/useReveal";
import { toast } from "sonner";

const TAGLINE = "your movement is our identity";

const TypingTagline = () => {
  const ref = useReveal<HTMLSpanElement>({ threshold: 0.4 });
  const [text, setText] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started) {
          setStarted(true);
          let i = 0;
          const id = setInterval(() => {
            i++;
            setText(TAGLINE.slice(0, i));
            if (i >= TAGLINE.length) clearInterval(id);
          }, 45);
        }
      });
    }, { threshold: 0.4 });
    io.observe(node);
    return () => io.disconnect();
  }, [started, ref]);

  return (
    <span ref={ref} className="inline-flex items-center">
      <span>{text}</span>
      <span className="inline-block w-[1px] h-3 bg-flow-cream/60 ml-1 animate-caret-blink" />
    </span>
  );
};

export const Footer = () => {
  const [email, setEmail] = useState("");
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return toast.error("E-mail inválido");
    toast.success("Você está dentro do próximo drop.");
    setEmail("");
  };

  return (
  <footer className="bg-flow-ink text-flow-cream py-12 md:py-16 px-5 md:px-6 border-t border-flow-cream/10">
    <div className="max-w-7xl mx-auto flex justify-center mb-10 md:mb-12">
      <a href="#packs" className="flex flex-col items-center gap-2 text-flow-cream/60 hover:text-flow-yellow transition-colors">
        <span className="font-sans text-[10px] uppercase tracking-[0.4em]">ver os packs</span>
        <span className="font-sans text-base">↑</span>
      </a>
    </div>

    {/* Newsletter inline */}
    <div className="max-w-7xl mx-auto mb-12 md:mb-16 border-y border-flow-cream/10 py-8 md:py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-flow-yellow mb-2">newsletter</p>
        <p className="font-display lowercase text-2xl md:text-3xl">fique por dentro do próximo drop</p>
      </div>
      <form onSubmit={onSubmit} className="flex items-center gap-2 w-full md:w-auto md:min-w-[360px] border-b border-flow-cream/30 focus-within:border-flow-yellow transition-colors">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seu@email.com"
          className="bg-transparent flex-1 font-sans text-sm py-3 outline-none text-flow-cream placeholder:text-flow-cream/40"
        />
        <button
          type="submit"
          aria-label="Inscrever no newsletter"
          className="w-9 h-9 flex items-center justify-center text-flow-cream hover:text-flow-yellow hover:translate-x-1 transition-all"
        >
          <ArrowRight size={18} strokeWidth={1.5} />
        </button>
      </form>
    </div>

    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-12">
      <div className="sm:col-span-2 md:col-span-1">
        <img src={logo} alt="FLOW" className="h-16 md:h-20 w-auto mb-4 md:mb-6 [filter:invert(1)] opacity-70 hover:opacity-100 transition-opacity duration-300" />
        <p className="font-sans text-sm text-flow-cream/60 max-w-xs">Bebidas funcionais. Movimento contínuo. Stay in flow.</p>
        <div className="flex items-center gap-4 mt-5">
          {[
            { Icon: Instagram, href: "#", label: "Instagram" },
            { Icon: Music2, href: "#", label: "TikTok" },
            { Icon: Youtube, href: "#", label: "YouTube" },
          ].map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener"
              aria-label={label}
              className="text-flow-cream/60 hover:text-flow-yellow transition-all duration-200 hover:scale-125"
            >
              <Icon size={18} strokeWidth={1.5} />
            </a>
          ))}
        </div>
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

    {/* Pagamento + segurança */}
    <div className="max-w-7xl mx-auto mt-10 md:mt-12 pt-6 md:pt-8 border-t border-flow-cream/10 flex flex-col md:flex-row gap-4 md:items-center md:justify-between font-sans text-[10px] uppercase tracking-widest text-flow-cream/40">
      <div className="flex items-center gap-2">
        <Lock size={12} strokeWidth={1.5} />
        <span>pagamento seguro</span>
        <span className="ml-3 flex items-center gap-2 text-flow-cream/30 not-italic">
          <span className="px-1.5 py-0.5 border border-flow-cream/20 rounded-sm">VISA</span>
          <span className="px-1.5 py-0.5 border border-flow-cream/20 rounded-sm">MASTER</span>
          <span className="px-1.5 py-0.5 border border-flow-cream/20 rounded-sm">PIX</span>
        </span>
      </div>
      <div className="flex flex-col md:flex-row gap-1 md:gap-6">
        <span>© <span className="tabular-nums">2026</span> flow</span>
        <TypingTagline />
      </div>
    </div>
  </footer>
  );
};
