import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "Tem cafeína?", a: "Sim. 80mg de cafeína natural por lata, equivalente a um café espresso. Dose precisa, sem picos." },
  { q: "Tem açúcar?", a: "Zero açúcar adicionado. Adoçado naturalmente com extratos cítricos." },
  { q: "Posso tomar todo dia?", a: "Sim. A composição foi pensada para rotinas ativas e consumo diário." },
  { q: "Como funciona a assinatura?", a: "Você escolhe a frequência (mensal ou quinzenal), recebe em casa e cancela quando quiser. 15% off em todos os pedidos." },
  { q: "Qual o prazo de entrega?", a: "2 a 5 dias úteis para todo Brasil. Frete grátis acima de R$ 199." },
  { q: "Substitui água?", a: "Não. FLOW complementa sua hidratação com eletrólitos e função, mas água continua sendo essencial." },
];

export const FAQ = () => (
  <section id="faq" className="bg-flow-cream text-flow-ink py-24 md:py-32 px-6">
    <div className="max-w-4xl mx-auto">
      <div className="grid md:grid-cols-12 gap-8 mb-12">
        <p className="md:col-span-3 text-[10px] uppercase tracking-[0.4em] text-flow-ink/50">/ 07 · faq</p>
        <h2 className="md:col-span-9 font-display uppercase text-4xl md:text-6xl leading-[0.9]">perguntas <span className="text-flow-ink/40">frequentes.</span></h2>
      </div>
      <Accordion type="single" collapsible className="border-t border-flow-ink/15">
        {faqs.map((f, i) => (
          <AccordionItem key={i} value={`f-${i}`} className="border-b border-flow-ink/15">
            <AccordionTrigger className="text-left font-display uppercase text-xl md:text-2xl py-6 hover:no-underline hover:text-flow-yellow">
              <span className="flex gap-6 items-baseline"><span className="text-xs text-flow-ink/40 tracking-widest">0{i + 1}</span>{f.q}</span>
            </AccordionTrigger>
            <AccordionContent className="text-flow-ink/65 text-base pl-12 pb-8 max-w-2xl">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);
