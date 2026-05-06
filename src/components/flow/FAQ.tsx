import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "Como funciona a condição de lançamento?", a: "Quem entra no grupo de WhatsApp recebe primeiro o link com pack de 6 latas por R$ 50. Liberação progressiva — depois subimos para o público geral." },
  { q: "Tem cafeína?", a: "Sim. Cafeína natural extraída do guaraná, em dose moderada. Energia limpa, sem pico." },
  { q: "Tem açúcar?", a: "Zero açúcar adicionado. Aromas naturais, sem extratos artificiais." },
  { q: "Qual o prazo de entrega?", a: "2 a 5 dias úteis para todo Brasil. Frete grátis no pack misto." },
];

export const FAQ = () => (
  <section id="faq" className="bg-flow-cream text-flow-ink py-20 md:py-28 px-6">
    <div className="max-w-4xl mx-auto">
      <div className="grid md:grid-cols-12 gap-8 mb-10">
        <p className="md:col-span-3 text-[10px] uppercase tracking-[0.4em] text-flow-ink/50">/ 05 · faq</p>
        <h2 className="md:col-span-9 font-display lowercase text-4xl md:text-6xl leading-[0.9] tracking-tight">
          perguntas <span className="text-flow-ink/40">frequentes.</span>
        </h2>
      </div>
      <Accordion type="single" collapsible className="border-t border-flow-ink/15">
        {faqs.map((f, i) => (
          <AccordionItem key={i} value={`f-${i}`} className="border-b border-flow-ink/15">
            <AccordionTrigger className="text-left font-display lowercase text-xl md:text-2xl py-6 hover:no-underline hover:text-flow-yellow tracking-tight">
              <span className="flex gap-6 items-baseline">
                <span className="font-sans text-xs text-flow-ink/40 tracking-widest">0{i + 1}</span>
                {f.q}
              </span>
            </AccordionTrigger>
            <AccordionContent className="font-sans text-flow-ink/65 text-base pl-12 pb-8 max-w-2xl">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);
