import { Link, useParams, Navigate } from "react-router-dom";
import { Header } from "@/components/flow/Header";
import { Footer } from "@/components/flow/Footer";
import { LeadCaptureModal, openLeadCapture } from "@/components/flow/LeadCaptureModal";
import { getPack } from "@/data/packs";

const Product = () => {
  const { id } = useParams();
  const pack = getPack(id);

  if (!pack) return <Navigate to="/" replace />;

  if (typeof document !== "undefined") {
    document.title = `${pack.name} · flow`;
  }

  return (
    <div className="min-h-screen flex flex-col bg-flow-cream text-flow-ink">
      <Header />
      <main className="flex-1 pt-24 md:pt-32 pb-16 md:pb-24 px-5 md:px-6">
        <div className="max-w-6xl mx-auto">
          <Link to="/#packs" className="font-sans text-[10px] uppercase tracking-[0.4em] text-flow-ink/50 hover:text-flow-ink transition-colors">← voltar aos packs</Link>

          <div className="mt-8 grid md:grid-cols-2 gap-8 md:gap-14 items-start">
            <div className="relative aspect-square md:aspect-[4/5] overflow-hidden bg-background border border-flow-ink/10">
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

              <p className="font-sans text-[15px] leading-relaxed text-flow-ink/80 mb-8">
                {pack.description}
              </p>

              <ul className="font-sans text-sm text-flow-ink/75 space-y-2 border-t border-flow-ink/10 pt-6 mb-8">
                {pack.details.map((d) => (
                  <li key={d} className="flex items-start gap-3">
                    <span className="inline-block w-1.5 h-1.5 bg-flow-yellow mt-2 shrink-0" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>

              <div className="flex items-end justify-between border-t border-flow-ink/10 pt-6 mb-6">
                <div>
                  <p className="font-sans text-[10px] uppercase tracking-widest text-flow-ink/40">por</p>
                  <p className="font-sans font-semibold text-4xl leading-none tracking-tight tabular-nums">{pack.price}</p>
                  {pack.freeShip && (
                    <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-flow-ink/60 mt-2">frete grátis incluso</p>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={openLeadCapture}
                  className="flex-1 inline-flex items-center justify-center bg-flow-ink text-flow-cream px-6 py-4 font-sans text-[10px] uppercase tracking-[0.25em] font-semibold hover:bg-flow-yellow hover:text-flow-ink transition-colors"
                >
                  comprar agora
                </button>
                <a
                  href="https://wa.me/5571999470825"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 inline-flex items-center justify-center border border-flow-ink/30 px-6 py-4 font-sans text-[10px] uppercase tracking-[0.25em] hover:border-flow-ink transition-colors"
                >
                  pedir pelo whatsapp
                </a>
              </div>

              <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-flow-ink/40 mt-6">
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