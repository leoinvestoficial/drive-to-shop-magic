## O que será feito

### 1. Remover o espaço branco do hero mobile
No mobile, o hero ocupa duas telas inteiras (`100svh` + `100svh`), gerando o vazio enorme que aparece entre "ENQUANTO DURAR O ESTOQUE" e "três packs. um preço.".

- Em `src/components/flow/Hero.tsx`, unificar o mobile em **uma única tela**: logo + grafismo no topo, textos/CTAs/badge logo abaixo, sem `min-h-[100svh]` no segundo bloco.
- Reduzir paddings verticais para que a seção termine perto do fim da viewport e o usuário emende direto na seção dos packs.

### 2. Remover a numeração `/ 02`, `/ 03`, etc.
Tirar os marcadores de seção que parecem índice editorial interno:

- `src/components/flow/LaunchPacks.tsx`: remover `/ 02 · packs do lançamento`, manter só `packs do lançamento`.
- Conferir e limpar numerações equivalentes em `Ingredients.tsx`, `Movement.tsx`, `FAQ.tsx` se existirem (`/ 03`, `/ 04`...).
- Manter o `/ edição 01 · 2026` do hero, pois ali é parte do conceito de "edição de lançamento" e não numeração de seção.

### 3. Motion design perceptível no banner mobile
Hoje o mobile só tem fade/scale na entrada. Vamos deixar mais vivo e contínuo:

- Grafismo (círculos): rotação lenta infinita + leve pulse de escala (loop, respeitando `prefers-reduced-motion`).
- Logo `flow`: entrada com leve "breathing" sutil contínuo após aparecer.
- Texto "/ edição 01 · 2026" e seta "role para descobrir": entrada em sequência, seta com bounce contínuo (já tem, manter/realçar).
- Tudo via `framer-motion`, sem libs novas, e desabilitado quando `useReducedMotion()` for true.

### 4. Clicar num pack abre a página do produto (não o modal de cupom)
Hoje o botão "quero esse" em `LaunchPacks.tsx` chama `openLeadCapture()`. Não existe página de produto.

- Criar `src/pages/Product.tsx` com layout próprio (Header + Footer da marca, fundo `flow-cream`, tipografia Halfre/Helvena) contendo:
  - Imagem grande do pack
  - Nome, subtítulo, preço `R$ 50,00`, badge "frete grátis" quando aplicável
  - Bloco editável de descrição (placeholders prontos para você editar depois)
  - Botão "comprar" / "adicionar à sacola"
- Os 3 packs viram dados em `src/data/packs.ts` (id, nome, subtítulo, imagem, freeShip, descrição) consumidos tanto por `LaunchPacks` quanto pela página.
- Rota nova em `src/App.tsx`: `/pack/:id` apontando para `Product.tsx`.
- Em `LaunchPacks.tsx`: o card inteiro vira `<Link to={`/pack/${id}`}>`; o botão "quero esse" também leva para a página do produto. O modal de cupom continua acessível pelo botão "CUPOM 10%" do header e pelo CTA do hero.

### 5. Detalhes técnicos

- Sem mudanças de banco/backend.
- Sem novas dependências.
- Respeitar tokens do design system (`flow-cream`, `flow-ink`, `flow-yellow`, `flow-green`).
- Acessibilidade: animações infinitas só rodam se o usuário não pediu `reduce-motion`.

## Arquivos afetados

- editado: `src/components/flow/Hero.tsx` (mobile compactado + motion contínuo)
- editado: `src/components/flow/LaunchPacks.tsx` (sem `/ 02`, card vira link)
- editado: `src/components/flow/Ingredients.tsx`, `Movement.tsx`, `FAQ.tsx` (remover numeração `/ 03`, `/ 04`, `/ 05` se existir)
- editado: `src/App.tsx` (rota `/pack/:id`)
- novo: `src/data/packs.ts`
- novo: `src/pages/Product.tsx`
