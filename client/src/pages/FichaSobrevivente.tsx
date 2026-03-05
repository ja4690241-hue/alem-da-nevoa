/* FichaSobrevivente — Ficha digital interativa
   Atributos clicáveis, vantagens editáveis, estados de saúde, efeitos */

import { useState } from "react";
import Layout from "@/components/Layout";
import { Printer, RotateCcw, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";

const ESTILOS_SOBREVIVENTE = [
  { nome: "Altruísta", bonus: "+1 Cooperação ao ajudar aliados feridos" },
  { nome: "Corajoso", bonus: "+1 Fôlego ao atordar o assassino" },
  { nome: "Engenheiro", bonus: "+1 Foco ao consertar geradores" },
  { nome: "Furtivo", bonus: "+1 Fôlego ao se esconder" },
  { nome: "Lutador", bonus: "+1 Fôlego ao fugir do assassino" },
  { nome: "Perspicaz", bonus: "+1 Foco ao revelar o assassino" },
];

const EFEITOS = [
  { id: "ferida_profunda", nome: "Ferida Profunda", desc: "Não pode ser curado sem kit médico" },
  { id: "quebrado", nome: "Quebrado", desc: "Não pode ser curado durante o jogo" },
  { id: "incapacitado", nome: "Incapacitado", desc: "Não pode realizar ações" },
  { id: "exposto", nome: "Exposto", desc: "Um golpe leva direto ao chão" },
  { id: "alheio", nome: "Alheio", desc: "Não pode ver o aura do assassino" },
  { id: "exaustao", nome: "Exaustão", desc: "Não pode usar vantagens de corrida" },
  { id: "sorte", nome: "Sorte", desc: "+1 em testes de fuga" },
  { id: "protecao", nome: "Proteção", desc: "Próximo golpe é ignorado" },
  { id: "obsessao", nome: "Obsessão", desc: "Alvo principal do assassino" },
];

const VANTAGENS_LISTA = [
  "Adrenalina", "Altruísmo Extremo", "Aura da Morte", "Autocuidado",
  "Bênção: Círculo da Cura", "Bênção: Névoa Sombria", "Botão de Pânico",
  "Caçador de Caçadores", "Coragem Desesperada", "Corrida Selvagem",
  "Décimo Segundo Golpe", "Determinação", "Empatia", "Esperança",
  "Flash de Luz", "Fuga Desesperada", "Instinto de Sobrevivência",
  "Laço de Sangue", "Liderança", "Olho de Lince", "Pressentimento",
  "Proteção Mútua", "Resiliência", "Sabotagem", "Segundo Vento",
  "Senso de Sobrevivência", "Solidariedade", "Tenacidade", "Voz da Razão", "Zona Morta",
];

interface Atributo {
  nome: string;
  valor: number;
  max: number;
  desc: string;
}

interface Vantagem {
  nome: string;
  desc: string;
}

export default function FichaSobrevivente() {
  const [nome, setNome] = useState("");
  const [estilo, setEstilo] = useState("");
  const [jogador, setJogador] = useState("");
  const [sessao, setSessao] = useState("");
  const [saude, setSaude] = useState<1 | 2 | 3>(3);
  const [atributos, setAtributos] = useState<Atributo[]>([
    { nome: "Cooperação", valor: 2, max: 6, desc: "Social · Presença · Ajudar" },
    { nome: "Fôlego", valor: 2, max: 6, desc: "Força · Agilidade · Furtividade" },
    { nome: "Foco", valor: 2, max: 6, desc: "Mente · Percepção · Raciocínio" },
  ]);
  const [vantagens, setVantagens] = useState<Vantagem[]>([
    { nome: "", desc: "" },
    { nome: "", desc: "" },
    { nome: "", desc: "" },
    { nome: "", desc: "" },
  ]);
  const [item, setItem] = useState("");
  const [cargas, setCargas] = useState("");
  const [oferenda, setOferenda] = useState("");
  const [pontosSangue, setPontosSangue] = useState(0);
  const [efeitos, setEfeitos] = useState<Record<string, boolean>>({});
  const [notas, setNotas] = useState("");
  const [expandedVantagem, setExpandedVantagem] = useState<number | null>(null);

  const toggleEfeito = (id: string) => {
    setEfeitos(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const setAtributoValor = (index: number, valor: number) => {
    setAtributos(prev => prev.map((a, i) => i === index ? { ...a, valor } : a));
  };

  const resetFicha = () => {
    setNome(""); setEstilo(""); setJogador(""); setSessao("");
    setSaude(3);
    setAtributos([
      { nome: "Cooperação", valor: 2, max: 6, desc: "Social · Presença · Ajudar" },
      { nome: "Fôlego", valor: 2, max: 6, desc: "Força · Agilidade · Furtividade" },
      { nome: "Foco", valor: 2, max: 6, desc: "Mente · Percepção · Raciocínio" },
    ]);
    setVantagens([{ nome: "", desc: "" }, { nome: "", desc: "" }, { nome: "", desc: "" }, { nome: "", desc: "" }]);
    setItem(""); setCargas(""); setOferenda("");
    setPontosSangue(0); setEfeitos({}); setNotas("");
    toast.success("Ficha resetada!");
  };

  const saudeLabels = { 3: "SAUDÁVEL", 2: "FERIDO", 1: "EM RISCO" };
  const saudeColors = {
    3: "oklch(0.55 0.2 145)",
    2: "oklch(0.65 0.18 65)",
    1: "oklch(0.55 0.25 22)",
  };

  const inputStyle = {
    background: "oklch(0.08 0.005 285)",
    border: "1px solid oklch(0.28 0.18 22 / 0.4)",
    color: "oklch(0.92 0.005 65)",
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "0.8rem",
    padding: "0.4rem 0.6rem",
    outline: "none",
    width: "100%",
    borderRadius: "2px",
  };

  return (
    <Layout>
      <div className="container py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div
              className="font-mono-dbd text-xs mb-1"
              style={{ color: "oklch(0.42 0.22 22)", letterSpacing: "0.2em" }}
            >
              ALÉM DA NÉVOA 2.3
            </div>
            <h1 className="font-display text-4xl tracking-widest" style={{ color: "oklch(0.92 0.005 65)" }}>
              FICHA DE SOBREVIVENTE
            </h1>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 px-3 py-2 font-display text-xs tracking-wider transition-all"
              style={{
                background: "oklch(0.09 0.006 285)",
                border: "1px solid oklch(0.28 0.18 22 / 0.4)",
                color: "oklch(0.65 0.01 285)",
                clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))",
              }}
            >
              <Printer size={14} /> Imprimir
            </button>
            <button
              onClick={resetFicha}
              className="flex items-center gap-2 px-3 py-2 font-display text-xs tracking-wider transition-all"
              style={{
                background: "oklch(0.28 0.18 22 / 0.15)",
                border: "1px solid oklch(0.42 0.22 22 / 0.5)",
                color: "oklch(0.55 0.25 22)",
                clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))",
              }}
            >
              <RotateCcw size={14} /> Resetar
            </button>
          </div>
        </div>

        {/* IDENTIDADE */}
        <section
          className="p-5 mb-5 border"
          style={{
            background: "oklch(0.09 0.006 285)",
            borderColor: "oklch(0.28 0.18 22 / 0.35)",
            clipPath: "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))",
          }}
        >
          <div className="font-display text-sm tracking-widest mb-4" style={{ color: "oklch(0.42 0.22 22)" }}>
            IDENTIDADE
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Nome do Personagem", val: nome, set: setNome },
              { label: "Jogador", val: jogador, set: setJogador },
            ].map(({ label, val, set }) => (
              <div key={label}>
                <div className="font-mono-dbd text-xs mb-1" style={{ color: "oklch(0.42 0.22 22)", letterSpacing: "0.15em" }}>
                  {label.toUpperCase()}
                </div>
                <input
                  value={val}
                  onChange={e => set(e.target.value)}
                  style={inputStyle}
                  placeholder="..."
                />
              </div>
            ))}
            <div>
              <div className="font-mono-dbd text-xs mb-1" style={{ color: "oklch(0.42 0.22 22)", letterSpacing: "0.15em" }}>
                ESTILO
              </div>
              <select
                value={estilo}
                onChange={e => setEstilo(e.target.value)}
                style={{ ...inputStyle, cursor: "pointer" }}
              >
                <option value="">Selecione...</option>
                {ESTILOS_SOBREVIVENTE.map(e => (
                  <option key={e.nome} value={e.nome}>{e.nome}</option>
                ))}
              </select>
              {estilo && (
                <div className="mt-1 text-xs" style={{ color: "oklch(0.55 0.01 285)", fontFamily: "'Source Serif 4', serif", fontStyle: "italic" }}>
                  {ESTILOS_SOBREVIVENTE.find(e => e.nome === estilo)?.bonus}
                </div>
              )}
            </div>
            <div>
              <div className="font-mono-dbd text-xs mb-1" style={{ color: "oklch(0.42 0.22 22)", letterSpacing: "0.15em" }}>
                SESSÃO / CAMPANHA
              </div>
              <input value={sessao} onChange={e => setSessao(e.target.value)} style={inputStyle} placeholder="..." />
            </div>
          </div>
        </section>

        {/* ATRIBUTOS + SAÚDE */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
          {/* Atributos */}
          {atributos.map((attr, i) => (
            <section
              key={attr.nome}
              className="p-5 border text-center"
              style={{
                background: "oklch(0.09 0.006 285)",
                borderColor: "oklch(0.28 0.18 22 / 0.35)",
                clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
              }}
            >
              <div className="font-display text-sm tracking-widest mb-3" style={{ color: "oklch(0.42 0.22 22)" }}>
                {attr.nome.toUpperCase()}
              </div>
              <div className="flex justify-center gap-2 mb-3 flex-wrap">
                {Array.from({ length: attr.max }, (_, j) => (
                  <button
                    key={j}
                    onClick={() => setAtributoValor(i, j + 1 === attr.valor ? j : j + 1)}
                    className="transition-all"
                    style={{
                      width: "22px",
                      height: "22px",
                      borderRadius: "50%",
                      border: `1.5px solid ${j < attr.valor ? "oklch(0.55 0.25 22)" : "oklch(0.28 0.18 22 / 0.5)"}`,
                      background: j < attr.valor ? "oklch(0.42 0.22 22)" : "oklch(0.28 0.18 22 / 0.1)",
                      boxShadow: j < attr.valor ? "0 0 6px rgba(180,0,0,0.5)" : "none",
                      cursor: "pointer",
                    }}
                  />
                ))}
              </div>
              <div className="font-display text-4xl" style={{ color: "oklch(0.92 0.005 65)" }}>
                {attr.valor}
              </div>
              <div className="text-xs mt-1" style={{ color: "oklch(0.45 0.01 285)", fontFamily: "'JetBrains Mono', monospace" }}>
                {attr.desc}
              </div>
            </section>
          ))}
        </div>

        {/* SAÚDE */}
        <section
          className="p-5 mb-5 border"
          style={{
            background: "oklch(0.09 0.006 285)",
            borderColor: "oklch(0.28 0.18 22 / 0.35)",
            clipPath: "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))",
          }}
        >
          <div className="font-display text-sm tracking-widest mb-4" style={{ color: "oklch(0.42 0.22 22)" }}>
            ESTADO DE SAÚDE
          </div>
          <div className="grid grid-cols-3 gap-3">
            {([3, 2, 1] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSaude(s)}
                className="p-4 border text-center transition-all"
                style={{
                  background: saude === s ? `${saudeColors[s]}20` : "oklch(0.07 0.005 285)",
                  borderColor: saude === s ? saudeColors[s] : "oklch(0.28 0.18 22 / 0.3)",
                  boxShadow: saude === s ? `0 0 15px ${saudeColors[s]}40` : "none",
                  clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
                }}
              >
                <div className="font-display text-3xl" style={{ color: saudeColors[s] }}>{s}</div>
                <div className="font-display text-xs tracking-widest mt-1" style={{ color: saude === s ? saudeColors[s] : "oklch(0.45 0.01 285)" }}>
                  {saudeLabels[s]}
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* VANTAGENS */}
        <section
          className="p-5 mb-5 border"
          style={{
            background: "oklch(0.09 0.006 285)",
            borderColor: "oklch(0.28 0.18 22 / 0.35)",
            clipPath: "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))",
          }}
        >
          <div className="font-display text-sm tracking-widest mb-4" style={{ color: "oklch(0.42 0.22 22)" }}>
            VANTAGENS (MÁX. 4)
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {vantagens.map((v, i) => (
              <div
                key={i}
                className="border p-3"
                style={{
                  borderColor: "oklch(0.28 0.18 22 / 0.3)",
                  background: "oklch(0.07 0.005 285)",
                  clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
                }}
              >
                <div className="font-mono-dbd text-xs mb-2" style={{ color: "oklch(0.42 0.22 22)", letterSpacing: "0.1em" }}>
                  VANTAGEM {["I", "II", "III", "IV"][i]}
                </div>
                <select
                  value={v.nome}
                  onChange={e => {
                    const novo = [...vantagens];
                    novo[i] = { nome: e.target.value, desc: "" };
                    setVantagens(novo);
                  }}
                  style={{ ...inputStyle, marginBottom: "6px" }}
                >
                  <option value="">Selecione uma vantagem...</option>
                  {VANTAGENS_LISTA.map(vl => (
                    <option key={vl} value={vl}>{vl}</option>
                  ))}
                </select>
                <textarea
                  value={v.desc}
                  onChange={e => {
                    const novo = [...vantagens];
                    novo[i] = { ...novo[i], desc: e.target.value };
                    setVantagens(novo);
                  }}
                  placeholder="Descrição / efeito..."
                  rows={2}
                  style={{
                    ...inputStyle,
                    resize: "none",
                    fontFamily: "'Source Serif 4', serif",
                    fontSize: "0.75rem",
                  }}
                />
              </div>
            ))}
          </div>
        </section>

        {/* ITEM E PONTOS DE SANGUE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          <section
            className="p-5 border"
            style={{
              background: "oklch(0.09 0.006 285)",
              borderColor: "oklch(0.28 0.18 22 / 0.35)",
              clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
            }}
          >
            <div className="font-display text-sm tracking-widest mb-4" style={{ color: "oklch(0.42 0.22 22)" }}>
              ITEM & OFERENDA
            </div>
            <div className="space-y-3">
              <div>
                <div className="font-mono-dbd text-xs mb-1" style={{ color: "oklch(0.42 0.22 22)", letterSpacing: "0.15em" }}>ITEM CARREGADO</div>
                <input value={item} onChange={e => setItem(e.target.value)} style={inputStyle} placeholder="Ex: Kit Médico, Lanterna..." />
              </div>
              <div>
                <div className="font-mono-dbd text-xs mb-1" style={{ color: "oklch(0.42 0.22 22)", letterSpacing: "0.15em" }}>CARGAS RESTANTES</div>
                <input value={cargas} onChange={e => setCargas(e.target.value)} style={inputStyle} placeholder="Ex: 3/5" />
              </div>
              <div>
                <div className="font-mono-dbd text-xs mb-1" style={{ color: "oklch(0.42 0.22 22)", letterSpacing: "0.15em" }}>OFERENDA</div>
                <input value={oferenda} onChange={e => setOferenda(e.target.value)} style={inputStyle} placeholder="Ex: Mapa do Massacre..." />
              </div>
            </div>
          </section>

          <section
            className="p-5 border"
            style={{
              background: "oklch(0.09 0.006 285)",
              borderColor: "oklch(0.28 0.18 22 / 0.35)",
              clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
            }}
          >
            <div className="font-display text-sm tracking-widest mb-4" style={{ color: "oklch(0.42 0.22 22)" }}>
              PONTOS DE SANGUE
            </div>
            <div className="flex items-center gap-4 mb-3">
              <button
                onClick={() => setPontosSangue(Math.max(0, pontosSangue - 1))}
                className="w-10 h-10 font-display text-xl transition-all"
                style={{
                  background: "oklch(0.28 0.18 22 / 0.2)",
                  border: "1px solid oklch(0.42 0.22 22 / 0.5)",
                  color: "oklch(0.92 0.005 65)",
                }}
              >
                −
              </button>
              <div className="font-display text-5xl flex-1 text-center" style={{ color: "oklch(0.42 0.22 22)" }}>
                {pontosSangue}
              </div>
              <button
                onClick={() => setPontosSangue(pontosSangue + 1)}
                className="w-10 h-10 font-display text-xl transition-all"
                style={{
                  background: "oklch(0.28 0.18 22 / 0.2)",
                  border: "1px solid oklch(0.42 0.22 22 / 0.5)",
                  color: "oklch(0.92 0.005 65)",
                }}
              >
                +
              </button>
            </div>
            <div className="text-xs" style={{ color: "oklch(0.45 0.01 285)", fontFamily: "'Source Serif 4', serif" }}>
              Nova Vantagem: 5 pts · Oferenda: 3 pts
            </div>
          </section>
        </div>

        {/* EFEITOS */}
        <section
          className="p-5 mb-5 border"
          style={{
            background: "oklch(0.09 0.006 285)",
            borderColor: "oklch(0.28 0.18 22 / 0.35)",
            clipPath: "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))",
          }}
        >
          <div className="font-display text-sm tracking-widest mb-4" style={{ color: "oklch(0.42 0.22 22)" }}>
            EFEITOS ATIVOS
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {EFEITOS.map(ef => (
              <button
                key={ef.id}
                onClick={() => toggleEfeito(ef.id)}
                className="flex items-center gap-2 p-2 border text-left transition-all"
                style={{
                  background: efeitos[ef.id] ? "oklch(0.28 0.18 22 / 0.2)" : "oklch(0.07 0.005 285)",
                  borderColor: efeitos[ef.id] ? "oklch(0.42 0.22 22)" : "oklch(0.28 0.18 22 / 0.25)",
                  clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))",
                }}
                title={ef.desc}
              >
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "2px",
                    border: `1px solid ${efeitos[ef.id] ? "oklch(0.55 0.25 22)" : "oklch(0.28 0.18 22 / 0.5)"}`,
                    background: efeitos[ef.id] ? "oklch(0.42 0.22 22)" : "transparent",
                    flexShrink: 0,
                  }}
                />
                <span
                  className="font-mono-dbd text-xs"
                  style={{ color: efeitos[ef.id] ? "oklch(0.92 0.005 65)" : "oklch(0.55 0.01 285)" }}
                >
                  {ef.nome}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* NOTAS */}
        <section
          className="p-5 border"
          style={{
            background: "oklch(0.09 0.006 285)",
            borderColor: "oklch(0.28 0.18 22 / 0.35)",
            clipPath: "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))",
          }}
        >
          <div className="font-display text-sm tracking-widest mb-4" style={{ color: "oklch(0.42 0.22 22)" }}>
            HISTÓRIA & ANOTAÇÕES
          </div>
          <textarea
            value={notas}
            onChange={e => setNotas(e.target.value)}
            rows={4}
            placeholder="Backstory do personagem, anotações da sessão..."
            style={{
              ...inputStyle,
              resize: "vertical",
              fontFamily: "'Source Serif 4', serif",
              fontSize: "0.875rem",
              lineHeight: "1.6",
            }}
          />
        </section>
      </div>
    </Layout>
  );
}
