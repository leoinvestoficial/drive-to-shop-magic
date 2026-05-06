import { motion } from "framer-motion";

const rows = [
  { ingredient: "Eletrólitos", function: "Sódio · potássio · magnésio · zinco", benefit: "Reposição hídrica" },
  { ingredient: "Cafeína natural", function: "Extrato de guaraná", benefit: "Energia limpa" },
  { ingredient: "Aromas naturais", function: "Sem extratos artificiais", benefit: "Sabor leve" },
];

export const Ingredients = () => (
  <section id="science" className="bg-flow-ink text-flow-cream py-16 md:py-28 px-5 md:px-6">
    <div className="max-w-6xl mx-auto">
      <div className="grid md:grid-cols-12 gap-4 md:gap-8 mb-10 md:mb-12">
        <p className="md:col-span-3 font-sans text-[10px] uppercase tracking-[0.4em] text-flow-yellow"><span className="tabular-nums">/ 03</span> · composição</p>
        <h2 className="md:col-span-9 font-display lowercase text-[2.5rem] sm:text-5xl md:text-6xl leading-[0.95] tracking-tight">
          composição limpa.<br/><span className="text-flow-cream/40">decisões claras.</span>
        </h2>
      </div>

      <div className="border-t border-flow-cream/15">
        {rows.map((r, i) => (
          <motion.div
            key={r.ingredient}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.08, duration: 0.6 }}
            className="flex flex-col md:grid md:grid-cols-12 gap-2 md:gap-4 py-6 md:py-8 border-b border-flow-cream/15 md:items-baseline"
          >
            <div className="flex items-baseline gap-3 md:contents">
              <span className="md:col-span-1 font-sans text-[10px] uppercase tracking-widest text-flow-cream/40 tabular-nums">0{i + 1}</span>
              <span className="md:col-span-4 font-display lowercase text-2xl md:text-3xl tracking-tight">{r.ingredient}</span>
            </div>
            <span className="md:col-span-4 font-sans text-sm text-flow-cream/60 pl-7 md:pl-0">{r.function}</span>
            <span className="md:col-span-3 font-sans text-[10px] md:text-sm uppercase tracking-widest text-flow-yellow md:text-right pl-7 md:pl-0">{r.benefit}</span>
          </motion.div>
        ))}
      </div>

      <p className="font-sans text-xs text-flow-cream/40 mt-8 max-w-md">
        Composição funcional. Não substitui alimentação balanceada nem orientação médica.
      </p>
    </div>
  </section>
);
