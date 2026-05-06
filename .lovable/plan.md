## Objetivo

Reposicionar o site como uma landing de **lançamento meteoro**: menos seções, foco total nos 3 packs promocionais a R$50, captura agressiva de lead (nome + e-mail + telefone) para o grupo de WhatsApp, e correção dos erros de composição e tipografia.

---

## 1. Estrutura nova da home (mais enxuta)

Hoje: Hero → Movement → Ingredients → Ritual → Products → Community → FAQ → Footer (8 seções).

Nova ordem proposta (6 seções, cada uma curta e com CTA convergindo pro mesmo pack):

```text
1. Hero            → manchete do lançamento + CTA "entrar no grupo"
2. Packs           → 3 cards (Lemon, Orange, Misto) — R$50, frete grátis no misto
3. Composição      → 3 linhas só: eletrólitos / cafeína natural do guaraná / aromas naturais
4. Movement        → 1 bloco visual curto, manifesto da marca (mantém)
5. FAQ             → reduzido a 4 perguntas (lançamento, prazo, cafeína, composição)
6. Footer
```

Removidos: **Ritual ("um dia em flow")**, **Community (grid de @s)**, e o `StickyProduct` (já estava oculto).

---

## 2. Pop-up de captura de lead (meteoro)

Novo componente `LeadCaptureModal.tsx`:

- Abre **automaticamente 4s após o load** OU em qualquer clique em CTA "entrar no grupo / quero a condição".
- Salva no `localStorage` (`flow_lead_v1`) para não reabrir após cadastro/dispensa.
- Campos: **Nome**, **E-mail**, **Telefone (com máscara BR)** — todos obrigatórios, validados com `zod`.
- Visual: card preto sobre overlay desfocado, tipografia Halfre no título "entre no grupo do lançamento", Helvena no corpo, botão amarelo Pantone 584.
- Após submit: toast de sucesso + redireciona para o link do grupo de WhatsApp (você me passa o link, ou deixo um placeholder `https://chat.whatsapp.com/PLACEHOLDER`).

**Onde os leads são salvos:** preciso de uma decisão sua (ver "Perguntas" no fim). Default proposto: salvar via **Lovable Cloud** (tabela `leads` com RLS), que é a forma de não perder ninguém. Alternativa: enviar direto pra um webhook seu (Zapier/Make/Mailchimp).

---

## 3. Os 3 packs do lançamento

Novo componente `LaunchPacks.tsx` substituindo o grid `Products` atual. 3 cards lado a lado:

| Pack | Conteúdo | Preço | Extra |
|---|---|---|---|
| Lemon Fresh | 6× lata Lemon Fresh | R$ 50,00 | — |
| Orange Bliss | 6× lata Orange Bliss | R$ 50,00 | — |
| Misto | 3× Lemon + 3× Orange | R$ 50,00 | **Frete grátis** |

Cada card:
- Imagem do sabor (uso as fotos do Drive `FLOW/` — vou puxar as latas Lemon/Orange).
- Selo "edição lançamento" + selo de quantidade (6 latas).
- Selo "frete grátis" só no Misto.
- Botão "comprar agora" → adiciona o produto Shopify correspondente ao carrinho e abre o `CartDrawer`.

**Integração Shopify:** os 3 packs precisam existir como produtos no Shopify (cada um com variant única a R$50). Vou criar via `shopify--create_product` na execução, **se você confirmar os nomes finais e me passar a foto da lata**. Sem isso, o card mostra estado "em breve" ao invés de inventar.

---

## 4. Correção da seção Composição

Reescrever `Ingredients.tsx` mantendo só o que a FLOW realmente usa:

```text
01  Eletrólitos              Sódio · potássio · magnésio       Reposição hídrica
02  Cafeína natural          Extrato de guaraná                Energia limpa
03  Aromas naturais          Sem extratos artificiais          Sabor leve
```

Apagado: 80mg, café verde, L-teanina, vitaminas B, extrato de limão.
FAQ "Tem cafeína?" também corrigida (remover "80mg" e "café espresso", trocar por "cafeína natural do guaraná, em dose moderada").

---

## 5. Tipografia — varredura completa

Vou conferir **arquivo por arquivo** que tudo que é título/destaque usa `font-display` (Halfre) e tudo que é corpo/UI usa `font-sans` (Helvena). Hoje há lugares usando `font-display` em pequenos textos onde Halfre fica ilegível, e o `Manifesto.tsx` ainda pode ter resquícios de fonte default. Pontos a checar:

- `Hero.tsx` — texto lateral está em `font-sans` ✅, ok.
- `Movement.tsx`, `FAQ.tsx`, `Footer.tsx`, `Header.tsx`, `ProductCard.tsx`, `CartDrawer.tsx` — auditar e padronizar.
- Importar a **nova versão da fonte** que você vai anexar nesta mensagem (substituir `public/fonts/Helvena-Semibold.otf` e/ou `Halfre.otf` se vierem arquivos atualizados).
- Adicionar fallback para garantir que, se a fonte falhar em carregar, o site não cai pra serif do sistema.

---

## 6. Hero adaptado pro lançamento

Hoje o Hero é institucional ("stay in flow"). Vou trocar a copy pra dar contexto de lançamento:

```text
EYEBROW   /  lançamento · edição 01 · 2026
H1        sua hidratação funcional
          chegou. (em halfre)
SUB       3 packs · R$ 50 · frete grátis no misto.
CTA 1     entrar no grupo  → abre LeadCaptureModal
CTA 2     ver os packs     → scroll #packs
```

Mantém o logo grande + grafismo girando (motion já está bom), só reduz a altura de `160vh` pra `120vh` pra a pessoa chegar nos packs mais rápido.

---

## Arquivos afetados

```text
src/components/flow/Hero.tsx              (copy + altura)
src/components/flow/LaunchPacks.tsx       (NOVO — substitui Products na home)
src/components/flow/LeadCaptureModal.tsx  (NOVO)
src/components/flow/Ingredients.tsx       (reescrita — 3 linhas)
src/components/flow/FAQ.tsx               (reduzir + corrigir)
src/components/flow/Footer.tsx            (auditar fontes)
src/components/flow/Header.tsx            (CTA "entrar no grupo")
src/pages/Index.tsx                       (remover Ritual + Community + reordenar)
src/components/flow/Ritual.tsx            (deletar)
src/components/flow/Community.tsx         (deletar)
src/index.css                             (substituir fontes se vierem novas)
public/fonts/*                            (substituir conforme anexo)
```

Mais (condicional, depende das suas respostas abaixo):
- `shopify--create_product` × 3 para criar Lemon Pack, Orange Pack, Misto Pack.
- Tabela `leads` em Lovable Cloud + edge function `submit-lead` para receber o pop-up.

---

## Perguntas pra fechar antes de executar

1. **Onde salvar os leads do pop-up?**
   - (a) Lovable Cloud (tabela `leads`, eu vejo no painel) — recomendado
   - (b) Webhook externo seu (Zapier / Make / Mailchimp) — me passa a URL
   - (c) Só redirecionar pro WhatsApp sem guardar (não recomendo)
2. **Link do grupo de WhatsApp do lançamento** (pra plugar no botão final do pop-up). Se ainda não tiver, deixo placeholder.
3. **Posso criar os 3 packs no Shopify agora**, com os nomes "Lemon Fresh — Pack 6", "Orange Bliss — Pack 6", "Pack Misto — 3+3"? Cada um a R$ 50,00.
4. **Fotos das latas Lemon e Orange** — já existem no seu Drive (você mandou anteriormente) ou você vai gerar/enviar uma versão final agora?

Se você responder essas 4 e mandar a fonte atualizada, eu já implemento tudo.
