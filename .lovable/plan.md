# Plano de correções

## 1. Latas sem fundo (de verdade)

**Problema:** os PNGs atuais (`can-lemon-real.png`, `can-orange-real.png`) estão em modo RGB sem canal alpha — o padrão quadriculado é pixel real, não transparência. Por isso aparecem quadriculadas na chuva da intro e no hero.

**O que fazer:**
- Refazer a remoção de fundo localmente com Pillow (chroma-key do branco com tolerância + suavização das bordas), gerando PNGs RGBA reais.
- Manter **dois conjuntos** de imagens:
  - `can-lemon.png` / `can-orange.png` → originais com fundo branco (usados nos cards de pack e na página de produto, como você pediu).
  - `can-lemon-transparent.png` / `can-orange-transparent.png` → versões realmente transparentes (usadas na chuva da intro e no hero).
- Atualizar imports:
  - `IntroScreen.tsx` e `HeroCan.tsx` → versões transparentes.
  - `data/packs.ts` e `Product.tsx` → versões com fundo branco original.

## 2. Seção Composição

**Problema:** está usando o desenho preto-no-preto (`can-outline.png`), você quer a lata real "no fundo normal".

**O que fazer:**
- Trocar o fundo da seção `Ingredients` de preto (`bg-flow-ink`) para creme (`bg-flow-cream`), com texto em `flow-ink`.
- Usar `can-lemon.png` (lata real, fundo branco) — fica integrada porque o branco da lata se funde com o creme da seção.
- Reescrever as anotações (linhas + rótulos) em tons escuros (cinza/ink) com destaque amarelo, apontando para: ELETRÓLITOS, CAFEÍNA NATURAL, AROMAS NATURAIS, ZERO CALORIAS, 355 ml.
- Apagar o `can-outline.png` que não será mais usado.

## 3. Pack do meio: badges legíveis

Já foi ajustado no turno anterior (badge "mais escolhido" centralizado no topo com sombra, "frete grátis" virou um chip preto/amarelo no canto). Vou só revisar no preview e ajustar se ainda estiver cortado em algum breakpoint.

## 4. Fluxo de compra → Shopify (escolha confirmada)

**Problema atual:** todos os botões "comprar agora" e "quero esse" abrem o modal de cupom (`openLeadCapture`) em vez de levar ao checkout. Já existe infra de carrinho Shopify (`cartStore`, `lib/shopify`) mas ninguém chama `addItem`.

**O que fazer:**

### 4a. Mapear packs Lovable ↔ produtos Shopify
- Listar produtos da loja Shopify conectada.
- Se os 3 packs (lemon, orange, mixed) **não existirem**, criá-los via `shopify--create_product` com preço R$ 50,00, imagens reais e variantes corretas. Se já existirem, só pegar os `variantId` no formato `gid://shopify/ProductVariant/...`.
- Adicionar um campo `shopifyVariantId` em `src/data/packs.ts` mapeando cada pack ao seu variant Shopify.

### 4b. Botões de compra reais
- **`PackCTA` (LaunchPacks)** "quero esse": chamar `useCartStore.addItem(...)` com o variant correspondente e abrir o `CartDrawer` (já existe em `src/components/flow/CartDrawer.tsx`) — não mais um botão decorativo "adicionado".
- **`Product.tsx` "comprar agora"**: chamar `addItem` e em seguida `window.open(getCheckoutUrl(), '_blank')` para ir direto ao checkout Shopify (com `channel=online_store`). Manter "pedir pelo WhatsApp" como secundário.
- **Hero "ver os packs"**: continua scroll para `#packs` (não muda).
- **"cupom de 10%"** continua abrindo o `LeadCaptureModal` — esse é o caminho intencional para o cupom, não o de compra.

### 4c. Auto-trigger do modal de lead
Hoje o modal de cupom abre sozinho 8s depois de carregar a home (e em exit-intent). Isso pode confundir com "compra". **Manter** (é uma boa estratégia de captura), mas garantir que ele nunca abre quando o usuário clica em qualquer CTA de compra.

### 4d. Garantir `useCartSync`
Conferir que `useCartSync()` é chamado no `App.tsx` para limpar o carrinho quando o usuário volta do checkout.

## 5. Verificação no navegador

Depois de aplicar tudo:
- Rodar a preview, conferir visualmente: chuva de latas (sem quadriculado), hero (sem fundo branco no can), seção composição (lata real, fundo creme), badges do pack do meio.
- Testar fluxo: clicar "quero esse" no pack → carrinho abre com item → "checkout" → checkout Shopify abre em nova aba.
- Reportar achados antes de fechar.

## Detalhes técnicos

- Remoção de fundo: `python3` com `Pillow` — `Image.convert("RGBA")`, threshold em luminosidade > 240 com soft edge de 8 px, salva PNG.
- Tamanhos: manter ≥ 1000 px de altura para qualidade no hero desktop.
- Sem novas dependências npm. Sem mudanças em `supabase/`.
- `CustomCursor` continua removido; nenhuma regressão de performance esperada.
