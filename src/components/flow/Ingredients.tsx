import { motion } from "framer-motion";

const rows = [
  { ingredient: "Eletrólitos", function: "Sódio, potássio, magnésio", benefit: "Reposição hídrica" },
  { ingredient: "Cafeína natural", function: "80mg · café verde", benefit: "Energia limpa" },
  { ingredient: "L-teanina", function: "Aminoácido funcional", benefit: "Foco calmo" },
  { ingredient: "Vitamina B-complex", function: "B3, B6, B12", benefit: "Metabolismo ativo" },
  { ingredient: "Extrato de limão", function: "Cítrico natural", benefit: "Sabor leve" },
];

export const Ingredients = () => (
  <section id="science" className="bg-flow-ink text-flow-cream py-24 md:py-32 px-6">
    <div className="max-w-6xl mx-auto">
      <div className="grid md:grid-cols-12 gap-8 mb-20">
        <p className="md:col-span-3 text-[10px] uppercase tracking-[0.4em] text-flow-yellow">/ 03 · ciência</p>
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
            transition={{ delay: i * 0.06, duration: 0.6 }}
            className="grid grid-cols-12 gap-4 py-6 md:py-8 border-b border-flow-cream/15 items-baseline"
          >
            <span className="col-span-1 text-[10px] uppercase tracking-widest text-flow-cream/40">0{i + 1}</span>
            <span className="col-span-11 md:col-span-4 font-display lowercase text-2xl md:text-3xl tracking-tight">{r.ingredient}</span>
            <span className="col-span-6 md:col-span-4 text-sm text-flow-cream/60 col-start-2 md:col-start-auto">{r.function}</span>
            <span className="col-span-6 md:col-span-3 text-sm uppercase tracking-widest text-flow-yellow text-right">{r.benefit}</span>
          </motion.div>
        ))}
      </div>

      <p className="text-xs text-flow-cream/40 mt-8 max-w-md">Composição funcional. Não substitui alimentação balanceada nem orientação médica.</p>
    </div>
  </section>
);
