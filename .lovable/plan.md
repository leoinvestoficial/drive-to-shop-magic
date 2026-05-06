## Avaliação

Vendo o print, o problema é claro: no mobile a logo gigante "flow" do motion fica sobreposta ao headline ("sua hidratação funcional chegou") e ao selo "Bebidas Funcionais", criando aquela bagunça visual. Isso acontece porque no desktop a logo escala/sobe com o scroll e há espaço lateral sobrando — no mobile não há.

Entre as duas opções, recomendo a **Opção A (tela de boas-vindas)** por 3 motivos:

1. É o padrão de marcas premium de bebida no mobile (Liquid Death, Recess, Olipop) — abre com identidade pura, sem ruído.
2. Resolve o conflito de sobreposição na origem em vez de ficar empurrando elementos pra caber.
3. Cria um momento de respiro/branding antes do conteúdo comercial, o que combina com o tom "stay in flow".

A Opção B (ajustar o banner atual) sempre vai ser um remendo: ou diminui muito a logo (perde impacto) ou esconde o headline (perde conversão).

## Plano — Hero mobile redesenhado

### Estrutura no mobile (`< md`)

```text
┌─────────────────────────────┐
│  Header (fixo)              │
├─────────────────────────────┤
│                             │
│        [grafismo bem        │
│         sutil ao fundo]     │
│                             │
│           flow              │  ← logo grande, centralizada
│       Bebidas Funcionais    │
│                             │
│                             │
│        scroll ↓             │  ← indicador animado
└─────────────────────────────┘
   ↓ usuário rola ↓
┌─────────────────────────────┐
│ / lançamento · edição 01    │
│                             │
│ sua hidratação              │
│ funcional chegou.           │
│                             │
│ Três packs · condição...    │
│                             │
│ [ ver os packs ]            │
│ [ cupom de 10% ]            │
│                             │
│ edição limitada             │
│ enquanto durar o estoque    │
└─────────────────────────────┘
```

No **desktop nada muda** — mantém o layout atual com a logo escalando no scroll e o texto à esquerda.

### Mudanças técnicas (`Hero.tsx`)

1. Separar comportamento mobile vs desktop com classes responsivas (sem duplicar componente):
   - Mobile: section vira `min-h-[100svh]` simples (sem sticky/scroll-scaling), conteúdo de texto fica em um segundo bloco abaixo (`min-h-[100svh]` também) que entra com fade-in quando visível.
   - Desktop (`md:`): mantém sticky + scroll-driven scaling exatamente como está hoje.

2. Bloco 1 mobile (boas-vindas):
   - Fundo `bg-flow-cream`, grafismo com `opacity-10` bem grande atrás.
   - Logo `flow` centralizada, ~`w-[70vw]`, com fade-in suave no mount.
   - Selo "Bebidas Funcionais" pequeno abaixo (já vem no SVG, então pode ficar só a logo mesmo).
   - Indicador "scroll ↓" pulsando no rodapé.
   - Tag "edição 01 · 2026" discreta no topo.

3. Bloco 2 mobile (conteúdo):
   - Headline, parágrafo, CTAs e badge "edição limitada" — todos visíveis sem sobreposição.
   - Entrada com `whileInView` fade + slide-up do framer-motion.
   - "edição limitada / enquanto durar o estoque" passa a ficar aqui (no mobile), eliminando o conflito do canto superior direito.

4. Animações respeitam `useReducedMotion` (já é o padrão do componente).

### Arquivo afetado

- `src/components/flow/Hero.tsx` — reorganização responsiva, nenhum outro componente precisa mudar.

Aprova pra eu implementar?