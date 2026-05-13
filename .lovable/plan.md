## Ajuste seção composição (Ingredients)

O usuário quer voltar ao desenho/esboço da lata (não a lata real fotográfica). A imagem anexada tem fundo preto e linhas brancas/amarelas — preciso processar para fundo transparente com contorno escuro.

### 1. Processar imagem da lata outline
- Copiar `user-uploads://ChatGPT_Image_12_de_mai._de_2026_19_06_37.png` para processamento.
- Usar Pillow para:
  - Remover fundo preto (pixels pretos puros → alpha 0).
  - Inverter linhas brancas/cinzas → escuro `hsl(var(--flow-ink))` ≈ `#0F0F0F`.
  - Preservar amarelos (mantém detalhes amarelos da marca).
- Salvar em `src/assets/brand/can-sketch.png` (PNG transparente).

### 2. Atualizar `src/components/flow/Ingredients.tsx`
- Trocar import: `canPhoto` (lata real) → `canSketch` (novo outline).
- Reposicionar/reescalar para ficar bem centralizada na coluna direita (md:col-span-4):
  - Container `aspect-[3/4]` mantido, lata com `h-[90%]` e `mx-auto` para respirar.
  - Adicionar leve `opacity` transition no reveal.
- **Não** reintroduzir o overlay SVG com setas/linhas (ELETRÓLITOS, CAFEÍNA, ZERO CALORIAS) — usuário disse antes que essas setas são desnecessárias porque o conteúdo do lado esquerdo já dá o contexto. Manter limpo, só a lata esboço.

### 3. Verificação
- A lata deve aparecer como contorno escuro sobre fundo creme da seção, sem retângulo preto atrás, sem setas, bem proporcionada na coluna direita do desktop.

### Arquivos
- `src/assets/brand/can-sketch.png` (novo, processado)
- `src/components/flow/Ingredients.tsx` (trocar imagem)
