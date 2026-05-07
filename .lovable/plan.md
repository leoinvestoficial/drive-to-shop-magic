# Plano — Melhorias na Seção Hero (FLOW)

Objetivo: elevar o impacto visual do Hero (desktop + mobile) adicionando uma lata FLOW central com flutuação, partículas de água ao fundo, reveal animado palavra-a-palavra no headline, fade-in escalonado para subtexto/CTAs e um scroll indicator mais proeminente — preservando o conceito brand já existente (creme, ink, motion guiado por scroll, sem auto-scroll/parallax que se mexe sozinho fora do conceito).

---

## 1. Assets necessários

- **Lata FLOW (PNG transparente ou render 3D leve)**: precisa ser fornecida pelo usuário ou usar placeholder. Caminho previsto: `src/assets/brand/can-flow.png`.
  - Caso o usuário não tenha agora, uso um placeholder estilizado (silhueta vetorial em SVG amarelo `flow-yellow` + ink) já no commit, fácil de trocar depois.
- **Partículas de gotas**: SVG inline gerado no componente (círculos + paths simples), sem novo asset.

## 2. Novo subcomponente: `HeroCan.tsx` (interno ao Hero)

- Renderiza a lata centralizada no lado direito (desktop) ou acima do texto (mobile).
- Animações combinadas:
  - **Float loop**: keyframe Tailwind custom `float` — `translateY(0) → -8px → 0`, 3s `ease-in-out` infinite.
  - **Tilt sutil**: `rotate(-4deg)` estático + leve `rotate` reativo ao scroll via `useTransform` (-4° → +2°) para reforçar fluidez sem girar sozinho.
  - **Entrada**: `opacity 0 → 1`, `scale 0.92 → 1`, duração 1s, delay 0.3s.
- Respeita `useReducedMotion` (desativa float e tilt).

## 3. Partículas de água (`WaterParticles.tsx`)

- Camada absoluta atrás do conteúdo (`z-0`, `pointer-events-none`).
- 12–16 gotas SVG distribuídas, `opacity: 0.15`, cores `flow-water` e `flow-ink/10`.
- Cada gota com animação CSS própria (`drift` keyframe): translateY suave (loop 6–10s, delays variados) + leve scale.
- Desliga em `prefers-reduced-motion`.

## 4. Headline com reveal palavra-a-palavra

- Quebrar `"sua hidratação funcional chegou."` em palavras via `.split(" ")`.
- Cada palavra envolvida em `<span className="inline-block overflow-hidden">` com `<motion.span>` interno.
- Variants:
  - `hidden`: `y: 30, opacity: 0`
  - `visible`: `y: 0, opacity: 1`
  - Container com `staggerChildren: 0.15`, `delayChildren: 0.2`.
- Trigger: `whileInView` com `once: true` (mobile) e no mount (desktop, já visível).
- "chegou." mantém destaque `text-flow-green`.

## 5. Subtexto + CTAs com fade-in atrasado

- Wrapper `motion.div` com `initial={{opacity:0, y:16}}`, `animate={{opacity:1, y:0}}`, `transition={{duration:0.7, delay:0.6, ease:[0.22,1,0.36,1]}}`.
- Aplica-se ao parágrafo e ao bloco de botões (mesmo wrapper).

## 6. Scroll indicator mais proeminente

- Substituir o atual "scroll ↓" pequeno por:
  - Mini coluna centrada na base: label `role para descobrir` + ícone seta dentro de um círculo fino (`border border-flow-ink/30`, 36px) com pulso (`animate-ripple`-like custom) + bounce vertical contínuo da seta.
  - Mantém infinite (é o único elemento auto-animado permitido — segue padrão atual).
- Aparece em desktop e mobile.

## 7. Layout

- **Desktop (`md+`)**: grid 2 colunas no sticky hero. Esquerda: texto (eyebrow + headline + sub + CTAs). Direita: `HeroCan` centralizado verticalmente, com `grafismo` ainda atrás como anel rotativo guiado por scroll (mantém o existente).
- **Mobile**: empilhado — bloco 1 (boas-vindas) ganha a lata acima do logo? **Não** — manter banner inicial limpo (logo + grafismo) conforme regra já estabelecida pelo usuário. A lata aparece apenas no **bloco 2** (conteúdo), acima do texto.

```text
Desktop sticky hero:
┌───────────────────────────────────────────┐
│ eyebrow                                   │
│ HEADLINE (reveal palavras)    [grafismo]  │
│ subtexto                      [  LATA  ]  │
│ [CTA] [CTA]                   [ float  ]  │
│                                           │
│            ↓ (scroll indicator)           │
└───────────────────────────────────────────┘
fundo: WaterParticles (opacity 0.15)

Mobile:
[bloco 1: logo + grafismo + scroll ↓]   ← inalterado
[bloco 2: LATA (float) → headline reveal → sub → CTAs]
```

## 8. Tailwind / CSS

Adicionar em `tailwind.config.ts → keyframes/animation`:
- `float`: `0%,100% { transform: translateY(0) } 50% { transform: translateY(-8px) }` — `float: "float 3s ease-in-out infinite"`.
- `drift`: leve subida/descida com opacidade variando — usado pelas gotas.
- `bounce-arrow`: `0%,100%{translateY(0)} 50%{translateY(6px)}` — `bounce-arrow 1.6s ease-in-out infinite`.

(Mantém `animate-ripple` já existente.)

## 9. Arquivos a criar / editar

**Editar**
- `src/components/flow/Hero.tsx` — integrar tudo (mantém estrutura atual de mobile/desktop e regra de scroll-driven motion).
- `tailwind.config.ts` — adicionar keyframes/animations.

**Criar**
- `src/components/flow/HeroCan.tsx` — a lata + animações.
- `src/components/flow/WaterParticles.tsx` — camada de partículas.
- `src/assets/brand/can-flow.svg` — placeholder vetorial da lata (substituível por PNG/3D depois).

## 10. Acessibilidade & performance

- Todas as animações respeitam `useReducedMotion` / `prefers-reduced-motion`.
- Partículas são SVG inline leve (sem libs novas, sem canvas).
- Lata como `<img loading="eager" />` (acima da dobra) com `alt="lata flow"`.
- Sem novas dependências.

## Pergunta antes de executar

Você tem uma imagem/render PNG da lata para usar agora, ou sigo com um **placeholder SVG vetorial** (silhueta da lata em amarelo `flow-yellow` com rótulo "flow") que você troca depois? Posso seguir com o placeholder se preferir.
