## Ajustes mobile — hero e logos

### 1. Hero (`src/components/flow/Hero.tsx`)
Reduzir o espaço em branco acima do logo no mobile e trazer todo o bloco "flow / sua hidratação funcional" para mais perto do topo.

- Trocar `pt-20 md:pt-0` por `pt-10 md:pt-0` no container central (menos respiro acima do logo no mobile).
- Trocar `-mt-20 md:mt-0` no `<motion.img>` do logo por `-mt-32 md:mt-0`, puxando o logo mais para cima no mobile.
- Subir o bloco de texto/CTA: trocar `bottom-8 md:bottom-16` por `bottom-12 md:bottom-16` e reduzir altura da seção no mobile de `h-[100svh]` para `h-[88svh]` (tanto no `<section>` quanto no `sticky`), eliminando o vazio entre o CTA e o início da próxima seção.
- Reduzir levemente o grafismo no mobile de `w-[140vmin]` para `w-[120vmin]` para não sobrar área vazia ao redor.

### 2. Header (`src/components/flow/Header.tsx`)
O logo está visualmente menor que o botão "cupom 10%" e o ícone da sacola.

- Aumentar o logo no mobile de `h-9` para `h-12` (`h-12 md:h-14`), ficando proporcional ao botão de cupom e ao ícone do carrinho.

### 3. Footer (`src/components/flow/Footer.tsx`)
Mesma lógica do header — logo do rodapé pequeno demais no mobile.

- Aumentar de `h-12 md:h-16` para `h-16 md:h-20`.

### Resultado esperado no mobile (390px)
```text
┌─────────────────────────┐
│ [LOGO]      cupom 🛒    │  ← logo maior, alinhado
├─────────────────────────┤
│                         │
│      ✺ grafismo ✺      │
│        F L O W         │  ← logo principal mais alto
│                         │
│  / lançamento ed. 01    │
│  sua hidratação         │
│  funcional chegou.      │
│  [ver os packs] [10%]   │
└─────────────────────────┘
```

Sem mudanças em outras seções, fontes ou conteúdo.
