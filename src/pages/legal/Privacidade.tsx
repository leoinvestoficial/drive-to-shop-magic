import { LegalPage } from "@/components/legal/LegalPage";

const Privacidade = () => (
  <LegalPage eyebrow="/ 09 · institucional" title={<>política de <span className="text-flow-green">privacidade.</span></>}>
    <p>A FLOW respeita a sua privacidade e segue a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 — LGPD). Esta política descreve como coletamos, usamos e protegemos suas informações.</p>

    <h2>1. dados que coletamos</h2>
    <ul>
      <li>Nome completo, e-mail e telefone (cadastro, cupom e checkout).</li>
      <li>Endereço de entrega e CPF (apenas para emissão de nota fiscal e envio).</li>
      <li>Dados de navegação (páginas visitadas, dispositivo, IP) via cookies.</li>
    </ul>

    <h2>2. como usamos seus dados</h2>
    <ul>
      <li>Processar pedidos, pagamentos e entregas.</li>
      <li>Enviar comunicações sobre lançamentos, cupons e novidades (você pode descadastrar a qualquer momento).</li>
      <li>Melhorar a experiência de navegação e segurança do site.</li>
    </ul>

    <h2>3. cookies</h2>
    <p>Utilizamos cookies essenciais para o funcionamento do site e cookies analíticos para entender o uso da plataforma. Você pode desativá-los nas configurações do seu navegador.</p>

    <h2>4. compartilhamento</h2>
    <p>Compartilhamos dados apenas com parceiros necessários à operação (gateway de pagamento, transportadoras, plataforma de e-mail), sob contrato de confidencialidade.</p>

    <h2>5. seus direitos (LGPD)</h2>
    <ul>
      <li>Confirmar, acessar, corrigir ou excluir seus dados.</li>
      <li>Solicitar portabilidade ou anonimização.</li>
      <li>Revogar consentimento a qualquer momento.</li>
    </ul>

    <h2>6. contato</h2>
    <p>Encarregado pelo tratamento de dados: <a href="mailto:contato@bebaflow.com">contato@bebaflow.com</a>.</p>
  </LegalPage>
);

export default Privacidade;