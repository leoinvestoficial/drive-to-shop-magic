import { LegalPage } from "@/components/legal/LegalPage";

const TrocaDevolucao = () => (
  <LegalPage eyebrow="/ 12 · institucional" title={<>troca e <span className="text-flow-green">devolução.</span></>}>
    <p>Seguimos o Código de Defesa do Consumidor (CDC). Você tem total respaldo para trocar ou devolver seu pedido nas condições abaixo.</p>

    <h2>1. prazo de arrependimento</h2>
    <p>Você pode desistir da compra em até <strong>7 dias corridos</strong> após o recebimento, conforme o art. 49 do CDC, sem necessidade de justificativa.</p>

    <h2>2. condições</h2>
    <ul>
      <li>Produto lacrado, em sua embalagem original e sem indícios de consumo.</li>
      <li>Acompanhado da nota fiscal.</li>
      <li>Latas avariadas ou produto fora das especificações: troca garantida.</li>
    </ul>

    <h2>3. como solicitar</h2>
    <ol className="list-decimal pl-5 space-y-1.5">
      <li>Envie um e-mail para <a href="mailto:contato@bebaflow.com">contato@bebaflow.com</a> ou WhatsApp <a href="https://wa.me/5571999470825">(71) 99947-0825</a> com o número do pedido.</li>
      <li>Aguarde nossa orientação sobre o envio reverso (sem custo para você nos casos previstos em lei).</li>
      <li>Após o recebimento e conferência, processamos a troca ou o reembolso em até 7 dias úteis.</li>
    </ol>

    <h2>4. reembolso</h2>
    <p>O reembolso é feito pelo mesmo meio de pagamento utilizado na compra. Cartão de crédito: estorno na fatura conforme prazo da operadora. Pix: devolução em até 5 dias úteis.</p>
  </LegalPage>
);

export default TrocaDevolucao;