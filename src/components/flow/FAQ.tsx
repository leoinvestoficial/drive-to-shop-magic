import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useMemo, useState } from "react";
import { Search, MessageCircle } from "lucide-react";

const faqs = [
  { q: "O que é a FLOW?", a: "FLOW é uma bebida funcional brasileira pensada para hidratar, energizar e manter o foco — sem açúcar adicionado e com ingredientes naturais." },
  { q: "Como funciona a condição de lançamento?", a: "Quem se cadastra recebe o cupom FLOW10 (10% off) por e-mail e fica sabendo dos próximos lotes antes do público geral." },
  { q: "Tem cafeína?", a: "Sim. Cafeína natural extraída do guaraná, em dose moderada. Energia limpa, sem pico." },
  { q: "Tem açúcar?", a: "Zero açúcar adicionado. Aromas naturais, sem extratos artificiais." },
  { q: "Quem pode consumir?", a: "Adultos saudáveis. Não recomendado para gestantes, lactantes, menores de 16 anos e pessoas sensíveis à cafeína. Em caso de dúvida, consulte um profissional de saúde." },
  { q: "Qual a diferença para um energético?", a: "FLOW combina hidratação funcional, eletrólitos e cafeína natural em dose moderada. Não é um energético tradicional: é energia limpa sem pico nem queda." },
  { q: "Qual o prazo de entrega?", a: "2 a 5 dias úteis para todo Brasil. Frete grátis no pack misto." },
];

const highlight = (text: string, query: string) => {
  if (!query.trim()) return text;
  const escaped = query.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = text.split(new RegExp(`(${escaped})`, "ig"));
  return parts.map((p, i) =>
    p.toLowerCase() === query.trim().toLowerCase() ? (
      <mark key={i} className="bg-flow-yellow/40 text-flow-ink px-0.5">{p}</mark>
    ) : (
      <span key={i}>{p}</span>
    )
  );
};

export const FAQ = () => {
  const [query, setQuery] = useState("");
  const [openItem, setOpenItem] = useState<string>("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return faqs.map((f, i) => ({ ...f, idx: i }));
    return faqs
      .map((f, i) => ({ ...f, idx: i }))
      .filter((f) => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q));
  }, [query]);

  return (
  <section id="faq" className="bg-flow-cream text-flow-ink py-16 md:py-28 px-5 md:px-6">
    <div className="max-w-4xl mx-auto">
      <div className="grid md:grid-cols-12 gap-4 md:gap-8 mb-8 md:mb-10">
        <p className="md:col-span-3 font-sans text-[10px] uppercase tracking-[0.4em] text-flow-ink/50">faq</p>
        <h2 className="md:col-span-9 font-display lowercase text-[2.5rem] sm:text-5xl md:text-6xl leading-[0.9] tracking-tight">
          perguntas <span className="text-flow-green">frequentes.</span>
        </h2>
      </div>

      {/* Busca rápida */}
      <div className="relative mb-8 md:mb-10">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-flow-ink/40" strokeWidth={1.5} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar pergunta..."
          className="w-full bg-transparent border border-flow-ink/20 focus:border-flow-ink py-3 pl-10 pr-4 font-sans text-sm outline-none transition-colors placeholder:text-flow-ink/40"
        />
      </div>

      <Accordion
        type="single"
        collapsible
        value={openItem}
        onValueChange={setOpenItem}
        className="border-t border-flow-ink/15"
      >
        {filtered.map((f) => {
          const value = `f-${f.idx}`;
          const isOpen = openItem === value;
          return (
            <AccordionItem key={f.idx} value={value} className="border-b border-flow-ink/15">
              <AccordionTrigger className="text-left font-display lowercase text-lg md:text-2xl py-5 md:py-6 hover:no-underline hover:text-flow-yellow tracking-tight">
                <span className="flex gap-4 md:gap-6 items-baseline pr-2">
                  <span
                    className={`font-sans text-xs tracking-widest tabular-nums shrink-0 transition-colors ${
                      isOpen ? "text-flow-yellow" : "text-flow-ink/40"
                    }`}
                  >
                    {String(f.idx + 1).padStart(2, "0")}
                  </span>
                  <span>{highlight(f.q, query)}</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="font-sans text-flow-ink/65 text-sm md:text-base pl-9 md:pl-12 pb-6 md:pb-8 max-w-2xl">
                <span className="block animate-in fade-in slide-in-from-top-1 duration-300">
                  {highlight(f.a, query)}
                </span>
              </AccordionContent>
            </AccordionItem>
          );
        })}
        {filtered.length === 0 && (
          <p className="font-sans text-sm text-flow-ink/50 py-8 text-center">
            Nenhuma pergunta encontrada para "{query}".
          </p>
        )}
      </Accordion>

      {/* CTA WhatsApp */}
      <div className="mt-12 md:mt-16 border-t border-flow-ink/15 pt-10 md:pt-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-flow-ink/50 mb-2">ainda tem dúvidas?</p>
          <p className="font-display lowercase text-2xl md:text-3xl tracking-tight">fale com a gente.</p>
        </div>
        <a
          href="https://wa.me/5571999470825"
          target="_blank"
          rel="noopener"
          className="group inline-flex items-center gap-3 bg-flow-ink text-flow-cream px-6 py-4 font-sans text-[10px] uppercase tracking-[0.25em] font-semibold hover:bg-flow-yellow hover:text-flow-ink transition-colors"
        >
          <MessageCircle size={16} strokeWidth={1.5} className="transition-transform duration-300 group-hover:rotate-12" />
          falar no whatsapp
        </a>
      </div>
    </div>
  </section>
  );
};
