/* Vantagens — Lista completa com busca e filtro por tipo */

import { useState, useMemo } from "react";
import Layout from "@/components/Layout";
import { Star, Search } from "lucide-react";

interface Vantagem {
  nome: string;
  tipo: "sobrevivente" | "assassino";
  subtitulo: string;
  desc: string;
  raridade?: "comum" | "incomum" | "rara" | "muito_rara";
}

const VANTAGENS: Vantagem[] = [
  // SOBREVIVENTES
  { nome: "Adrenalina", tipo: "sobrevivente", subtitulo: "A sobrevivência instiga o instinto.", desc: "Quando os geradores são concluídos, você recupera um estado de saúde e ganha velocidade por alguns segundos.", raridade: "muito_rara" },
  { nome: "Altruísmo Extremo", tipo: "sobrevivente", subtitulo: "Você não deixa ninguém para trás.", desc: "Ao ajudar um aliado, ambos ganham +1 stack de Cooperação temporariamente.", raridade: "rara" },
  { nome: "Autocuidado", tipo: "sobrevivente", subtitulo: "Você aprendeu a se virar sozinho.", desc: "Permite se curar sem kit médico, mas com dificuldade aumentada em 2 sucessos.", raridade: "comum" },
  { nome: "Bênção: Círculo da Cura", tipo: "sobrevivente", subtitulo: "A luz purifica a névoa.", desc: "Ao abençoar uma tocha, cria uma área de cura. Sobreviventes na área se curam automaticamente ao final de cada rodada.", raridade: "muito_rara" },
  { nome: "Bênção: Névoa Sombria", tipo: "sobrevivente", subtitulo: "A névoa protege os inocentes.", desc: "Ao abençoar uma tocha, cria uma área de névoa. O assassino não pode ver auras dentro da área.", raridade: "rara" },
  { nome: "Botão de Pânico", tipo: "sobrevivente", subtitulo: "Quando tudo parece perdido...", desc: "Uma vez por jogo, ao ser golpeado, pode imediatamente usar a ação Fugir sem gastar turno.", raridade: "muito_rara" },
  { nome: "Caçador de Caçadores", tipo: "sobrevivente", subtitulo: "Você conhece o predador.", desc: "+1 dado em todos os testes contra o assassino após atordar ele uma vez.", raridade: "incomum" },
  { nome: "Coragem Desesperada", tipo: "sobrevivente", subtitulo: "O medo te impulsiona.", desc: "Enquanto Em Risco, todos os testes de Fôlego ganham +2 dados.", raridade: "rara" },
  { nome: "Corrida Selvagem", tipo: "sobrevivente", subtitulo: "Velocidade pura.", desc: "Uma vez por perseguição, pode realizar a ação Fugir com +3 dados adicionais.", raridade: "incomum" },
  { nome: "Décimo Segundo Golpe", tipo: "sobrevivente", subtitulo: "Você não vai morrer aqui.", desc: "Uma vez por jogo, ao ser colocado Em Risco, pode gastar 3 pontos de Fôlego para voltar a Ferido.", raridade: "muito_rara" },
  { nome: "Determinação", tipo: "sobrevivente", subtitulo: "Você não desiste.", desc: "Ao falhar em um teste, pode rolar novamente 1 dado que mostrou falha.", raridade: "incomum" },
  { nome: "Empatia", tipo: "sobrevivente", subtitulo: "Você sente a dor dos outros.", desc: "Pode ver a aura de aliados Feridos ou Em Risco a qualquer distância.", raridade: "comum" },
  { nome: "Esperança", tipo: "sobrevivente", subtitulo: "A luz no fim do túnel.", desc: "Após os geradores serem concluídos, todos ganham +1 dado em testes de Fôlego.", raridade: "incomum" },
  { nome: "Flash de Luz", tipo: "sobrevivente", subtitulo: "A luz é sua arma.", desc: "+2 dados ao usar a ação Cegar. Se bem-sucedido, o assassino fica Atordoado por 1 rodada extra.", raridade: "rara" },
  { nome: "Fuga Desesperada", tipo: "sobrevivente", subtitulo: "Você escapa por um fio.", desc: "Uma vez por jogo, pode tentar escapar de um gancho sem ajuda. Teste de Fôlego dificuldade 4.", raridade: "rara" },
  { nome: "Instinto de Sobrevivência", tipo: "sobrevivente", subtitulo: "Você sente o perigo.", desc: "Recebe aviso quando o assassino está próximo (dentro de 2 zonas).", raridade: "comum" },
  { nome: "Laço de Sangue", tipo: "sobrevivente", subtitulo: "Vocês estão conectados.", desc: "Ao ser curado por um aliado, ambos ganham +1 stack do atributo usado na cura.", raridade: "incomum" },
  { nome: "Liderança", tipo: "sobrevivente", subtitulo: "Você inspira os outros.", desc: "Aliados próximos ganham +1 dado em ações de Cooperação.", raridade: "rara" },
  { nome: "Olho de Lince", tipo: "sobrevivente", subtitulo: "Nada escapa ao seu olhar.", desc: "+2 dados em testes de Foco para revelar o assassino ou encontrar itens.", raridade: "incomum" },
  { nome: "Pressentimento", tipo: "sobrevivente", subtitulo: "Algo está errado.", desc: "Uma vez por sessão, o Narrador deve revelar a localização do assassino.", raridade: "rara" },
  { nome: "Proteção Mútua", tipo: "sobrevivente", subtitulo: "Juntos somos mais fortes.", desc: "Ao ajudar um aliado Em Risco, você absorve o próximo golpe destinado a ele.", raridade: "muito_rara" },
  { nome: "Resiliência", tipo: "sobrevivente", subtitulo: "A dor não te para.", desc: "Enquanto Ferido ou Em Risco, +1 dado em todos os testes de Fôlego.", raridade: "comum" },
  { nome: "Sabotagem", tipo: "sobrevivente", subtitulo: "Destrua as ferramentas do inimigo.", desc: "Pode destruir ganchos do assassino. Teste de Foco dificuldade 3.", raridade: "incomum" },
  { nome: "Segundo Vento", tipo: "sobrevivente", subtitulo: "Você ainda não acabou.", desc: "Uma vez por jogo, ao ser curado de Em Risco para Ferido, recupera todos os stacks de Fôlego.", raridade: "muito_rara" },
  { nome: "Senso de Sobrevivência", tipo: "sobrevivente", subtitulo: "Instinto aguçado.", desc: "+1 dado em todos os testes de Fôlego durante perseguições.", raridade: "comum" },
  { nome: "Solidariedade", tipo: "sobrevivente", subtitulo: "O que te machuca, me machuca.", desc: "Ao curar um aliado, você também recupera 1 estado de saúde.", raridade: "muito_rara" },
  { nome: "Tenacidade", tipo: "sobrevivente", subtitulo: "Você rasteja mais rápido.", desc: "Enquanto Em Risco, pode se mover normalmente sem penalidade de velocidade.", raridade: "rara" },
  { nome: "Voz da Razão", tipo: "sobrevivente", subtitulo: "Palavras têm poder.", desc: "Uma vez por perseguição, pode gastar 1 ação para dar +2 dados a um aliado no próximo teste.", raridade: "incomum" },
  { nome: "Zona Morta", tipo: "sobrevivente", subtitulo: "Você desaparece na névoa.", desc: "Enquanto parado, o assassino não pode ver sua aura.", raridade: "rara" },
  // ASSASSINOS
  { nome: "Enganei Você!", tipo: "assassino", subtitulo: "Uma saída a menos para vocês.", desc: "Permite bloquear uma das saídas disponíveis durante a perseguição.", raridade: "incomum" },
  { nome: "Morte de Franklin", tipo: "assassino", subtitulo: "Quem pode usar itens sou eu!", desc: "Ao golpear um sobrevivente, faz com que ele perca qualquer item que esteja carregando.", raridade: "incomum" },
  { nome: "Ninguém Escapa da Morte", tipo: "assassino", subtitulo: "Uma surpresa desagradável no final.", desc: "Durante uma perseguição, a partir da terceira rodada, todos ficam Expostos.", raridade: "muito_rara" },
  { nome: "Açougueiro Desleixado", tipo: "assassino", subtitulo: "Seus cortes são mais profundos.", desc: "Aumenta em 1 os sucessos necessários para ajudar um sobrevivente golpeado.", raridade: "comum" },
  { nome: "Insidioso", tipo: "assassino", subtitulo: "Sua presença é indetectável.", desc: "Pode realizar ataques surpresa sem iniciar uma perseguição. (Gasta 1 ponto de Sede de Sangue.)", raridade: "rara" },
  { nome: "Implacável", tipo: "assassino", subtitulo: "Sua vontade de ferir é insaciável.", desc: "Quando um golpe falhar por qualquer motivo, pode golpear novamente! (Pode mudar de alvo.)", raridade: "muito_rara" },
  { nome: "Lembre-se de Mim", tipo: "assassino", subtitulo: "É impossível esquecer o pesadelo.", desc: "Aumenta em 1 o número de sucessos necessários para fugir para cada sobrevivente que escape.", raridade: "rara" },
  { nome: "Terceiro Selo", tipo: "assassino", subtitulo: "O desespero toma conta.", desc: "Após golpear um sobrevivente, ele sofre do efeito Alheio por todo o jogo.", raridade: "rara" },
  { nome: "Nascido da Luz", tipo: "assassino", subtitulo: "Você é imune à luz.", desc: "A ação Cegar não tem efeito contra você.", raridade: "incomum" },
  { nome: "Perdendo a Esperança", tipo: "assassino", subtitulo: "A obsessão vai perder todos.", desc: "Todos, exceto a Obsessão, têm dificuldade de fuga aumentada em 1 sucesso.", raridade: "muito_rara" },
  { nome: "Brinque com Sua Comida", tipo: "assassino", subtitulo: "Sua sede aumenta ao ver sofrer.", desc: "Sempre que a Obsessão tentar fugir, os outros perdem 1 ponto de Foco.", raridade: "muito_rara" },
  { nome: "Presença Desconcertante", tipo: "assassino", subtitulo: "Sua presença causa pavor.", desc: "Durante uma perseguição, todos os testes recebem -3 no resultado.", raridade: "muito_rara" },
  { nome: "Resistência", tipo: "assassino", subtitulo: "Tolerante à dor.", desc: "Você é imune ao primeiro atordoamento da perseguição.", raridade: "incomum" },
  { nome: "Soberba", tipo: "assassino", subtitulo: "Eles vão se arrepender.", desc: "Depois que um sobrevivente te atordar, ele fica Exposto pelo resto da perseguição.", raridade: "rara" },
  { nome: "Tanatofobia", tipo: "assassino", subtitulo: "O medo dificulta o progresso.", desc: "Aumenta em 1 o número de sucessos necessários para fugir para cada sobrevivente Ferido ou Em Risco.", raridade: "rara" },
  { nome: "Nêmesis", tipo: "assassino", subtitulo: "Você pune quem quer que seja.", desc: "Se a obsessão já estiver morta, o próximo sobrevivente que atordar se tornará a nova Obsessão.", raridade: "incomum" },
  { nome: "Faça Sua Escolha", tipo: "assassino", subtitulo: "As escolhas têm consequências.", desc: "O jogador que realizar a ação ajudar durante uma perseguição ficará Exposto durante a perseguição.", raridade: "rara" },
  { nome: "Dama de Ferro", tipo: "assassino", subtitulo: "Ratinhos escondidos são capturados.", desc: "Quando um jogador escondido aparecer, ele ficará Exposto por uma rodada.", raridade: "incomum" },
  { nome: "Churrasco com Chilli", tipo: "assassino", subtitulo: "Suas vítimas não podem se esconder.", desc: "Após golpear um sobrevivente, faz com que todos os sobreviventes escondidos apareçam.", raridade: "muito_rara" },
  { nome: "Força Brutal", tipo: "assassino", subtitulo: "Sua capacidade de destruir é notável.", desc: "Ao usar a ação quebrar obstáculos, destrua 3 obstáculos de uma só vez.", raridade: "rara" },
  { nome: "Rancor", tipo: "assassino", subtitulo: "Sua obsessão deve pagar!", desc: "Ao iniciar uma perseguição, sua obsessão fica exposta e não pode se esconder.", raridade: "muito_rara" },
  { nome: "Pavor Contagiante", tipo: "assassino", subtitulo: "Todos vão temer o seu perigo.", desc: "Após golpear a obsessão, todos perdem 1 stack de Foco.", raridade: "rara" },
  { nome: "Eco Sanguíneo", tipo: "assassino", subtitulo: "O sangue de todos será derramado.", desc: "Quando um sobrevivente for golpeado, todos os sobreviventes ficam exaustos.", raridade: "muito_rara" },
];

const RARIDADE_COLORS = {
  comum: "oklch(0.65 0.01 285)",
  incomum: "oklch(0.55 0.2 145)",
  rara: "oklch(0.55 0.18 260)",
  muito_rara: "oklch(0.55 0.25 22)",
};

const RARIDADE_LABELS = {
  comum: "COMUM",
  incomum: "INCOMUM",
  rara: "RARA",
  muito_rara: "MUITO RARA",
};

export default function Vantagens() {
  const [filtro, setFiltro] = useState<"todos" | "sobrevivente" | "assassino">("todos");
  const [busca, setBusca] = useState("");

  const filtradas = useMemo(() => {
    return VANTAGENS.filter(v => {
      const matchTipo = filtro === "todos" || v.tipo === filtro;
      const matchBusca = busca === "" || v.nome.toLowerCase().includes(busca.toLowerCase()) || v.desc.toLowerCase().includes(busca.toLowerCase());
      return matchTipo && matchBusca;
    });
  }, [filtro, busca]);

  const inputStyle = {
    background: "oklch(0.08 0.005 285)",
    border: "1px solid oklch(0.28 0.18 22 / 0.4)",
    color: "oklch(0.92 0.005 65)",
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "0.8rem",
    padding: "0.4rem 0.6rem",
    outline: "none",
    borderRadius: "2px",
  };

  return (
    <Layout>
      <div className="container py-8 max-w-5xl">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Star size={24} style={{ color: "oklch(0.42 0.22 22)" }} />
          <div>
            <div className="font-mono-dbd text-xs mb-1" style={{ color: "oklch(0.42 0.22 22)", letterSpacing: "0.2em" }}>ALÉM DA NÉVOA 2.3</div>
            <h1 className="font-display text-4xl tracking-widest" style={{ color: "oklch(0.92 0.005 65)" }}>LISTA DE VANTAGENS</h1>
          </div>
        </div>

        {/* Filtros */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex gap-2">
            {(["todos", "sobrevivente", "assassino"] as const).map(f => (
              <button
                key={f}
                onClick={() => setFiltro(f)}
                className="px-4 py-2 font-display text-sm tracking-wider transition-all"
                style={{
                  background: filtro === f ? "oklch(0.28 0.18 22 / 0.3)" : "oklch(0.09 0.006 285)",
                  border: `1px solid ${filtro === f ? "oklch(0.42 0.22 22)" : "oklch(0.28 0.18 22 / 0.3)"}`,
                  color: filtro === f ? "oklch(0.92 0.005 65)" : "oklch(0.55 0.01 285)",
                  clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))",
                }}
              >
                {f === "todos" ? "TODOS" : f === "sobrevivente" ? "SOBREVIVENTES" : "ASSASSINOS"}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 flex-1" style={{ ...inputStyle, padding: "0 0.75rem" }}>
            <Search size={14} style={{ color: "oklch(0.45 0.01 285)", flexShrink: 0 }} />
            <input
              value={busca}
              onChange={e => setBusca(e.target.value)}
              placeholder="Buscar vantagem..."
              style={{ background: "transparent", border: "none", outline: "none", color: "oklch(0.92 0.005 65)", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.8rem", width: "100%", padding: "0.4rem 0" }}
            />
          </div>
        </div>

        {/* Contagem */}
        <div className="font-mono-dbd text-xs mb-4" style={{ color: "oklch(0.45 0.01 285)" }}>
          {filtradas.length} vantagens encontradas
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filtradas.map(v => {
            const rarCor = RARIDADE_COLORS[v.raridade || "comum"];
            return (
              <div
                key={v.nome}
                className="p-4 border transition-all"
                style={{
                  background: "oklch(0.09 0.006 285)",
                  borderColor: "oklch(0.28 0.18 22 / 0.3)",
                  clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "oklch(0.42 0.22 22)";
                  (e.currentTarget as HTMLDivElement).style.background = "oklch(0.11 0.008 285)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "oklch(0.28 0.18 22 / 0.3)";
                  (e.currentTarget as HTMLDivElement).style.background = "oklch(0.09 0.006 285)";
                }}
              >
                <div className="flex items-start justify-between mb-1">
                  <div className="font-display text-base tracking-wider" style={{ color: "oklch(0.92 0.005 65)" }}>{v.nome}</div>
                  <div className="flex items-center gap-2 ml-2 flex-shrink-0">
                    <span
                      className="font-mono-dbd text-xs px-2 py-0.5"
                      style={{
                        color: v.tipo === "sobrevivente" ? "oklch(0.55 0.2 145)" : "oklch(0.55 0.25 22)",
                        border: `1px solid ${v.tipo === "sobrevivente" ? "oklch(0.55 0.2 145 / 0.4)" : "oklch(0.55 0.25 22 / 0.4)"}`,
                        background: v.tipo === "sobrevivente" ? "oklch(0.55 0.2 145 / 0.08)" : "oklch(0.55 0.25 22 / 0.08)",
                      }}
                    >
                      {v.tipo === "sobrevivente" ? "SOBREV." : "ASSASSINO"}
                    </span>
                  </div>
                </div>
                <div className="text-xs italic mb-2" style={{ color: "oklch(0.45 0.01 285)", fontFamily: "'Source Serif 4', serif" }}>
                  {v.subtitulo}
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "oklch(0.7 0.005 65)", fontFamily: "'Source Serif 4', serif" }}>
                  {v.desc}
                </p>
                {v.raridade && (
                  <div className="mt-2">
                    <span className="font-mono-dbd text-xs" style={{ color: rarCor }}>
                      ◆ {RARIDADE_LABELS[v.raridade]}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
