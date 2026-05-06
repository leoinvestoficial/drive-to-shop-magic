import { LegalPage } from "@/components/legal/LegalPage";

const Termos = () => (
  <LegalPage eyebrow="/ 10 · institucional" title={<>termos de <span className="text-flow-green">uso.</span></>}>
    <p>Ao acessar e utilizar o site bebaflow.com, você concorda integralmente com estes Termos de Uso. Caso não concorde, recomendamos que não utilize a plataforma.</p>

    <h2>1. uso do site</h2>
    <ul>
      <li>O site é destinado a maiores de 18 anos ou menores acompanhados de responsáveis.</li>
      <li>É proibido utilizar o site para fins ilícitos, prejudiciais ou que violem direitos de terceiros.</li>
      <li>O usuário é responsável pela veracidade das informações fornecidas no cadastro e no checkout.</li>
    </ul>

    <h2>2. responsabilidade</h2>
    <p>A FLOW se compromete a manter o site funcional, mas não se responsabiliza por interrupções decorrentes de manutenções programadas, falhas de terceiros (provedores, gateways) ou caso fortuito.</p>

    <h2>3. propriedade intelectual</h2>
    <p>Todo o conteúdo do site (marca, logotipos, identidade visual, textos, fotos, vídeos e código) é de propriedade exclusiva da FLOW e protegido pelas leis de direitos autorais e propriedade industrial. É vedada a reprodução sem autorização prévia e por escrito.</p>

    <h2>4. alterações</h2>
    <p>Estes termos podem ser atualizados a qualquer momento. A versão vigente sempre estará disponível nesta página.</p>

    <h2>5. foro</h2>
    <p>Fica eleito o foro da comarca de Salvador/BA para dirimir quaisquer questões relativas a estes Termos de Uso.</p>
  </LegalPage>
);

export default Termos;