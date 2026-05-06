## O que vou ajustar

Três frentes, em ordem:

### 1. Identidade visual correta

**Fontes oficiais (Helvena + Halfre)**
- Substituir `public/fonts/Helvena-Variable.ttf` pela `Helvena-Semibold.otf` que você acabou de enviar e atualizar a `Halfre.otf` com o arquivo novo.
- Reescrever o `@font-face` em `src/index.css` para `format('opentype')` e `font-weight: 600` na Helvena.
- Conferir em `tailwind.config.ts` que `font-display` (títulos) usa Halfre como display e Helvena como sans/body — hoje as duas estão como Helvena, o que apaga o contraste editorial da marca.

**Logo oficial do Brandbook**
- Hoje o `Header`, `Hero` e `Footer` usam SVGs placeholder (`flow-logo-full.svg`, `flow-logo-mark.svg`) que eu desenhei. Vou trocar pelo SVG real que baixei do Drive (`src/assets/brand/drive/flow-logo-1.svg` — wordmark "flow" + "bebida funcional") e por um símbolo "f" extraído dele para o ícone do header e favicon.
- Remover os SVGs placeholder antigos pra não confundir.

**Lata**
- A `can-yellow.jpg` atual é um render genérico, não é a lata FLOW real. Vou **remover ela do Hero e do StickyProduct** e, no lugar, exibir um tratamento tipográfico forte (wordmark grande + grafismo de ondas concêntricas do brandbook) enquanto você não me manda a foto.
- **Preciso de você:** me envie a foto/render frontal da lata real (fundo branco/transparente, alta resolução). Se preferir, posso gerar um render da lata com IA usando o rótulo que você descrever — mas só faço se você confirmar. Não vou inventar uma lata de novo.

### 2. Reescrever o motion da seção "um dia em flow" (Ritual)

Hoje ela é uma seção `h-[400vh]` com scroll vertical convertido em scroll horizontal via `framer-motion`. No seu viewport (769px) isso trava: você precisa rolar 4 telas inteiras pra atravessar, e o pin não solta — por isso "não dá pra rolar até o final".

Vou refazer assim:

- **Desktop (≥1024px):** manter o conceito horizontal, mas:
  - reduzir altura de `400vh` pra `300vh` (3 momentos de scroll, não 4);
  - corrigir o cálculo de `useTransform` pra terminar exatamente quando o último cartão encosta na borda direita (hoje usa `-75%` chutado, o que deixa cartão cortado ou espaço vazio antes do unpin);
  - adicionar uma barra de progresso fina no topo (0–100%) e um indicador "01/04 → 04/04" pra dar feedback de onde a pessoa está.
- **Mobile/tablet (<1024px):** **abandonar o horizontal scroll** (é a causa do travamento no seu device). Vai virar uma sequência vertical de 4 cards full-bleed, cada um com fade-in + parallax leve da imagem. Rola natural, termina, segue pra próxima seção.
- Trocar as imagens de fundo dos 4 momentos por crops das fotos reais do brandbook (corredor, bike, foco, pós-treino) — hoje algumas estão repetidas/erradas (ex: `glass-lemon` no momento "foco").
- Aplicar Halfre nos horários (06:00, 09:30…) pra dar peso editorial e Helvena no corpo.

### 3. Limpeza geral de motion

Aproveitando a passagem, dois ajustes rápidos que estão atrapalhando a leitura:
- `Hero`: a logo escala demais e cobre o resto — limitar escala máx. e encurtar o range de scroll.
- `StickyProduct`: a rotação da "lata" não faz sentido sem a lata real, vou pausar essa seção (esconder até você mandar a foto) pra não mostrar algo quebrado.

## Arquivos afetados

```text
public/fonts/Helvena-Semibold.otf      (substituir)
public/fonts/Halfre.otf                (substituir)
src/index.css                          (font-face + tokens)
tailwind.config.ts                     (font-display = Halfre)
src/components/flow/Header.tsx         (logo real)
src/components/flow/Hero.tsx           (logo real, sem lata, motion calmo)
src/components/flow/Footer.tsx         (logo real)
src/components/flow/StickyProduct.tsx  (ocultar até ter foto)
src/components/flow/Ritual.tsx         (reescrita: desktop horizontal + mobile vertical)
```

## O que preciso de você antes de seguir (ou em paralelo)

1. **Foto/render frontal da lata FLOW real** (PNG fundo transparente, alta res). Ou: confirme se você quer que eu gere um render via IA — nesse caso me descreva o rótulo (cor, posição da wordmark, sabor visível, etc.).
2. **Confirmação:** posso seguir tirando a lata genérica do ar enquanto você não envia a foto real? (recomendo que sim — melhor vazio do que errado).

Se você responder "pode seguir" eu já implemento tudo acima. Se quiser que eu espere a foto da lata, faço só fontes + logo + Ritual primeiro.