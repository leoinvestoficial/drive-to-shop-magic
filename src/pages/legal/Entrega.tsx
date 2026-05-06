import { LegalPage } from "@/components/legal/LegalPage";

const Entrega = () => (
  <LegalPage eyebrow="/ 11 · institucional" title={<>política de <span className="text-flow-green">entrega.</span></>}>
    <p>Trabalhamos para entregar a sua FLOW da forma mais rápida e segura possível.</p>

    <h2>1. prazo</h2>
    <ul>
      <li>Capitais e regiões metropolitanas: 2 a 4 dias úteis.</li>
      <li>Demais regiões: 3 a 7 dias úteis.</li>
      <li>O prazo começa a contar após a confirmação do pagamento.</li>
    </ul>

    <h2>2. frete</h2>
    <ul>
      <li>Pack misto: <strong>frete grátis</strong> para todo Brasil.</li>
      <li>Demais packs: frete calculado no checkout conforme CEP.</li>
    </ul>

    <h2>3. regiões atendidas</h2>
    <p>Entregamos em todo o território nacional. Em algumas localidades específicas o prazo pode ser estendido — você será informado no checkout.</p>

    <h2>4. acompanhamento</h2>
    <p>Após o envio, você receberá um e-mail com o código de rastreio para acompanhar o pedido em tempo real.</p>

    <h2>5. recebimento</h2>
    <p>Confira o produto no ato do recebimento. Em caso de avaria visível na embalagem, recuse a entrega e entre em contato pelo WhatsApp <a href="https://wa.me/5571999470825">(71) 99947-0825</a>.</p>
  </LegalPage>
);

export default Entrega;