import { motion } from "framer-motion";

const rows = [
  { ingredient: "Eletrólitos", function: "Sódio · potássio · magnésio", benefit: "Reposição hídrica" },
  { ingredient: "Cafeína natural", function: "Extrato de guaraná", benefit: "Energia limpa" },
  { ingredient: "Aromas naturais", function: "Sem extratos artificiais", benefit: "Sabor leve" },
];

export const Ingredients = () => (
  <section id="science" className="bg-flow-ink text-flow-cream py-20 md:py-28 px-6">
    <div className="max-w-6xl mx-auto">
      <div className="grid md:grid-cols-12 gap-8 mb-12">
        <p className="md:col-span-3 text-[10px] uppercase tracking-[0.4em] text-flow-yellow">/ 03 · composição</p>
        <h2 className="md:col-span-9 font-display lowercase text-4xl sm:text-6xl leading-[0.95] tracking-tight">
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
            className="grid grid-cols-12 gap-4 py-6 md:py-8 border-b border-flow-cream/15 items-baseline"
          >
            <span className="col-span-1 font-sans text-[10px] uppercase tracking-widest text-flow-cream/40">0{i + 1}</span>
            <span className="col-span-11 md:col-span-4 font-display lowercase text-2xl md:text-3xl tracking-tight">{r.ingredient}</span>
            <span className="col-span-6 md:col-span-4 font-sans text-sm text-flow-cream/60 col-start-2 md:col-start-auto">{r.function}</span>
            <span className="col-span-6 md:col-span-3 font-sans text-sm uppercase tracking-widest text-flow-yellow text-right">{r.benefit}</span>
          </motion.div>
        ))}
      </div>

      <p className="font-sans text-xs text-flow-cream/40 mt-8 max-w-md">
        Composição funcional. Não substitui alimentação balanceada nem orientação médica.
      </p>
    </div>
  </section>
);
