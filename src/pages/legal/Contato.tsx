import { LegalPage } from "@/components/legal/LegalPage";

const Contato = () => (
  <LegalPage eyebrow="/ 15 · fale com a flow" title={<>vamos <span className="text-flow-green">conversar.</span></>} updatedAt="estamos online de seg a sex, 9h às 18h">
    <p>Tem dúvida, sugestão ou quer fechar uma parceria? Escolha o canal que preferir — respondemos em até 1 dia útil.</p>

    <div className="grid sm:grid-cols-2 gap-4 not-prose">
      <a
        href="https://wa.me/5571999470825"
        target="_blank"
        rel="noopener"
        className="block border border-flow-ink/15 p-6 hover:border-flow-ink hover:bg-flow-ink hover:text-flow-cream transition-colors"
      >
        <p className="font-sans text-[10px] uppercase tracking-[0.4em] opacity-60 mb-2">whatsapp</p>
        <p className="font-display lowercase text-2xl tracking-tight tabular-nums">(71) 99947-0825</p>
      </a>
      <a
        href="mailto:contato@bebaflow.com"
        className="block border border-flow-ink/15 p-6 hover:border-flow-ink hover:bg-flow-ink hover:text-flow-cream transition-colors"
      >
        <p className="font-sans text-[10px] uppercase tracking-[0.4em] opacity-60 mb-2">e-mail</p>
        <p className="font-display lowercase text-2xl tracking-tight break-all">contato@bebaflow.com</p>
      </a>
      <a
        href="https://instagram.com/flow.bebidas"
        target="_blank"
        rel="noopener"
        className="block border border-flow-ink/15 p-6 hover:border-flow-ink hover:bg-flow-ink hover:text-flow-cream transition-colors sm:col-span-2"
      >
        <p className="font-sans text-[10px] uppercase tracking-[0.4em] opacity-60 mb-2">instagram</p>
        <p className="font-display lowercase text-2xl tracking-tight">@flow.bebidas</p>
      </a>
    </div>
  </LegalPage>
);

export default Contato;