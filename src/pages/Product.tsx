import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, MessageCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { Header } from "@/components/flow/Header";
import { Footer } from "@/components/flow/Footer";
import { LeadCaptureModal } from "@/components/flow/LeadCaptureModal";
import { getPack } from "@/data/packs";
import { addPackToCart } from "@/lib/addPackToCart";
import { useCartStore } from "@/stores/cartStore";

const Product = () => {
  const { id } = useParams();
  const pack = getPack(id);
  const [loading, setLoading] = useState(false);
  const getCheckoutUrl = useCartStore((s) => s.getCheckoutUrl);

  if (!pack) return <Navigate to="/" replace />;

  if (typeof document !== "undefined") {
    document.title = `${pack.name} · flow`;
  }

  const handleBuy = async () => {
    if (loading) return;
    setLoading(true);
    const ok = await addPackToCart(pack);
    setLoading(false);
    if (ok) {
      const url = getCheckoutUrl();
      if (url) window.open(url, "_blank");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-flow-cream text-flow-ink">
      <Header />
      <main className="flex-1 pt-24 md:pt-32 pb-16 md:pb-24 px-5 md:px-6">
        <div className="max-w-6xl mx-auto">
          <Link to="/#packs" className="inline-flex items-center gap-1.5 font-sans text-[13px] text-[#999] hover:text-flow-ink transition-colors">
            <ArrowLeft size={14} strokeWidth={1.5} /> voltar
          </Link>

          <div className="mt-8 grid md:grid-cols-2 gap-8 md:gap-14 items-start">
            <div className="relative w-full aspect-square md:aspect-[4/5] overflow-hidden bg-[#f5f3ee] md:bg-background border border-flow-ink/10 rounded-2xl md:rounded-none">
              <img src={pack.img} alt={pack.name} className="absolute inset-0 w-full h-full object-cover" />
              {pack.highlight && (
                <span className="absolute top-4 left-4 bg-flow-yellow text-flow-ink font-sans text-[9px] uppercase tracking-[0.3em] px-3 py-1.5 font-bold">
                  mais escolhido
                </span>
              )}
            </div>

            <div>
              <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-flow-ink/50 mb-3">edição 01 · 2026</p>
              <h1 className="font-display lowercase text-[2.5rem] md:text-6xl leading-[0.9] tracking-tight mb-3">
                {pack.name}
              </h1>
              <p className="font-sans text-sm uppercase tracking-widest text-flow-ink/55 mb-6">{pack.subtitle}</p>

              <ul className="font-sans text-[14px] text-flow-ink/80 border-t border-flow-ink/10 pt-6 mb-8 flex flex-col gap-2">
                {pack.details.map((d) => (
                  <li key={d} className="flex items-start gap-2">
                    <span className="text-flow-green font-bold mt-0.5 shrink-0">✓</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>

              <div className="flex items-end justify-between border-t border-flow-ink/10 pt-6 mb-6">
                <div className="flex items-baseline gap-2 whitespace-nowrap">
                  <span className="font-sans text-[11px] uppercase tracking-widest text-flow-ink/40">por</span>
                  <span className="font-sans font-bold text-[32px] leading-none tracking-tight tabular-nums">{pack.price}</span>
                </div>
                  {pack.freeShip && (
                    <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-flow-ink/60">frete grátis</p>
                  )}
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={handleBuy}
                  disabled={loading}
                  className="w-full h-[56px] rounded-lg inline-flex items-center justify-center bg-[#0A0A0A] text-white font-sans text-[11px] uppercase tracking-[0.25em] font-semibold hover:bg-flow-yellow hover:text-flow-ink transition-colors"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "comprar agora"}
                </button>
                <a
                  href="https://wa.me/5571999470825"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full h-[48px] inline-flex items-center justify-center gap-2 border border-[#0A0A0A] text-[#0A0A0A] font-sans text-[11px] uppercase tracking-[0.25em] hover:bg-flow-ink hover:text-flow-cream transition-colors"
                >
                  <MessageCircle size={18} strokeWidth={1.5} />
                  pedir pelo whatsapp
                </a>
              </div>

              <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-flow-ink/40 mt-4">
                edição limitada · enquanto durar o estoque
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <LeadCaptureModal />
    </div>
  );
};

export default Product;