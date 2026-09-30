# NortGo — landing de lançamento

Estrutura atual: abertura imersiva → galeria interativa dos seis módulos → chamada final → rodapé. As seções Problema, Centro de Ação, Integração orbital e as seis apresentações individuais foram removidas da composição de `Welcome`; seus arquivos permanecem disponíveis, sem serem importados pela página.

Landing em português brasileiro, criada a partir dos materiais em `../sources/` e da análise visual integral de `referência_lp.mov`. Os originais permanecem intactos. Código React é a fonte da verdade; as capturas documentam o resultado.

## Visualizar

```sh
npm ci
npm run dev -- --port 5173
```

Abra `http://127.0.0.1:5173/`. Compilação: `npm run build`. Prévia da compilação: `npm run preview`. O servidor local precisa continuar aberto para o link funcionar.

## Arquivos para integrar ao app

1. Substituir o conteúdo do componente público `Welcome` por `src/Welcome.jsx` e copiar `src/landing/`.
2. Copiar `public/landing/` para o diretório público do app, preservando os caminhos `/landing/...`.
3. Mesclar **somente `theme.extend`** de `tailwind.config.js` e incluir os novos arquivos na configuração `content` já existente. Não substituir a configuração global. Os nomes novos usam `landing-*`; as classes de composição usam `ng-*`.
4. O CSS contém diretivas Tailwind para a prévia independente. Se o app já as processa no CSS principal, remover apenas as três linhas `@tailwind` da cópia de `landing.css`. Manter as regras de composição e fontes. Copiar também `cinematic.css` e `iphone.css`, importados por `Welcome.jsx` nessa ordem depois de `landing.css`.
5. Manter o roteador, verificação de sessão, tela de carregamento, redirecionamentos e documentos legais existentes. `src/main.jsx`, `src/preview.css`, `index.html`, Vite e PostCSS são o ambiente de prévia: **não substituir os equivalentes do app**.
6. Passar os caminhos legais reais a `Welcome` por `legalLinks={{ terms: caminhoAtualTermos, privacy: caminhoAtualPrivacidade, cookies: caminhoAtualCookies }}`. Eles não constam nos materiais e não foram inventados. A prévia omite esses links até receber os destinos.

O arquivo `CODIGO-PARA-BASE44.md` reúne os arquivos de integração em blocos de código para copiar e colar. Os binários de `public/landing/` precisam ser enviados separadamente. Não é necessário depender de um ZIP nem reconstruir a página a partir de imagens.

## Contrato de navegação

| Elemento | Destino |
|---|---|
| Começar / Começar agora / Criar conta | `/register`, via `Link` |
| Entrar | `/login`, via `Link` |
| Marca | `/` |
| O NortGo | `#conteudo` |
| Conhecer o NortGo / Role para descobrir | `#recursos` |
| Recursos | `#recursos` |
| Abas dos seis módulos | Trocam somente a demonstração visual; nenhuma chamada ao app |
| Voltar ao início | `#conteudo` |
| Documentos legais | Rotas atuais recebidas por `legalLinks` |

Sem formulários adicionais, coleta de dados ou chamadas de API. Login e cadastro da prévia são apenas telas explicativas de destino. A integração real deve herdar autenticação, redirecionamento para `/home` e passagem de `nortgo.com` para `nortgo.com.br`, conforme o aplicativo atual. O código do app não está nesta entrega; esses contratos devem ser testados no ambiente Base44 após a integração.

## Identidade e conteúdo

Todos os aparelhos usam o componente `Phone`, uma representação frontal em CSS do iPhone 17 Pro Max, acabamento Cosmic Orange, com Dynamic Island, lente, indicador inferior e controles laterais. As proporções seguem as [especificações da Apple](https://support.apple.com/en-au/125091) (corpo 78 × 163,4 mm e tela 1320 × 2868). `iphone.css` mantém a moldura proporcional em cada tamanho. As capturas reais são encaixadas por inteiro, sem distorção, na área abaixo da Dynamic Island. Não é uma fotografia oficial do dispositivo.

Fundo `#0B0B0D`, painéis `#1C1C1E`, cobre `#C6632A`, cobre claro `#EDAA7E`, marfim `#F5F2ED`. Botões usam um tom mais escuro de cobre para legibilidade. Tema editorial fixo, alternando capítulos escuros e claros; não segue o tema do aparelho nem altera o tema do app.

Inter e Barlow Condensed locais em WOFF2, com licença SIL OFL incluída. Os nomes internos `NortGo Landing Inter` e `NortGo Landing Barlow` isolam a aplicação das fontes. Bebas Neue, já utilizada pelo produto, não foi substituída nem redefinida.

Logo aplicada pelo PNG original, sem redesenho ou alteração do arquivo. Exceção deliberada à meta de 300 KB: logo de 1,13 MB preservada integralmente; o navegador reutiliza o mesmo recurso. Telas reais Home, Agenda e Finanças convertidas em WebP de 21–27 KB, com fallback JPEG original e resolução original suficiente para os mockups. Telas de referência adicionais estão identificadas como `*-original`.

Centro de Ação é uma composição demonstrativa em React, com dados de exemplo e funções documentadas. A seção Saúde (05/06) aplica a captura real tela mobile saúde.jpeg, disponibilizada como saude.webp com fallback saude.jpg. A galeria interativa mantém a representação demonstrativa de Saúde. A seção Tarefas (02/06) aplica a versão atual da captura tela mobile tarefas.jpeg, disponibilizada como tarefas.webp com fallback tarefas.jpg. A galeria interativa mantém a representação demonstrativa de Tarefas. A seção Rotinas (03/06) aplica a captura real tela mobile rotinas.jpeg, disponibilizada como rotinas-original.webp com fallback JPEG. A galeria interativa mantém a representação demonstrativa de Rotinas. A seção Notas (06/06) aplica a captura real tela mobile notas.jpeg, disponibilizada como notas-original.webp com fallback JPEG. A galeria interativa mantém a representação demonstrativa de Notas. Não são novas funcionalidades implementadas no aplicativo. Botões desenhados dentro dessas telas são parte da ilustração, sem controles falsos focáveis. Não há promessas de gratuidade, planos, lojas de aplicativos, depoimentos ou recursos removidos.

## Responsividade e acessibilidade

A escala visual usa `html:has(.nortgo-landing) { font-size: 80%; }`: com a fonte padrão de 16 px, `1rem` corresponde a 12,8 px. Dimensões fixas, espaçamentos, ícones e movimentos da composição usam `rem`. A variável `--ng-vw`, calculada em `Welcome`, mantém a tipografia fluida proporcional à fonte raiz. O hook `useLandingViewport` também mantém o celular da abertura centralizado na escala atual. Preservar esses arquivos juntos na integração. Ao sair da landing, a regra deixa de se aplicar ao `html`. Breakpoints continuam em pixels e seções de tela inteira continuam usando unidades de viewport; por isso o resultado é uma composição compacta, não uma alteração do zoom do navegador.

Principais quebras Tailwind: `sm` 640, `md` 768, `lg` 1024; teto do conteúdo 1248 px. Ajustes de composição em 900 e 1100 px mantêm as dimensões dos aparelhos e evitam sobreposições. No celular, cenas viram coluna, a seção fixa do Centro de Ação volta ao fluxo normal e o menu é recolhível. As cenas maiores de scroll do hero, galeria, órbita e CTA usam largura mínima de 1024 px e altura mínima de 700 px. Em telas menores, ficam estáticas. O CSS cinematic.css detalha esses ajustes. Textos de botões não são selecionáveis; scrollbars internas ficam ocultas.

Um H1, hierarquia H2/H3, texto alternativo nas telas reais, link para pular ao conteúdo, foco visível e âncoras que recebem foco. `prefers-reduced-motion` elimina entrada, parallax, rotação dinâmica, transições e rolagem suave. O conteúdo fica imediatamente acessível. A página não intercepta roda do mouse nem exige assistir a uma abertura.

## Movimento e referências

Especificações de gatilhos, duração, curvas e atrasos: `docs/ANIMACOES.md`.

Capturas completas, em pixels CSS e escala 1x:
- `docs/screenshots/nortgo-390.png`
- `docs/screenshots/nortgo-768.png`
- `docs/screenshots/nortgo-1440.png`

As capturas completas usam movimento reduzido para mostrar toda a composição estática, sem registrar áreas vazias que dependem da posição de rolagem da cena fixa. `hero-desktop.png`, `hero-scroll-0.25.png`, `hero-scroll-0.7.png`, `modulos-interativos.png` e `centro-de-acao-desktop.png` registram a versão com movimento habilitado.

## Metadados propostos

Aplicar no arquivo de metadados já existente do app, sem substituí-lo pelo `index.html` da prévia:
- Título: **NortGo — Foco no que importa. Vida organizada.**
- Descrição: **Agenda, tarefas, rotinas, finanças, saúde e notas. Organize sua vida em um só lugar e encontre um norte para o seu dia com o NortGo.**
- Idioma: `pt-BR`; cor do navegador: `#0B0B0D`.
- Favicon: manter a marca atual. A prévia referencia o PNG original.
- Compartilhamento social: manter a imagem oficial atual. Não foi inventada uma URL pública de imagem ou domínio canônico.

## Dependências exatas

React / React DOM **18.3.1**, React Router DOM **6.30.1**, Framer Motion **11.18.2**, lucide-react **0.468.0**. Desenvolvimento: Vite **6.4.1**, plugin React **4.4.1**, Tailwind CSS **3.4.17**, PostCSS **8.5.3**, Autoprefixer **10.4.21**. Sem bibliotecas adicionais de interface ou animação; JavaScript e JSX, sem TypeScript. `package-lock.json` fixa a instalação da prévia.

## Verificação

Compilação Vite, navegação pública e antiga (`/bem-vindo`), login/cadastro, menu móvel, âncoras, carregamento das imagens, fontes locais e ausência de rolagem horizontal em 390, 768 e 1440 px. As seis abas são testadas com clique e navegação por teclado; o hero é inspecionado em duas posições de scroll. Os três estágios do Centro de Ação são verificados em 10%, 50% e 90% da cena. Evidência detalhada: `docs/verification.json`.

`docs/verify-preview.cjs` é uma ferramenta local de validação e não integra o site. Ela utiliza o navegador e o Playwright já fornecidos pelo ambiente; para reproduzir em outra máquina, ajustar o caminho do Playwright e o navegador. Não é uma dependência de produção.

### Continuação da abertura
No desktop com movimento habilitado, o mesmo aparelho passa da Home para a captura real de Rotinas conforme o scroll. As frases mudam de Veja / Organize para O que importa / é o ritmo, nessa ordem visual (esquerda / direita). A seção ocupa 700svh; nenhuma biblioteca nova. Referências: docs/screenshots/abertura-home.png e abertura-rotinas.png.

### Correção da abertura em painéis estreitos
A abertura agora anima em todas as larguras, inclusive no painel de prévia e no celular. A condição de 1024 × 700 foi removida apenas do hero; as demais cenas mantêm seus limites anteriores. A escala final e a elevação do aparelho se adaptam à altura da janela. O mesmo celular continua da Home (Veja / Organize) para Rotinas (O que importa à esquerda / é o ritmo à direita). Movimento reduzido continua desativando a animação. Esta regra substitui as restrições anteriores de tamanho e modo mobile para a abertura.

### Sequência ampliada da abertura
Home → Rotinas → Agenda → Tarefas → Notas → Finanças: seis capturas reais no mesmo celular, com frases por capítulo e transições reversíveis pelo scroll. A seção ocupa 700svh e funciona em todas as larguras, respeitando movimento reduzido. Especificação atual em docs/ANIMACOES.md; as capturas anteriores não representam os quatro capítulos acrescentados.
