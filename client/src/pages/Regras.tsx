/* Regras — Referência completa do sistema Além da Névoa 2.3 */

import { useState } from "react";
import Layout from "@/components/Layout";
import { BookOpen, ChevronDown, ChevronUp } from "lucide-react";

interface Secao {
  id: string;
  titulo: string;
  conteudo: React.ReactNode;
}

const cardStyle = {
  background: "oklch(0.09 0.006 285)",
  border: "1px solid oklch(0.28 0.18 22 / 0.35)",
  clipPath: "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))",
};

const tabelaStyle = {
  width: "100%",
  borderCollapse: "collapse" as const,
};

const thStyle = {
  fontFamily: "'Bebas Neue', sans-serif",
  fontSize: "0.75rem",
  letterSpacing: "0.15em",
  color: "oklch(0.42 0.22 22)",
  padding: "8px 12px",
  borderBottom: "1px solid oklch(0.28 0.18 22 / 0.4)",
  textAlign: "left" as const,
};

const tdStyle = {
  fontFamily: "'Source Serif 4', serif",
  fontSize: "0.85rem",
  color: "oklch(0.75 0.005 65)",
  padding: "7px 12px",
  borderBottom: "1px solid oklch(0.28 0.18 22 / 0.15)",
};

const tdMonoStyle = {
  ...tdStyle,
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: "0.8rem",
  color: "oklch(0.55 0.25 22)",
};

function Accordion({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mb-3 border" style={{ borderColor: "oklch(0.28 0.18 22 / 0.3)", background: "oklch(0.09 0.006 285)" }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4"
      >
        <span className="font-display text-lg tracking-widest" style={{ color: "oklch(0.92 0.005 65)" }}>{titulo}</span>
        {open
          ? <ChevronUp size={16} style={{ color: "oklch(0.42 0.22 22)" }} />
          : <ChevronDown size={16} style={{ color: "oklch(0.42 0.22 22)" }} />
        }
      </button>
      {open && (
        <div className="px-5 pb-5 border-t" style={{ borderColor: "oklch(0.28 0.18 22 / 0.2)" }}>
          <div className="pt-4">{children}</div>
        </div>
      )}
    </div>
  );
}

export default function Regras() {
  return (
    <Layout>
      <div className="container py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <BookOpen size={24} style={{ color: "oklch(0.42 0.22 22)" }} />
          <div>
            <div className="font-mono-dbd text-xs mb-1" style={{ color: "oklch(0.42 0.22 22)", letterSpacing: "0.2em" }}>ALÉM DA NÉVOA 2.3</div>
            <h1 className="font-display text-4xl tracking-widest" style={{ color: "oklch(0.92 0.005 65)" }}>REGRAS DO SISTEMA</h1>
          </div>
        </div>

        {/* DADOS */}
        <Accordion titulo="DADOS E TESTES">
          <p className="text-sm leading-relaxed mb-4" style={{ color: "oklch(0.75 0.005 65)", fontFamily: "'Source Serif 4', serif" }}>
            O sistema usa dados de 6 faces (d6). Para realizar uma ação, o jogador rola uma quantidade de dados igual ao valor do atributo relevante e conta os <strong style={{ color: "oklch(0.92 0.005 65)" }}>sucessos</strong> (resultados 4, 5 ou 6).
          </p>
          <table style={tabelaStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Resultado</th>
                <th style={thStyle}>Efeito</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={tdMonoStyle}>1, 2, 3</td><td style={tdStyle}>Falha — sem sucesso</td></tr>
              <tr><td style={tdMonoStyle}>4, 5</td><td style={tdStyle}>Sucesso parcial</td></tr>
              <tr><td style={tdMonoStyle}>6</td><td style={tdStyle}>Sucesso crítico</td></tr>
            </tbody>
          </table>
          <div className="mt-4 p-3 border" style={{ borderColor: "oklch(0.42 0.22 22 / 0.3)", background: "oklch(0.28 0.18 22 / 0.08)" }}>
            <div className="font-mono-dbd text-xs mb-1" style={{ color: "oklch(0.42 0.22 22)" }}>STACKS</div>
            <p className="text-sm" style={{ color: "oklch(0.65 0.01 285)", fontFamily: "'Source Serif 4', serif" }}>
              Cada atributo pode ter de 1 a 6 stacks. Cada stack equivale a 1 dado extra na rolagem. Stacks são ganhos durante a sessão por ações bem-sucedidas ou vantagens.
            </p>
          </div>
        </Accordion>

        {/* ATRIBUTOS */}
        <Accordion titulo="ATRIBUTOS DOS SOBREVIVENTES">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {[
              { nome: "COOPERAÇÃO", desc: "Representa o lado social, presença e capacidade de ajudar aliados. Usado em: ajudar aliados feridos, rituais em grupo, ações sociais.", cor: "oklch(0.55 0.2 145)" },
              { nome: "FÔLEGO", desc: "Representa força física, agilidade e furtividade. Usado em: fugir do assassino, se esconder, atordar o assassino, ações físicas.", cor: "oklch(0.65 0.18 65)" },
              { nome: "FOCO", desc: "Representa mente, percepção e raciocínio. Usado em: consertar geradores, revelar o assassino, ações técnicas e de percepção.", cor: "oklch(0.55 0.25 22)" },
            ].map(a => (
              <div key={a.nome} className="p-4 border" style={{ borderColor: `${a.cor}40`, background: `${a.cor}08`, clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))" }}>
                <div className="font-display text-sm tracking-widest mb-2" style={{ color: a.cor }}>{a.nome}</div>
                <p className="text-xs leading-relaxed" style={{ color: "oklch(0.65 0.01 285)", fontFamily: "'Source Serif 4', serif" }}>{a.desc}</p>
              </div>
            ))}
          </div>
        </Accordion>

        {/* ESTADOS DE SAÚDE */}
        <Accordion titulo="ESTADOS DE SAÚDE">
          <table style={tabelaStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Estado</th>
                <th style={thStyle}>Nível</th>
                <th style={thStyle}>Efeito</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ ...tdMonoStyle, color: "oklch(0.55 0.2 145)" }}>Saudável</td>
                <td style={tdMonoStyle}>3</td>
                <td style={tdStyle}>Estado inicial. Nenhuma penalidade.</td>
              </tr>
              <tr>
                <td style={{ ...tdMonoStyle, color: "oklch(0.65 0.18 65)" }}>Ferido</td>
                <td style={tdMonoStyle}>2</td>
                <td style={tdStyle}>Recebeu 1 golpe. Deixa rastro de sangue. Pode ser curado por aliados.</td>
              </tr>
              <tr>
                <td style={{ ...tdMonoStyle, color: "oklch(0.55 0.25 22)" }}>Em Risco</td>
                <td style={tdMonoStyle}>1</td>
                <td style={tdStyle}>Recebeu 2 golpes. Rastejando. Próximo golpe = sacrificado no gancho.</td>
              </tr>
            </tbody>
          </table>
          <div className="mt-4 p-3 border" style={{ borderColor: "oklch(0.42 0.22 22 / 0.3)", background: "oklch(0.28 0.18 22 / 0.08)" }}>
            <div className="font-mono-dbd text-xs mb-1" style={{ color: "oklch(0.42 0.22 22)" }}>CURA</div>
            <p className="text-sm" style={{ color: "oklch(0.65 0.01 285)", fontFamily: "'Source Serif 4', serif" }}>
              Um sobrevivente pode curar outro gastando uma ação e rolando Cooperação. Número de sucessos necessários: 2 para Ferido → Saudável, 3 para Em Risco → Ferido.
            </p>
          </div>
        </Accordion>

        {/* CENAS */}
        <Accordion titulo="ESTRUTURA DE CENAS">
          <p className="text-sm leading-relaxed mb-4" style={{ color: "oklch(0.75 0.005 65)", fontFamily: "'Source Serif 4', serif" }}>
            O jogo é dividido em <strong style={{ color: "oklch(0.92 0.005 65)" }}>Cenas</strong>: momentos de exploração livre e <strong style={{ color: "oklch(0.92 0.005 65)" }}>Perseguições</strong>: confrontos diretos com o assassino.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { titulo: "CENA LIVRE", desc: "Sobreviventes exploram o mapa, consertam geradores, se curam e se preparam. O Narrador descreve o ambiente e pode usar Ações de Tormento do assassino.", cor: "oklch(0.55 0.2 145)" },
              { titulo: "PERSEGUIÇÃO", desc: "O assassino detecta um sobrevivente. Inicia-se um confronto por turnos. O assassino recebe Sede de Sangue igual ao seu atributo de Violência.", cor: "oklch(0.55 0.25 22)" },
            ].map(c => (
              <div key={c.titulo} className="p-4 border" style={{ borderColor: `${c.cor}40`, background: `${c.cor}08`, clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))" }}>
                <div className="font-display text-sm tracking-widest mb-2" style={{ color: c.cor }}>{c.titulo}</div>
                <p className="text-xs leading-relaxed" style={{ color: "oklch(0.65 0.01 285)", fontFamily: "'Source Serif 4', serif" }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </Accordion>

        {/* AÇÕES DE SOBREVIVENTE */}
        <Accordion titulo="AÇÕES DOS SOBREVIVENTES">
          <table style={tabelaStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Ação</th>
                <th style={thStyle}>Atributo</th>
                <th style={thStyle}>Descrição</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Consertar Gerador", "Foco", "Avança o progresso de um gerador. Sucesso parcial: 1 progresso. Crítico: 2."],
                ["Fugir", "Fôlego", "Tenta escapar da perseguição. Requer número de sucessos definido pelo Narrador."],
                ["Esconder", "Fôlego", "Se oculta do assassino. Dificulta ser encontrado."],
                ["Atordar Assassino", "Fôlego", "Usa palete ou lanterna para atordoar. Interrompe a perseguição brevemente."],
                ["Ajudar Aliado", "Cooperação", "Cura ou levanta um aliado caído."],
                ["Revelar Assassino", "Foco", "Usa lanterna ou habilidade para revelar a aura do assassino."],
                ["Abrir Saída", "Foco", "Ativa a alavanca de saída de emergência."],
                ["Sabotagem", "Foco", "Destrói um gancho do assassino."],
                ["Cegar", "Fôlego", "Usa lanterna para cegar o assassino temporariamente."],
              ].map(([acao, attr, desc]) => (
                <tr key={acao}>
                  <td style={{ ...tdStyle, color: "oklch(0.92 0.005 65)", fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em", fontSize: "0.85rem" }}>{acao}</td>
                  <td style={tdMonoStyle}>{attr}</td>
                  <td style={tdStyle}>{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Accordion>

        {/* EFEITOS */}
        <Accordion titulo="EFEITOS DO SISTEMA">
          <table style={tabelaStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Efeito</th>
                <th style={thStyle}>Descrição</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Ferida Profunda", "Não pode ser curado sem kit médico."],
                ["Quebrado", "Não pode ser curado durante todo o jogo."],
                ["Incapacitado", "Não pode realizar ações por 1 rodada."],
                ["Exposto", "Um único golpe do assassino leva diretamente ao estado Em Risco."],
                ["Alheio", "Não pode ver a aura do assassino."],
                ["Exaustão", "Não pode usar vantagens que exijam corrida."],
                ["Sorte", "+1 dado em testes de fuga."],
                ["Proteção", "O próximo golpe recebido é ignorado."],
                ["Obsessão", "Alvo principal do assassino. Algumas vantagens interagem com a Obsessão."],
                ["Atordoado", "O assassino perde sua próxima ação."],
              ].map(([ef, desc]) => (
                <tr key={ef}>
                  <td style={{ ...tdStyle, color: "oklch(0.55 0.25 22)", fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em", fontSize: "0.85rem" }}>{ef}</td>
                  <td style={tdStyle}>{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Accordion>

        {/* PONTOS DE SANGUE */}
        <Accordion titulo="PONTOS DE SANGUE">
          <p className="text-sm leading-relaxed mb-4" style={{ color: "oklch(0.75 0.005 65)", fontFamily: "'Source Serif 4', serif" }}>
            Pontos de Sangue são a moeda de progressão do sistema. São ganhos ao final de cada sessão ao cumprir desafios e usados para comprar novas Vantagens e Oferendas.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="p-4 border" style={{ borderColor: "oklch(0.28 0.18 22 / 0.3)", background: "oklch(0.07 0.005 285)" }}>
              <div className="font-display text-sm tracking-widest mb-2" style={{ color: "oklch(0.42 0.22 22)" }}>CUSTOS</div>
              <table style={tabelaStyle}>
                <tbody>
                  <tr><td style={tdStyle}>Nova Vantagem</td><td style={{ ...tdMonoStyle, textAlign: "right" }}>5 pts</td></tr>
                  <tr><td style={tdStyle}>Nova Oferenda</td><td style={{ ...tdMonoStyle, textAlign: "right" }}>3 pts</td></tr>
                </tbody>
              </table>
            </div>
            <div className="p-4 border" style={{ borderColor: "oklch(0.28 0.18 22 / 0.3)", background: "oklch(0.07 0.005 285)" }}>
              <div className="font-display text-sm tracking-widest mb-2" style={{ color: "oklch(0.42 0.22 22)" }}>COMO GANHAR</div>
              <ul className="text-xs space-y-1" style={{ color: "oklch(0.65 0.01 285)", fontFamily: "'Source Serif 4', serif" }}>
                <li>• Escapar com sucesso (+3 pts)</li>
                <li>• Consertar geradores (+1 pt cada)</li>
                <li>• Ajudar aliados (+1 pt cada)</li>
                <li>• Atordar o assassino (+2 pts)</li>
                <li>• Sobreviver ao jogo (+2 pts)</li>
              </ul>
            </div>
          </div>
        </Accordion>
      </div>
    </Layout>
  );
}
