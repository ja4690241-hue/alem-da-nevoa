# Além da Névoa — Ideias de Design

## Contexto
Sistema de RPG de mesa baseado em Dead by Daylight. Atmosfera de terror, névoa, sangue e entidade cósmica. O site precisa ser funcional para o Mestre e seus jogadores, com fichas interativas, regras e referências rápidas.

---

<response>
<text>
## Ideia 1 — "Grimório Sanguíneo"

**Design Movement:** Gothic Horror Manuscript meets Digital Interface

**Core Principles:**
1. Textura de pergaminho envelhecido com manchas de sangue como elementos decorativos
2. Tipografia serifada pesada com letras capitulares ornamentadas
3. Hierarquia visual através de contraste extremo (preto profundo vs vermelho sangue vs creme envelhecido)
4. Interface que parece um livro de regras físico digitalizado

**Color Philosophy:** Preto de carvão (#0a0505), vermelho sangue coagulado (#6b0000), creme envelhecido (#e8d5b0), cinza névoa (#3a3a4a). A paleta evoca horror gótico e manuscritos medievais.

**Layout Paradigm:** Colunas assimétricas estilo livro antigo. Sidebar à esquerda com navegação ornamentada, conteúdo principal com margens irregulares e elementos decorativos nas bordas.

**Signature Elements:**
- Bordas ornamentadas com espinhos e garras
- Gotas de sangue como marcadores e separadores
- Névoa animada no fundo das seções

**Interaction Philosophy:** Hover effects com "sangue escorrendo", transições lentas e pesadas como névoa se movendo.

**Animation:** Névoa flutuante no hero, gotas de sangue caindo nos títulos ao hover, fade-in sombrio nas seções.

**Typography System:** Cinzel (títulos — romano clássico pesado) + Crimson Text (corpo — serifada elegante) + Courier Prime (dados e números — monospace vintage)
</text>
<probability>0.08</probability>
</response>

<response>
<text>
## Ideia 2 — "Terminal da Entidade" ← ESCOLHIDA

**Design Movement:** Dark Brutalism meets Cosmic Horror Interface

**Core Principles:**
1. Interface como se fosse um "terminal" ou "painel de controle" da Entidade — fria, eficiente, aterrorizante
2. Grade assimétrica com elementos que "vazam" para fora dos containers
3. Contraste brutal entre fundos escuros e texto/elementos em vermelho e branco
4. Sensação de que a interface foi "corrompida" pela névoa — glitch effects sutis

**Color Philosophy:** Preto absoluto (#050505), vermelho sangue (#8b0000), branco névoa (#f0ece0), cinza aço (#1a1a2e), vermelho brilhante para alertas (#ff2020). Evoca terror tecnológico e horror cósmico.

**Layout Paradigm:** Dashboard assimétrico com painéis de tamanhos variados. Navegação lateral esquerda estreita, área principal dividida em cards de diferentes proporções. Sem simetria perfeita — tudo levemente "errado".

**Signature Elements:**
- Linhas de scan sutis no fundo (scanlines CSS)
- Números e dados em fonte monospace com efeito de "digitando"
- Bordas com cortes diagonais (clip-path) em vez de bordas arredondadas

**Interaction Philosophy:** Respostas imediatas e precisas, como um sistema de monitoramento. Hover effects com glow vermelho, cliques com flash momentâneo.

**Animation:** Scanlines animadas, texto com efeito typewriter, transições de slide horizontal entre seções, pulsação sutil nos elementos de "alerta".

**Typography System:** Bebas Neue (títulos — condensado e impactante) + Source Serif 4 (corpo — legível e sério) + JetBrains Mono (números, dados, fichas — monospace técnico)
</text>
<probability>0.09</probability>
</response>

<response>
<text>
## Ideia 3 — "Névoa Impressionista"

**Design Movement:** Dark Watercolor meets Horror Zine

**Core Principles:**
1. Estética de zine underground com colagens e texturas irregulares
2. Elementos que parecem recortados e colados sobre fundo escuro
3. Tipografia misturada — handwritten para anotações, bold sans para regras
4. Manchas e respingos como elementos de design genuínos

**Color Philosophy:** Preto tinta (#0d0d0d), vermelho aquarela (#c0392b), amarelo desbotado (#d4a017), cinza papel (#2a2a2a). Evoca horror de baixo orçamento e fanzines de RPG.

**Layout Paradigm:** Layout de colagem — elementos sobrepostos, rotacionados levemente, com sombras de papel. Cards que parecem notas coladas.

**Signature Elements:**
- Bordas irregulares como papel rasgado
- Marcações à mão (círculos, setas) sobre o conteúdo
- Fundo com textura de papel velho

**Interaction Philosophy:** Interações que parecem "físicas" — cards que se levantam ao hover como papel sendo pego, transições com rotação leve.

**Animation:** Tremor sutil nos elementos ao hover, transições com efeito de "virar página", névoa que aparece ao scroll.

**Typography System:** Playfair Display (títulos — elegante e dramático) + Lato (corpo — clean e legível) + Special Elite (anotações — typewriter vintage)
</text>
<probability>0.07</probability>
</response>

---

## Decisão Final: **Ideia 2 — "Terminal da Entidade"**

Design escolhido por ser o mais funcional para uso em mesa de RPG (legibilidade alta, organização clara) enquanto mantém a atmosfera sombria e impactante do universo DbD. A estética de "terminal corrompido" é única e diferenciada.
