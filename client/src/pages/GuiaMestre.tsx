/* GuiaMestre — Referência rápida para o Mestre conduzir sessões */

import { useState } from "react";
import Layout from "@/components/Layout";
import { Map, Dice1, AlertTriangle, Clock, Users, Skull } from "lucide-react";

const FOG_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663406734159/6rsjksSkoQXT9eaanuqDMk/dbd_fog_texture-XxAZGdHkXsCvZwTWMWh6pP.webp";

function Card({ titulo, cor, children }: { titulo: string; cor: string; children: React.ReactNode }) {
  return (
    <div
      className="p-5 border"
      style={{
        background: "oklch(0.09 0.006 285)",
        borderColor: `${cor}50`,
        clipPath: "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))",
      }}
    >
      <div className="font-display text-sm tracking-widest mb-4" style={{ color: cor }}>{titulo}</div>
      {children}
    </div>
  );
}

function Row({ label, value, cor }: { label: string; value: string; cor?: string }) {
  return (
    <div className="flex justify-between items-start py-2 border-b" style={{ borderColor: "oklch(0.28 0.18 22 / 0.15)" }}>
      <span style={{ color: "oklch(0.75 0.005 65)", fontFamily: "'Source Serif 4', serif", fontSize: "0.85rem" }}>{label}</span>
      <span style={{ color: cor || "oklch(0.55 0.25 22)", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.8rem", textAlign: "right", maxWidth: "55%" }}>{value}</span>
    </div>
  );
}

export default function GuiaMestre() {
  const [geradores, setGeradores] = useState([false, false, false, false, false]);
  const [saidasAbertas, setSaidasAbertas] = useState([false, false]);
  const [rodada, setRodada] = useState(1);
  const [fase, setFase] = useState<"livre" | "perseguicao">("livre");
  const [sobreviventes, setSobreviventes] = useState([
    { nome: "Sobrevivente 1", saude: 3 as 1|2|3, gancho: 0 },
    { nome: "Sobrevivente 2", saude: 3 as 1|2|3, gancho: 0 },
    { nome: "Sobrevivente 3", saude: 3 as 1|2|3, gancho: 0 },
    { nome: "Sobrevivente 4", saude: 3 as 1|2|3, gancho: 0 },
  ]);

  const saudeLabels = { 3: "Saudável", 2: "Ferido", 1: "Em Risco" };
  const saudeColors = { 3: "oklch(0.55 0.2 145)", 2: "oklch(0.65 0.18 65)", 1: "oklch(0.55 0.25 22)" };

  const geradoresConcluidos = geradores.filter(Boolean).length;

  return (
    <Layout>
      <div className="container py-8 max-w-5xl">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Map size={24} style={{ color: "oklch(0.42 0.22 22)" }} />
          <div>
            <div className="font-mono-dbd text-xs mb-1" style={{ color: "oklch(0.42 0.22 22)", letterSpacing: "0.2em" }}>ALÉM DA NÉVOA 2.3</div>
            <h1 className="font-display text-4xl tracking-widest" style={{ color: "oklch(0.92 0.005 65)" }}>GUIA DO MESTRE</h1>
          </div>
        </div>

        {/* PAINEL DE SESSÃO */}
        <div
          className="p-5 mb-6 border"
          style={{
            backgroundImage: `url(${FOG_BG})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderColor: "oklch(0.42 0.22 22 / 0.5)",
            clipPath: "polygon(0 0, calc(100% - 18px) 0, 100% 18px, 100% 100%, 18px 100%, 0 calc(100% - 18px))",
            position: "relative",
          }}
        >
          <div className="absolute inset-0" style={{ background: "rgba(5,5,5,0.82)" }} />
          <div className="relative z-10">
            <div className="font-display text-sm tracking-widest mb-4" style={{ color: "oklch(0.55 0.25 22)" }}>PAINEL DA SESSÃO</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Rodada */}
              <div className="text-center">
                <div className="font-mono-dbd text-xs mb-1" style={{ color: "oklch(0.45 0.01 285)" }}>RODADA</div>
                <div className="flex items-center justify-center gap-2">
                  <button onClick={() => setRodada(Math.max(1, rodada - 1))} style={{ background: "oklch(0.28 0.18 22 / 0.2)", border: "1px solid oklch(0.42 0.22 22 / 0.4)", color: "oklch(0.92 0.005 65)", width: "24px", height: "24px", fontSize: "14px" }}>−</button>
                  <div className="font-display text-4xl" style={{ color: "oklch(0.92 0.005 65)" }}>{rodada}</div>
                  <button onClick={() => setRodada(rodada + 1)} style={{ background: "oklch(0.28 0.18 22 / 0.2)", border: "1px solid oklch(0.42 0.22 22 / 0.4)", color: "oklch(0.92 0.005 65)", width: "24px", height: "24px", fontSize: "14px" }}>+</button>
                </div>
              </div>
              {/* Fase */}
              <div className="text-center">
                <div className="font-mono-dbd text-xs mb-1" style={{ color: "oklch(0.45 0.01 285)" }}>FASE</div>
                <button
                  onClick={() => setFase(fase === "livre" ? "perseguicao" : "livre")}
                  className="px-3 py-2 font-display text-sm tracking-wider transition-all"
                  style={{
                    background: fase === "perseguicao" ? "oklch(0.42 0.22 22 / 0.3)" : "oklch(0.55 0.2 145 / 0.15)",
                    border: `1px solid ${fase === "perseguicao" ? "oklch(0.55 0.25 22)" : "oklch(0.55 0.2 145)"}`,
                    color: fase === "perseguicao" ? "oklch(0.55 0.25 22)" : "oklch(0.55 0.2 145)",
                    clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))",
                  }}
                >
                  {fase === "livre" ? "CENA LIVRE" : "PERSEGUIÇÃO"}
                </button>
              </div>
              {/* Geradores */}
              <div className="text-center">
                <div className="font-mono-dbd text-xs mb-2" style={{ color: "oklch(0.45 0.01 285)" }}>GERADORES ({geradoresConcluidos}/5)</div>
                <div className="flex justify-center gap-1">
                  {geradores.map((g, i) => (
                    <button
                      key={i}
                      onClick={() => setGeradores(prev => prev.map((v, j) => j === i ? !v : v))}
                      style={{
                        width: "22px",
                        height: "22px",
                        border: `1.5px solid ${g ? "oklch(0.65 0.18 65)" : "oklch(0.28 0.18 22 / 0.4)"}`,
                        background: g ? "oklch(0.65 0.18 65 / 0.3)" : "oklch(0.28 0.18 22 / 0.1)",
                        borderRadius: "3px",
                        cursor: "pointer",
                        fontSize: "10px",
                        color: g ? "oklch(0.65 0.18 65)" : "oklch(0.35 0.01 285)",
                      }}
                    >
                      {g ? "✓" : ""}
                    </button>
                  ))}
                </div>
              </div>
              {/* Saídas */}
              <div className="text-center">
                <div className="font-mono-dbd text-xs mb-2" style={{ color: "oklch(0.45 0.01 285)" }}>SAÍDAS</div>
                <div className="flex justify-center gap-2">
                  {saidasAbertas.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => setSaidasAbertas(prev => prev.map((v, j) => j === i ? !v : v))}
                      style={{
                        width: "36px",
                        height: "36px",
                        border: `1.5px solid ${s ? "oklch(0.55 0.25 22)" : "oklch(0.28 0.18 22 / 0.4)"}`,
                        background: s ? "oklch(0.42 0.22 22 / 0.3)" : "oklch(0.28 0.18 22 / 0.1)",
                        borderRadius: "3px",
                        cursor: "pointer",
                        fontFamily: "'Bebas Neue', sans-serif",
                        fontSize: "10px",
                        letterSpacing: "0.05em",
                        color: s ? "oklch(0.55 0.25 22)" : "oklch(0.35 0.01 285)",
                      }}
                    >
                      {s ? "ABERTA" : `S${i + 1}`}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RASTREADOR DE SOBREVIVENTES */}
        <Card titulo="RASTREADOR DE SOBREVIVENTES" cor="oklch(0.55 0.2 145)">
          <div className="space-y-3">
            {sobreviventes.map((s, i) => (
              <div key={i} className="flex items-center gap-3 p-3 border" style={{ borderColor: "oklch(0.28 0.18 22 / 0.2)", background: "oklch(0.07 0.005 285)" }}>
                <input
                  value={s.nome}
                  onChange={e => setSobreviventes(prev => prev.map((sv, j) => j === i ? { ...sv, nome: e.target.value } : sv))}
                  style={{ background: "transparent", border: "none", outline: "none", color: "oklch(0.92 0.005 65)", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.8rem", flex: 1, minWidth: 0 }}
                />
                <div className="flex gap-1">
                  {([3, 2, 1] as const).map(nivel => (
                    <button
                      key={nivel}
                      onClick={() => setSobreviventes(prev => prev.map((sv, j) => j === i ? { ...sv, saude: nivel } : sv))}
                      className="px-2 py-1 font-display text-xs tracking-wider transition-all"
                      style={{
                        background: s.saude === nivel ? `${saudeColors[nivel]}30` : "transparent",
                        border: `1px solid ${s.saude === nivel ? saudeColors[nivel] : "oklch(0.28 0.18 22 / 0.3)"}`,
                        color: s.saude === nivel ? saudeColors[nivel] : "oklch(0.35 0.01 285)",
                      }}
                    >
                      {saudeLabels[nivel]}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-mono-dbd text-xs" style={{ color: "oklch(0.45 0.01 285)" }}>GANCHO:</span>
                  <button onClick={() => setSobreviventes(prev => prev.map((sv, j) => j === i ? { ...sv, gancho: Math.max(0, sv.gancho - 1) } : sv))} style={{ background: "oklch(0.28 0.18 22 / 0.2)", border: "1px solid oklch(0.42 0.22 22 / 0.3)", color: "oklch(0.92 0.005 65)", width: "20px", height: "20px", fontSize: "12px" }}>−</button>
                  <span className="font-display text-lg w-6 text-center" style={{ color: s.gancho >= 2 ? "oklch(0.55 0.25 22)" : "oklch(0.92 0.005 65)" }}>{s.gancho}</span>
                  <button onClick={() => setSobreviventes(prev => prev.map((sv, j) => j === i ? { ...sv, gancho: Math.min(3, sv.gancho + 1) } : sv))} style={{ background: "oklch(0.28 0.18 22 / 0.2)", border: "1px solid oklch(0.42 0.22 22 / 0.3)", color: "oklch(0.92 0.005 65)", width: "20px", height: "20px", fontSize: "12px" }}>+</button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {/* Dificuldades */}
          <Card titulo="DIFICULDADES PADRÃO" cor="oklch(0.42 0.22 22)">
            <Row label="Consertar Gerador" value="3 sucessos" />
            <Row label="Fugir (básico)" value="2 sucessos" />
            <Row label="Fugir (ferido)" value="3 sucessos" />
            <Row label="Curar aliado (Ferido→Saudável)" value="2 sucessos" />
            <Row label="Curar aliado (Em Risco→Ferido)" value="3 sucessos" />
            <Row label="Esconder" value="2 sucessos" />
            <Row label="Atordar assassino" value="3 sucessos" />
            <Row label="Abrir saída" value="4 sucessos" />
            <Row label="Sabotagem de gancho" value="3 sucessos" />
          </Card>

          {/* Ações do Assassino */}
          <Card titulo="AÇÕES DE TORMENTO (CENA LIVRE)" cor="oklch(0.55 0.25 22)">
            <Row label="Alucinar" value="−1 Foco (alvo)" />
            <Row label="Assustar" value="−1 Fôlego (alvo)" />
            <Row label="Traumatizar" value="−1 Cooperação (alvo)" />
            <Row label="Obcecar" value="Define Obsessão" />
            <Row label="Amedrontar" value="Testes com −2" />
            <Row label="Atormentar" value="Efeito livre do Narrador" />
            <div className="mt-3 p-2 border" style={{ borderColor: "oklch(0.42 0.22 22 / 0.3)", background: "oklch(0.28 0.18 22 / 0.08)" }}>
              <p className="text-xs italic" style={{ color: "oklch(0.55 0.01 285)", fontFamily: "'Source Serif 4', serif" }}>
                Ações de Tormento são gratuitas durante a Cena Livre. O assassino pode usar quantas quiser, mas cada uma custa 1 ponto de Sede de Sangue.
              </p>
            </div>
          </Card>

          {/* Estrutura de Perseguição */}
          <Card titulo="ESTRUTURA DE PERSEGUIÇÃO" cor="oklch(0.42 0.22 22)">
            <div className="space-y-2">
              {[
                { num: "1", desc: "Assassino ganha Sede de Sangue = Violência" },
                { num: "2", desc: "Assassino pode realizar Ataque Surpresa (expõe o alvo)" },
                { num: "3", desc: "Turnos alternados: Sobreviventes → Assassino" },
                { num: "4", desc: "Sobrevivente foge ou é golpeado" },
                { num: "5", desc: "Se golpeado 3× sem cura: vai para o gancho" },
                { num: "6", desc: "No gancho: 3 tentativas de fuga ou sacrifício" },
              ].map(({ num, desc }) => (
                <div key={num} className="flex gap-3 items-start">
                  <div className="font-display text-lg w-6 flex-shrink-0" style={{ color: "oklch(0.42 0.22 22)" }}>{num}</div>
                  <p className="text-sm" style={{ color: "oklch(0.7 0.005 65)", fontFamily: "'Source Serif 4', serif" }}>{desc}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Intervenções da Entidade */}
          <Card titulo="INTERVENÇÕES DA ENTIDADE" cor="oklch(0.55 0.25 22)">
            <p className="text-sm mb-3 italic" style={{ color: "oklch(0.55 0.01 285)", fontFamily: "'Source Serif 4', serif" }}>
              Ganhas por sacrifícios. O Narrador pode gastar para alterar sutilmente a cena.
            </p>
            {[
              ["Bloquear caminho", "Fecha uma rota de fuga temporariamente"],
              ["Revelar sobrevivente", "Expõe a posição de um sobrevivente"],
              ["Fortalecer assassino", "+2 dados no próximo ataque"],
              ["Criar obstáculo", "Adiciona um palete ou janela ao cenário"],
              ["Névoa densa", "Todos os testes de percepção com −2"],
            ].map(([acao, desc]) => (
              <Row key={acao} label={acao} value={desc} cor="oklch(0.65 0.01 285)" />
            ))}
          </Card>
        </div>

        {/* DICAS DO NARRADOR */}
        <div className="mt-4 p-5 border" style={{ background: "oklch(0.09 0.006 285)", borderColor: "oklch(0.28 0.18 22 / 0.35)", clipPath: "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))" }}>
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle size={16} style={{ color: "oklch(0.42 0.22 22)" }} />
            <div className="font-display text-sm tracking-widest" style={{ color: "oklch(0.42 0.22 22)" }}>DICAS PARA O NARRADOR</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { titulo: "Atmosfera", desc: "Descreva sons antes de revelar o assassino. Passos, respiração pesada, correntes. O medo antecipado é mais poderoso que o confronto." },
              { titulo: "Tensão", desc: "Use Ações de Tormento para criar pressão psicológica mesmo sem perseguição. Faça os jogadores sentirem que nunca estão seguros." },
              { titulo: "Equilíbrio", desc: "Calibre a dificuldade: 5 geradores são muitos para grupos pequenos. Reduza para 3-4 com 2 jogadores." },
              { titulo: "Narrativa", desc: "Cada sobrevivente tem uma história. Conecte as vantagens escolhidas ao backstory do personagem para criar momentos memoráveis." },
            ].map(({ titulo, desc }) => (
              <div key={titulo}>
                <div className="font-display text-xs tracking-widest mb-1" style={{ color: "oklch(0.92 0.005 65)" }}>{titulo.toUpperCase()}</div>
                <p className="text-sm leading-relaxed" style={{ color: "oklch(0.65 0.01 285)", fontFamily: "'Source Serif 4', serif" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
