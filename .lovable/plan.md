## Ajustes de feedback

### 1. IntroScreen (chuva de latas + logo)
- Aumentar logo Flow: `w-[140px] md:w-[180px]` → `w-[220px] md:w-[320px]`.
- "role para descobrir": subir do `bottom-8/10` para `bottom-16/20` (mais centralizado verticalmente, longe da borda), aumentar tipografia (`fontSize: 10` → `12`, letterSpacing `3px` → `4px`), aumentar seta (16 → 22) e trocar cor de `#999` para `hsl(var(--flow-ink))` com opacidade 0.8 para ficar legível no creme.

### 2. LaunchPacks — indicador de scroll horizontal (mobile)
- Adicionar dots estilo Instagram abaixo do carrossel (visível só em mobile, `md:hidden`).
- Implementação: state `activeIndex` controlado por `IntersectionObserver` em cada card do scroller, ou mais simples — ouvir `scroll` no container e calcular `Math.round(scrollLeft / cardWidth)`.
- 3 dots `w-1.5 h-1.5 rounded-full`, ativo `bg-flow-ink`, inativo `bg-flow-ink/25`, com transição.
- Adicionar também uma seta sutil animada `→` no canto direito do primeiro card no mobile, que desaparece após o primeiro scroll (hint inicial).

### 3. Contraste do amarelo no fundo creme
- Trocar "apenas X restantes": número amarelo → `text-flow-ink font-bold` (mais escuro, destaque pelo peso). O ícone `Zap` continua amarelo preenchido.
- Auditar outros usos de `text-flow-yellow` sobre fundo claro (Ingredients badges já têm `bg-flow-yellow text-flow-ink`, OK). Manter amarelo só como background ou sobre fundo escuro (`bg-flow-ink`).

### 4. Mobile — badges "mais escolhido" / "frete grátis" cortados
- O badge "mais escolhido" está em `-top-4 left-1/2`: dentro do scroller horizontal com `overflow-x-auto`, o `-top-4` corta. Solução: aumentar `padding-top` do container do card (ex.: wrapper ganha `pt-5` no mobile) e/ou mudar para `top-2` posicionado dentro do card no mobile, mantendo `-top-4` flutuante só no desktop.
- "frete grátis" no `top-3 right-3`: no mobile o card tem largura maior (85vw), então o badge fica OK, mas pode sobrepor o "mais escolhido". Reposicionar no mobile para `top-2 right-2` com texto menor (`text-[8px]`) ou empilhar abaixo do "mais escolhido".
- Dar uma revisada geral de paddings/clipping no mobile do `LaunchPacks` e `Product.tsx`.

### 5. Composição (Ingredients) — voltar a lata outline
- O usuário mandou a imagem da lata em outline preto com detalhes amarelos (a versão antiga removida). Copiar `user-uploads://ChatGPT_Image_12_de_mai._de_2026_19_11_59-2.png` para `src/assets/brand/can-outline.png`.
- A imagem tem fundo preto sólido. Precisamos remover o fundo preto e deixar transparente (ou inverter as linhas para escuro sobre creme). Como a seção `Ingredients` está em fundo creme (`bg-flow-cream`), a melhor abordagem:
  - Processar a imagem com Pillow: inverter cores (linhas brancas → linhas escuras `#0F0F0F`, mantendo amarelos amarelos), e remover o fundo preto (alpha = 0 onde preto puro). Salvar como `can-outline-light.png` (transparente).
  - Substituir `<img src={canPhoto}>` em `Ingredients.tsx` por `<img src={canOutlineLight}>`.
- Manter o overlay SVG com as linhas/anotações já existentes (ELETRÓLITOS, CAFEÍNA, etc.), apenas reposicionar pontos para alinhar com a lata outline.

### Arquivos a editar
- `src/components/flow/IntroScreen.tsx` — tamanho logo + scroll hint.
- `src/components/flow/LaunchPacks.tsx` — dots indicador, contraste do "restantes", reposicionar badges no mobile.
- `src/components/flow/Ingredients.tsx` — trocar foto da lata por outline transparente.
- `src/pages/Product.tsx` — revisar badges no mobile.
- `src/assets/brand/can-outline.png` (novo) — imagem do usuário processada.

### Verificação
- Preview em mobile (375px) e desktop (1280px) confirmando: intro com logo grande e CTA visível, dots aparecem no carrossel de packs, badges não cortados, número "50" legível, lata outline na composição com fundo transparente sobre o creme.
