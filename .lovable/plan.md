## O que vou ajustar

### 1. Cupom: R$ 10 → 10% OFF
No `LeadCaptureModal.tsx`:
- Título passa a ser "10% off no seu primeiro pack."
- Eyebrow continua "/ cupom de lançamento"
- Texto do toast de sucesso atualizado: "Cupom FLOW10 a caminho no seu e-mail."
- Subtexto explica: "válido em qualquer pack do lançamento"

### 2. Tipografia de números/preços (varredura completa)
Hoje a Halfre (display) está sendo aplicada em alguns números e fica estranho. Regra nova e estrita:

> **Qualquer número, preço, cifrão, %, "R$", "10x", quantidade ou unidade usa `font-sans` (Helvena). Halfre fica reservada APENAS para títulos editoriais em letras.**

Arquivos que vou auditar e corrigir:

```text
src/components/flow/LaunchPacks.tsx     → preço "R$ 50,00", "por", "6 latas", "3+3"
src/components/flow/Hero.tsx            → "3 packs · R$ 50", numeração de eyebrow "01"
src/components/flow/Ingredients.tsx     → numeração "01 / 02 / 03", quantidades de minerais
src/components/flow/Movement.tsx        → qualquer número/estatística
src/components/flow/FAQ.tsx             → menções de preço/quantidade
src/components/flow/Footer.tsx          → ano, telefone, qualquer número
src/components/flow/Header.tsx          → badges numéricos se houver
src/components/flow/LeadCaptureModal.tsx→ "10%", "R$"
```

Em cada um troco `font-display` por `font-sans` em qualquer span/elemento que contenha número, e adiciono a classe `tabular-nums` para alinhar dígitos.

### 3. Leads → Google Sheets (no seu Drive)

Hoje os leads vão pro `localStorage` (se perdem). Vou plugar de verdade no **Google Sheets** via connector oficial. Fluxo:

```text
[ pop-up ]  →  [ edge function: submit-lead ]  →  [ Google Sheets API via gateway ]
                       │
                       └─ fallback localStorage se a chamada falhar
```

Passos:
1. **Conectar o Google Sheets** (você autoriza com a conta Google que tem o Drive).
2. **Você cria a planilha** no seu Drive (ex: "FLOW — Leads Lançamento") com a primeira linha:
   `data | nome | email | telefone | origem`
   E me passa o **ID da planilha** (parte da URL entre `/d/` e `/edit`).
3. Crio a edge function `submit-lead` que faz `POST .../values/Leads!A:E:append` no gateway do Google Sheets, validando entrada com Zod.
4. `LeadCaptureModal.tsx` passa a chamar `supabase.functions.invoke('submit-lead', ...)` em vez de salvar local.
5. Toast de sucesso real só após confirmação da API; em caso de erro, mensagem clara + fallback localStorage.

**Lovable Cloud** precisa estar ligado pra rodar a edge function (é onde a chave do connector vive). Se ainda não estiver, ativo na execução.

---

## Arquivos afetados

```text
src/components/flow/LeadCaptureModal.tsx   (10% + chamada à edge function)
src/components/flow/LaunchPacks.tsx        (tipografia preços)
src/components/flow/Hero.tsx               (tipografia números)
src/components/flow/Ingredients.tsx        (tipografia 01/02/03 + quantidades)
src/components/flow/Movement.tsx           (auditar)
src/components/flow/FAQ.tsx                (auditar)
src/components/flow/Footer.tsx             (auditar)
src/components/flow/Header.tsx             (auditar)
supabase/functions/submit-lead/index.ts    (NOVO)
supabase/config.toml                       (registrar a função)
```

---

## Preciso de você antes de executar

1. **Confirma ativar Lovable Cloud?** (necessário pra edge function que fala com o Sheets)
2. **Autoriza a conexão com Google Sheets?** (vou abrir o picker do connector na execução)
3. **ID da planilha** que você vai criar no Drive (ou me autoriza criar uma do zero via API com o nome "FLOW — Leads Lançamento" e te devolver o link)
4. **Código do cupom**: uso `FLOW10` ou prefere outro nome? E quer que eu já crie esse cupom de 10% no Shopify (`shopify--create_discount_code`)?
