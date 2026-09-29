# Movimento — NortGo / revisão visual 2

Estrutura atual reduzida: abertura → galeria dos módulos → chamada final. As cenas de Problema, Centro de Ação, Integração orbital e apresentações individuais não são mais montadas; suas descrições abaixo são apenas registro da versão anterior. Ao terminar a abertura, a próxima seção agora é “A sua vida. Toda aqui.”.

Direção: sequência visual de referência_lp.mov (46,6 s), reexaminada integralmente nas pranchas extraídas. Celular em grande escala, redução durante o scroll, palavras ao redor, expansão de telas em perspectiva, transição escuro–claro, composição orbital e encerramento luminoso. Toda a execução usa Framer Motion 11 e CSS.

| Cena | Gatilho | Propriedades | Duração / atraso / curva |
|---|---|---|---|
| Entrada do hero | Montagem | Opacidade 0→1; y 18→0 px | 900 ms; 0 ms; cubic-bezier(.22,1,.36,1) |
| Hero imersivo | Scroll em seção de 700svh; cena sticky | Aparelho escala 1.12→.78 até 60%; y 0→−280 px até 65%; sem inclinação desde a entrada | Ligado ao scroll, sem duração fixa; interpolação linear |
| Título do hero | Mesmo progresso | Opacidade permanece 1 até 20%, vai a 0 em 36%; y 0→−85 px até 40% | Scroll, sem atraso |
| Elementos laterais | Mesmo progresso | Opacidade 1→.25→0 em 0%, 30%, 55% | Scroll, sem atraso |
| Veja. Organize. Siga mais leve. | Mesmo progresso | Opacidade 0→1 entre 32% e 52%; y 35→0 px entre 32% e 65% | Scroll, sem atraso |
| Halo do hero | Mesmo progresso | Escala 1→.65 | Scroll, sem atraso |
| Itens espalhados | Entrada até saída da seção problema | Escala 1.08→1→.86 em 0%, 60%, 100% | Scroll, interpolação linear |
| Títulos e composições | 12% do elemento visível | Opacidade 0→1; y 28→0 px | 800 ms; 0 ms; cubic-bezier(.22,1,.36,1); uma vez |
| Galeria de módulos | Topo entrando na janela até centro da seção no centro da janela | Laterais x ±65→±315 px; rotação ±3°→±15°; centro escala .7→1 | Scroll, interpolação linear |
| Seleção de módulo | Clique ou teclado em aba | Troca de tela e legenda; opacidade 0→1 e y 12→0 px | 350 ms; 0 ms; curva padrão |
| Explicações dos módulos | Clique ou teclado em aba | Um bloco por módulo: Agenda/Rotinas/Saúde à esquerda; Tarefas/Finanças/Notas à direita. Opacidade 0→1, x −12 ou +12→0 px, desfoque 5→0 px | 550 ms; sem atraso; cubic-bezier(.22,1,.36,1); instantâneo com movimento reduzido |
| Centro de Ação | Scroll em seção de 185vh, mínimo 1200 px | Aparelho −4°→0°→4°; destaque muda em 1/3 e 2/3 | Rotação ligada ao scroll; destaque 350 ms ease; tela 300 ms ease |
| Órbita dos módulos | Entrada até centro da seção | Escala .76→1; rotação −8°→0° | Scroll, interpolação linear |
| Aparelho final | Entrada da seção até seu final alcançar o fim da janela | y 100→0 px; rotação 12°→0° | Scroll, interpolação linear |
| Hover / foco | Interação | Fundos, bordas, luminosidade; botão eleva 2 px | 200–250 ms ease |
| Âncoras | Clique | Rolagem suave nativa e foco no destino | Duração nativa adaptativa |

As cenas maiores do hero, leque de aparelhos, órbita e encerramento só animam com largura ≥1024 px e altura ≥700 px. No hero com altura <900 px, a terceira frase decorativa é omitida para evitar sobreposição. Abaixo dessas dimensões, a composição é estática e continua completa. O Centro de Ação deixa de ser sticky no celular.

Com prefers-reduced-motion: duração e atraso zero, nenhuma transformação ligada ao scroll, navegação instantânea e revelações visíveis desde o início. O hero estático mostra o aparelho inteiro e não adiciona espaço de scroll. Não há vídeos automáticos, carregamento obrigatório, captura da roda do mouse nem rotação infinita.

As abas têm estados ARIA, painel associado, navegação por setas, Home/End e foco visível. Os CTAs do hero saem da navegação por teclado quando a cena os torna invisíveis. Todas as rotas principais também permanecem no rodapé.

Na galeria, os aparelhos laterais terminam a 285 px do centro (antes 315 px), com desfoque fixo de 1 px, brilho de 72% e opacidade de 38% no desktop. Um degradê escuro suave atrás da explicação aumenta o contraste. O bloco reúne um título e os dois parágrafos em Inter Light (300): título cobre #EDAA7E e corpo bege #D7BCA7. Abaixo de 768 px, o bloco fica sob os aparelhos e alterna sua posição entre as margens esquerda e direita.

## Abertura com seis telas reais

O hero anima em todas as larguras, inclusive no painel de prévia e no celular; apenas movimento reduzido o torna estático. As restrições de tamanho acima continuam aplicáveis às outras cenas. Escala final e elevação do aparelho se adaptam à altura da janela.

A seção ocupa 700svh (600svh de percurso sticky). Os percentuais da introdução na tabela são locais aos primeiros 20% do percurso. O mesmo celular permanece fixo após a transformação inicial. Home aparece primeiro; as próximas imagens entram nos seguintes intervalos de progresso total, com opacidade linear 0→1: Rotinas 28–32%, Agenda 42–46%, Tarefas 56–60%, Notas 70–74%, Finanças 84–88%. Cada imagem permanece sob a próxima, evitando fundos vazios.

As frases da Home aparecem entre 6,4–10,4%. Nos outros capítulos entram de 2 a 6 pontos percentuais após o início da transição da imagem, com y 22→0 px. A frase anterior desaparece de 2,5 pontos antes a 1,5 ponto depois da próxima troca. Finanças permanece até o fim da cena, antes de MENOS COISA NA CABEÇA. Tudo acompanha e reverte com o scroll, sem temporizador e sem recriar a moldura.

| Tela | Esquerda | Direita |
|---|---|---|
| Home | Veja. | Organize. |
| Rotinas | O que importa | é o ritmo. |
| Agenda | Cada compromisso. | No seu tempo. |
| Tarefas | Tire da cabeça. | Dê o próximo passo. |
| Notas | Uma ideia agora. | Um próximo passo depois. |
| Finanças | Seu dinheiro. | Sem ponto de interrogação. (04 / 06) |

Siga mais leve. permanece como legenda da Home nas alturas compatíveis. Movimento reduzido mantém a abertura estática com Home; todos os módulos continuam em suas seções próprias. As capturas antigas da abertura documentam a versão anterior com dois capítulos; esta revisão foi conferida por código e compilação, sem nova captura visual automatizada.
