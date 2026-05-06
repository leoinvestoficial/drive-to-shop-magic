import { LegalPage } from "@/components/legal/LegalPage";

const Cancelamento = () => (
  <LegalPage eyebrow="/ 13 · institucional" title={<>política de <span className="text-flow-green">cancelamento.</span></>}>
    <p>Você pode cancelar seu pedido conforme as regras abaixo.</p>

    <h2>1. antes do envio</h2>
    <p>Pedidos ainda não despachados podem ser cancelados sem custo. Solicite pelo WhatsApp <a href="https://wa.me/5571999470825">(71) 99947-0825</a> ou e-mail <a href="mailto:contato@bebaflow.com">contato@bebaflow.com</a>.</p>

    <h2>2. após o envio</h2>
    <p>Caso o pedido já tenha sido despachado, será necessário aguardar o recebimento e seguir o processo de devolução previsto na <a href="/politica-de-troca-e-devolucao">Política de Troca e Devolução</a>.</p>

    <h2>3. reembolso</h2>
    <ul>
      <li><strong>Total:</strong> quando o pedido é cancelado antes do envio ou em caso de produto avariado.</li>
      <li><strong>Parcial:</strong> quando parte do pedido é mantida (ex.: cancelamento de itens específicos).</li>
    </ul>

    <h2>4. prazos</h2>
    <ul>
      <li>Pix: até 5 dias úteis na conta de origem.</li>
      <li>Cartão de crédito: estorno conforme prazo da operadora (até 2 faturas).</li>
    </ul>
  </LegalPage>
);

export default Cancelamento;