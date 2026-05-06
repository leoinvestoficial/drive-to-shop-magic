## Objetivo

Criar páginas institucionais (políticas, termos, FAQ, contato) acessíveis pelo rodapé e atualizar os dados de contato com `contato@bebaflow.com` e WhatsApp `71 99947-0825`.

## Páginas novas (rotas em `src/pages/legal/`)

Cada página usa o mesmo layout: `Header` no topo, container centralizado com tipografia da marca (Halfre/Helvena, fundo `flow-cream`, texto `flow-ink`), `Footer` no fim. Conteúdo padrão com placeholders editáveis.

1. `/politica-de-privacidade` — Coleta de dados (nome, e-mail, telefone), uso dos dados, cookies, direitos LGPD, contato do encarregado.
2. `/termos-de-uso` — Regras do site, responsabilidade do usuário, propriedade intelectual, foro.
3. `/politica-de-entrega` — Prazo (2–5 dias úteis), frete (grátis no pack misto), regiões atendidas (todo Brasil).
4. `/politica-de-troca-e-devolucao` — Prazo de 7 dias (CDC), condições (produto lacrado), processo de reembolso.
5. `/politica-de-cancelamento` — Janela de cancelamento antes do envio, reembolso parcial/total, prazos.
6. `/faq` — Reaproveita a seção `FAQ.tsx` ampliada: o que é a FLOW, tem cafeína, quem pode consumir, diferença para energético, prazo de entrega.
7. `/contato` — WhatsApp clicável (`https://wa.me/5571999470825`), e-mail (`mailto:contato@bebaflow.com`), Instagram `@flow.bebidas`.

Todas com `Helmet`/`<title>` simples e `meta description` curta.

## Rodapé (`Footer.tsx`)

Reorganizar em 4 colunas no desktop, empilhadas no mobile:

```text
[ Logo + tagline ]  [ Lançamento ]  [ Institucional ]  [ Contato ]
                     Packs            Privacidade        WhatsApp
                     Composição       Termos de Uso      contato@bebaflow.com
                     FAQ              Entrega            @flow.bebidas
                                      Troca/Devolução
                                      Cancelamento
```

- Atualizar e-mail para `contato@bebaflow.com`.
- WhatsApp como link `https://wa.me/5571999470825` exibindo `(71) 99947-0825`.
- FAQ vira link para `/faq` (mantém a seção na home com `id="faq"` também).

## Roteamento (`src/App.tsx`)

Registrar as 7 novas rotas no `<Routes>` antes do `NotFound`.

## Detalhes técnicos

- Criar `src/components/legal/LegalPage.tsx` (wrapper com Header/Footer/title/intro) para evitar repetição.
- Tipografia: `font-display lowercase` para títulos, `font-sans` para corpo, `prose`-like spacing manual usando classes Tailwind (sem plugin novo).
- Datas/versão: rodapé de cada política mostra "atualizado em maio/2026".
- Sem alterações de banco/backend.

## Arquivos afetados

- novo: `src/components/legal/LegalPage.tsx`
- novo: `src/pages/legal/Privacidade.tsx`, `Termos.tsx`, `Entrega.tsx`, `TrocaDevolucao.tsx`, `Cancelamento.tsx`, `Contato.tsx`
- novo: `src/pages/Faq.tsx` (página dedicada reaproveitando `FAQ.tsx`)
- editado: `src/App.tsx` (rotas)
- editado: `src/components/flow/Footer.tsx` (nova estrutura + contatos)
- editado: `src/components/flow/FAQ.tsx` (perguntas adicionais)
