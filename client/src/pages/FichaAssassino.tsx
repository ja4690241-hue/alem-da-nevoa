/* FichaAssassino — Ficha digital interativa do Assassino
   Violência, Tormento, Sede de Sangue, Habilidade Especial, Vantagens */

import { useState } from "react";
import Layout from "@/components/Layout";
import { RotateCcw, Printer } from "lucide-react";
import { toast } from "sonner";

const ESTILOS_ASSASSINO = [
  { nome: "Caçador", violencia: 3, tormento: 0, desc: "Rastreia e persegue com eficiência. Bônus ao procurar sobreviventes." },
  { nome: "Trapper", violencia: 3, tormento: 0, desc: "Usa armadilhas para capturar sobreviventes desatentos." },
  { nome: "Espiritual", violencia: 2, tormento: 1, desc: "Usa poderes sobrenaturais para atormentar e confundir." },
  { nome: "Maligno", violencia: 2, tormento: 1, desc: "Manipula o ambiente e causa medo psicológico." },
  { nome: "Furtivo", violencia: 2, tormento: 1, desc: "Age nas sombras, atacando de surpresa." },
  { nome: "Louco", violencia: 3, tormento: 0, desc: "Imprevisível e errático, difícil de rastrear." },
  { nome: "Açougueiro", violencia: 5, tormento: 0, desc: "Brutal e sanguinário. Golpes mais poderosos." },
];

const HABILIDADES = [
  { nome: "Possuir", desc: "Seres metaFôlegos podem habitar corpos vivos. Torne o controle de um sobrevivente por 2 rodadas." },
  { nome: "Quebrar", desc: "Seus golpes são pesados. Os sobreviventes ficam sob o efeito Quebrado durante todo o jogo ao serem golpeados." },
  { nome: "Espreitar", desc: "Você observa os sobreviventes antes de atacar. Substitui o ataque surpresa no início da perseguição para deixar o alvo exposto." },
  { nome: "Puxar", desc: "Ainda não acabou. O último sobrevivente que fugir da perseguição pode ser puxado de volta." },
  { nome: "Retaliar", desc: "Seus ataques são velozes. O assassino tem um turno após o turno de cada jogador." },
  { nome: "Amplificar", desc: "Seu golpe é amplificado e poderoso. Uma vez por perseguição, pode golpear 2 sobreviventes de uma só vez." },
  { nome: "Arrastar", desc: "Dividir para conquistar. Gasta sua ação para arrastar um sobrevivente para outra cena, separando o grupo." },
];

const VANTAGENS_ASSASSINO = [
  "Enganei Você!", "Morte de Franklin", "Ninguém Escapa da Morte", "Açougueiro Desleixado",
  "Insidioso", "Implacável", "Lembre-se de Mim", "Terceiro Selo",
  "Nascido da Luz", "Perdendo a Esperança", "Brinque com Sua Comida",
  "Presença Desconcertante", "Resistência", "Soberba", "Tanatofobia",
  "Nêmesis", "Faça Sua Escolha", "Dama de Ferro", "Churrasco com Chilli",
  "Força Brutal", "Rancor", "Pavor Contagiante", "Eco Sanguíneo",
];

const ACOES_ASSASSINO = [
  { nome: "Procurar", desc: "Localiza sobreviventes escondidos ou rastros" },
  { nome: "Golpear", desc: "Ataca um sobrevivente em alcance" },
  { nome: "Instalar Armadilha", desc: "Coloca armadilha no ambiente" },
  { nome: "Quebrar Obstáculo", desc: "Destrói paletes e janelas" },
  { nome: "Apagar Ritual", desc: "Desfaz rituais de sobreviventes" },
  { nome: "Habilidade Especial", desc: "Usa a habilidade única (1× por perseguição)" },
];

const ACOES_TORMENTO = [
  { nome: "Alucinar", attr: "Foco" },
  { nome: "Assustar", attr: "Fôlego" },
  { nome: "Traumatizar", attr: "Cooperação" },
  { nome: "Obcecar", attr: "Foco" },
  { nome: "Amedrontar", attr: "Foco" },
  { nome: "Atormentar", attr: "Livre" },
];

export default function FichaAssassino() {
  const [nome, setNome] = useState("");
  const [estilo, setEstilo] = useState("");
  const [controlador, setControlador] = useState("");
  const [sessao, setSessao] = useState("");
  const [violencia, setViolencia] = useState(3);
  const [tormento, setTormento] = useState(0);
  const [sedeSangue, setSedeSangue] = useState(5);
  const [maxSede, setMaxSede] = useState(10);
  const [habilidade, setHabilidade] = useState("");
  const [habilidadeUsada, setHabilidadeUsada] = useState(false);
  const [vantagens, setVantagens] = useState([
    { nome: "", desc: "" }, { nome: "", desc: "" },
    { nome: "", desc: "" }, { nome: "", desc: "" },
  ]);
  const [intervencoes, setIntervencoes] = useState(0);
  const [notas, setNotas] = useState("");
  const [obsessao, setObsessao] = useState("");
  const [tormentoAtivo, setTormentoAtivo] = useState<Record<string, boolean>>({});

  const estiloSelecionado = ESTILOS_ASSASSINO.find(e => e.nome === estilo);

  const aplicarEstilo = (nomeEstilo: string) => {
    const e = ESTILOS_ASSASSINO.find(x => x.nome === nomeEstilo);
    if (e) {
      setEstilo(nomeEstilo);
      setViolencia(e.violencia);
      setTormento(e.tormento);
    }
  };

  const resetFicha = () => {
    setNome(""); setEstilo(""); setControlador(""); setSessao("");
    setViolencia(3); setTormento(0); setSedeSangue(5); setMaxSede(10);
    setHabilidade(""); setHabilidadeUsada(false);
    setVantagens([{ nome: "", desc: "" }, { nome: "", desc: "" }, { nome: "", desc: "" }, { nome: "", desc: "" }]);
    setIntervencoes(0); setNotas(""); setObsessao("");
    setTormentoAtivo({});
    toast.success("Ficha do assassino resetada!");
  };

  const inputStyle = {
    background: "oklch(0.07 0.005 285)",
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
            <div className="font-mono-dbd text-xs mb-1" style={{ color: "oklch(0.55 0.25 22)", letterSpacing: "0.2em" }}>
              ALÉM DA NÉVOA 2.3
            </div>
            <h1 className="font-display text-4xl tracking-widest" style={{ color: "oklch(0.92 0.005 65)" }}>
              FICHA DO ASSASSINO
            </h1>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 px-3 py-2 font-display text-xs tracking-wider"
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
              className="flex items-center gap-2 px-3 py-2 font-display text-xs tracking-wider"
              style={{
                background: "oklch(0.42 0.22 22 / 0.15)",
                border: "1px solid oklch(0.55 0.25 22 / 0.5)",
                color: "oklch(0.55 0.25 22)",
                clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))",
              }}
            >
              <RotateCcw size={14} /> Resetar
            </button>
          </div>
        </div>

        {/* IDENTIDADE */}
        <section className="p-5 mb-5 border" style={{ background: "oklch(0.09 0.006 285)", borderColor: "oklch(0.42 0.22 22 / 0.4)", clipPath: "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))" }}>
          <div className="font-display text-sm tracking-widest mb-4" style={{ color: "oklch(0.55 0.25 22)" }}>IDENTIDADE DO ASSASSINO</div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="font-mono-dbd text-xs mb-1" style={{ color: "oklch(0.55 0.25 22)", letterSpacing: "0.15em" }}>NOME / CODINOME</div>
              <input value={nome} onChange={e => setNome(e.target.value)} style={inputStyle} placeholder="Ex: O Caçador, O Espírito..." />
            </div>
            <div>
              <div className="font-mono-dbd text-xs mb-1" style={{ color: "oklch(0.55 0.25 22)", letterSpacing: "0.15em" }}>CONTROLADO POR</div>
              <input value={controlador} onChange={e => setControlador(e.target.value)} style={inputStyle} placeholder="Mestre ou jogador..." />
            </div>
            <div>
              <div className="font-mono-dbd text-xs mb-1" style={{ color: "oklch(0.55 0.25 22)", letterSpacing: "0.15em" }}>ESTILO</div>
              <select value={estilo} onChange={e => aplicarEstilo(e.target.value)} style={{ ...inputStyle, cursor: "pointer" }}>
                <option value="">Selecione o estilo...</option>
                {ESTILOS_ASSASSINO.map(e => (
                  <option key={e.nome} value={e.nome}>{e.nome} (V:{e.violencia} T:{e.tormento})</option>
                ))}
              </select>
              {estiloSelecionado && (
                <div className="mt-1 text-xs italic" style={{ color: "oklch(0.55 0.01 285)", fontFamily: "'Source Serif 4', serif" }}>
                  {estiloSelecionado.desc}
                </div>
              )}
            </div>
            <div>
              <div className="font-mono-dbd text-xs mb-1" style={{ color: "oklch(0.55 0.25 22)", letterSpacing: "0.15em" }}>SESSÃO / CAMPANHA</div>
              <input value={sessao} onChange={e => setSessao(e.target.value)} style={inputStyle} placeholder="..." />
            </div>
          </div>
        </section>

        {/* ATRIBUTOS */}
        <div className="grid grid-cols-2 gap-4 mb-5">
          {[
            { label: "VIOLÊNCIA", val: violencia, set: setViolencia, desc: "Pts de Sede de Sangue ao iniciar perseguição", color: "oklch(0.55 0.25 22)" },
            { label: "TORMENTO", val: tormento, set: setTormento, desc: "Penalidade nos testes dos sobreviventes", color: "oklch(0.42 0.22 22)" },
          ].map(({ label, val, set, desc, color }) => (
            <section key={label} className="p-5 border text-center" style={{ background: "oklch(0.09 0.006 285)", borderColor: `${color}50`, clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))" }}>
              <div className="font-display text-sm tracking-widest mb-3" style={{ color }}>{label}</div>
              <div className="flex justify-center gap-2 mb-3">
                <button onClick={() => set(Math.max(0, val - 1))} className="w-8 h-8 font-display text-lg" style={{ background: "oklch(0.28 0.18 22 / 0.2)", border: `1px solid ${color}50`, color: "oklch(0.92 0.005 65)" }}>−</button>
                <div className="font-display text-5xl w-16 text-center" style={{ color: "oklch(0.92 0.005 65)" }}>{val}</div>
                <button onClick={() => set(val + 1)} className="w-8 h-8 font-display text-lg" style={{ background: "oklch(0.28 0.18 22 / 0.2)", border: `1px solid ${color}50`, color: "oklch(0.92 0.005 65)" }}>+</button>
              </div>
              <div className="text-xs" style={{ color: "oklch(0.45 0.01 285)", fontFamily: "'JetBrains Mono', monospace" }}>{desc}</div>
            </section>
          ))}
        </div>

        {/* SEDE DE SANGUE */}
        <section className="p-5 mb-5 border" style={{ background: "oklch(0.09 0.006 285)", borderColor: "oklch(0.42 0.22 22 / 0.4)", clipPath: "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))" }}>
          <div className="flex items-center justify-between mb-4">
            <div className="font-display text-sm tracking-widest" style={{ color: "oklch(0.55 0.25 22)" }}>SEDE DE SANGUE</div>
            <div className="flex items-center gap-2">
              <span className="font-mono-dbd text-xs" style={{ color: "oklch(0.45 0.01 285)" }}>MÁX:</span>
              <input
                type="number"
                value={maxSede}
                onChange={e => setMaxSede(Math.max(1, parseInt(e.target.value) || 1))}
                style={{ ...inputStyle, width: "60px", textAlign: "center" }}
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-3">
            {Array.from({ length: maxSede }, (_, i) => (
              <button
                key={i}
                onClick={() => setSedeSangue(i < sedeSangue ? i : i + 1)}
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50% 50% 50% 0",
                  transform: "rotate(-45deg)",
                  border: `1.5px solid ${i < sedeSangue ? "oklch(0.55 0.25 22)" : "oklch(0.28 0.18 22 / 0.4)"}`,
                  background: i < sedeSangue ? "oklch(0.42 0.22 22)" : "oklch(0.28 0.18 22 / 0.1)",
                  boxShadow: i < sedeSangue ? "0 0 8px rgba(180,0,0,0.5)" : "none",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
              />
            ))}
          </div>
          <div className="font-mono-dbd text-sm" style={{ color: "oklch(0.92 0.005 65)" }}>
            {sedeSangue} / {maxSede} <span style={{ color: "oklch(0.45 0.01 285)" }}>pontos restantes</span>
          </div>
        </section>

        {/* HABILIDADE ESPECIAL */}
        <section className="p-5 mb-5 border" style={{ background: "oklch(0.09 0.006 285)", borderColor: "oklch(0.42 0.22 22 / 0.4)", clipPath: "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))" }}>
          <div className="font-display text-sm tracking-widest mb-4" style={{ color: "oklch(0.55 0.25 22)" }}>HABILIDADE ESPECIAL (1× POR PERSEGUIÇÃO)</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="font-mono-dbd text-xs mb-1" style={{ color: "oklch(0.55 0.25 22)", letterSpacing: "0.15em" }}>HABILIDADE</div>
              <select value={habilidade} onChange={e => setHabilidade(e.target.value)} style={{ ...inputStyle, cursor: "pointer" }}>
                <option value="">Selecione...</option>
                {HABILIDADES.map(h => <option key={h.nome} value={h.nome}>{h.nome}</option>)}
              </select>
              {habilidade && (
                <div className="mt-2 text-xs italic" style={{ color: "oklch(0.55 0.01 285)", fontFamily: "'Source Serif 4', serif" }}>
                  {HABILIDADES.find(h => h.nome === habilidade)?.desc}
                </div>
              )}
            </div>
            <div className="flex items-center justify-center">
              <button
                onClick={() => setHabilidadeUsada(!habilidadeUsada)}
                className="px-6 py-3 font-display text-sm tracking-wider transition-all"
                style={{
                  background: habilidadeUsada ? "oklch(0.18 0.12 22 / 0.3)" : "oklch(0.42 0.22 22 / 0.3)",
                  border: `1px solid ${habilidadeUsada ? "oklch(0.28 0.18 22 / 0.4)" : "oklch(0.55 0.25 22)"}`,
                  color: habilidadeUsada ? "oklch(0.45 0.01 285)" : "oklch(0.92 0.005 65)",
                  clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
                }}
              >
                {habilidadeUsada ? "✗ USADA" : "✓ DISPONÍVEL"}
              </button>
            </div>
          </div>
        </section>

        {/* VANTAGENS */}
        <section className="p-5 mb-5 border" style={{ background: "oklch(0.09 0.006 285)", borderColor: "oklch(0.42 0.22 22 / 0.4)", clipPath: "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))" }}>
          <div className="font-display text-sm tracking-widest mb-4" style={{ color: "oklch(0.55 0.25 22)" }}>VANTAGENS (MÁX. 4)</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {vantagens.map((v, i) => (
              <div key={i} className="border p-3" style={{ borderColor: "oklch(0.28 0.18 22 / 0.3)", background: "oklch(0.07 0.005 285)", clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))" }}>
                <div className="font-mono-dbd text-xs mb-2" style={{ color: "oklch(0.55 0.25 22)", letterSpacing: "0.1em" }}>
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
                  <option value="">Selecione...</option>
                  {VANTAGENS_ASSASSINO.map(va => <option key={va} value={va}>{va}</option>)}
                </select>
                <textarea
                  value={v.desc}
                  onChange={e => {
                    const novo = [...vantagens];
                    novo[i] = { ...novo[i], desc: e.target.value };
                    setVantagens(novo);
                  }}
                  placeholder="Efeito / descrição..."
                  rows={2}
                  style={{ ...inputStyle, resize: "none", fontFamily: "'Source Serif 4', serif", fontSize: "0.75rem" }}
                />
              </div>
            ))}
          </div>
        </section>

        {/* AÇÕES + TORMENTO */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          <section className="p-5 border" style={{ background: "oklch(0.09 0.006 285)", borderColor: "oklch(0.42 0.22 22 / 0.35)", clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))" }}>
            <div className="font-display text-sm tracking-widest mb-4" style={{ color: "oklch(0.55 0.25 22)" }}>AÇÕES DISPONÍVEIS</div>
            <div className="space-y-2">
              {ACOES_ASSASSINO.map(a => (
                <div key={a.nome} className="flex items-start gap-2 p-2 border" style={{ borderColor: "oklch(0.28 0.18 22 / 0.2)", background: "oklch(0.07 0.005 285)" }}>
                  <div className="font-display text-xs tracking-wider mt-0.5" style={{ color: "oklch(0.55 0.25 22)", minWidth: "110px" }}>{a.nome}</div>
                  <div className="text-xs" style={{ color: "oklch(0.45 0.01 285)", fontFamily: "'Source Serif 4', serif" }}>{a.desc}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="p-5 border" style={{ background: "oklch(0.09 0.006 285)", borderColor: "oklch(0.42 0.22 22 / 0.35)", clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))" }}>
            <div className="font-display text-sm tracking-widest mb-4" style={{ color: "oklch(0.55 0.25 22)" }}>AÇÕES DE TORMENTO</div>
            <div className="space-y-2">
              {ACOES_TORMENTO.map(a => (
                <button
                  key={a.nome}
                  onClick={() => setTormentoAtivo(prev => ({ ...prev, [a.nome]: !prev[a.nome] }))}
                  className="w-full flex items-center gap-2 p-2 border text-left transition-all"
                  style={{
                    background: tormentoAtivo[a.nome] ? "oklch(0.28 0.18 22 / 0.2)" : "oklch(0.07 0.005 285)",
                    borderColor: tormentoAtivo[a.nome] ? "oklch(0.42 0.22 22)" : "oklch(0.28 0.18 22 / 0.2)",
                  }}
                >
                  <div style={{ width: "12px", height: "12px", borderRadius: "2px", border: `1px solid ${tormentoAtivo[a.nome] ? "oklch(0.55 0.25 22)" : "oklch(0.28 0.18 22 / 0.5)"}`, background: tormentoAtivo[a.nome] ? "oklch(0.42 0.22 22)" : "transparent", flexShrink: 0 }} />
                  <span className="font-display text-xs tracking-wider" style={{ color: tormentoAtivo[a.nome] ? "oklch(0.92 0.005 65)" : "oklch(0.55 0.01 285)" }}>{a.nome}</span>
                  <span className="font-mono-dbd text-xs ml-auto" style={{ color: "oklch(0.42 0.22 22)" }}>{a.attr}</span>
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* OBSESSÃO + INTERVENÇÕES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          <section className="p-5 border" style={{ background: "oklch(0.09 0.006 285)", borderColor: "oklch(0.42 0.22 22 / 0.35)", clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))" }}>
            <div className="font-display text-sm tracking-widest mb-3" style={{ color: "oklch(0.55 0.25 22)" }}>OBSESSÃO ATUAL</div>
            <input value={obsessao} onChange={e => setObsessao(e.target.value)} style={inputStyle} placeholder="Nome do sobrevivente obsessão..." />
            <div className="mt-2 text-xs italic" style={{ color: "oklch(0.45 0.01 285)", fontFamily: "'Source Serif 4', serif" }}>
              Alvo principal. Algumas vantagens interagem especialmente com a Obsessão.
            </div>
          </section>

          <section className="p-5 border" style={{ background: "oklch(0.09 0.006 285)", borderColor: "oklch(0.42 0.22 22 / 0.35)", clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))" }}>
            <div className="font-display text-sm tracking-widest mb-3" style={{ color: "oklch(0.55 0.25 22)" }}>INTERVENÇÕES DA ENTIDADE</div>
            <div className="flex items-center gap-3 mb-2">
              <button onClick={() => setIntervencoes(Math.max(0, intervencoes - 1))} className="w-8 h-8 font-display text-lg" style={{ background: "oklch(0.28 0.18 22 / 0.2)", border: "1px solid oklch(0.42 0.22 22 / 0.5)", color: "oklch(0.92 0.005 65)" }}>−</button>
              <div className="font-display text-4xl flex-1 text-center" style={{ color: "oklch(0.42 0.22 22)" }}>{intervencoes}</div>
              <button onClick={() => setIntervencoes(intervencoes + 1)} className="w-8 h-8 font-display text-lg" style={{ background: "oklch(0.28 0.18 22 / 0.2)", border: "1px solid oklch(0.42 0.22 22 / 0.5)", color: "oklch(0.92 0.005 65)" }}>+</button>
            </div>
            <div className="text-xs italic" style={{ color: "oklch(0.45 0.01 285)", fontFamily: "'Source Serif 4', serif" }}>
              Ganhas por sacrifícios. Usadas para modificar a cena sutilmente.
            </div>
          </section>
        </div>

        {/* NOTAS */}
        <section className="p-5 border" style={{ background: "oklch(0.09 0.006 285)", borderColor: "oklch(0.42 0.22 22 / 0.35)", clipPath: "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))" }}>
          <div className="font-display text-sm tracking-widest mb-4" style={{ color: "oklch(0.55 0.25 22)" }}>DESCRIÇÃO & ANOTAÇÕES DO MESTRE</div>
          <textarea
            value={notas}
            onChange={e => setNotas(e.target.value)}
            rows={4}
            placeholder="Backstory do assassino, táticas, anotações da sessão..."
            style={{ ...inputStyle, resize: "vertical", fontFamily: "'Source Serif 4', serif", fontSize: "0.875rem", lineHeight: "1.6" }}
          />
        </section>
      </div>
    </Layout>
  );
}
