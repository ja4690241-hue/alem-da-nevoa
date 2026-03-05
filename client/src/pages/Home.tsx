/* Home — Terminal da Entidade
   Hero com imagem, cards de acesso rápido, overview do sistema */

import { Link } from "wouter";
import Layout from "@/components/Layout";
import { Skull, Users, BookOpen, Star, Map, ChevronRight, Zap } from "lucide-react";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663406734159/6rsjksSkoQXT9eaanuqDMk/dbd_hero_bg-FDi6FsKhRbWrGGGQKAR3NT.webp";
const SURVIVOR_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663406734159/6rsjksSkoQXT9eaanuqDMk/dbd_survivor_card-Hk5iMkY8Fv5yuJAit63HCV.webp";
const KILLER_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663406734159/6rsjksSkoQXT9eaanuqDMk/dbd_killer_card-FQBk2kVuERQtXq88uugxjS.webp";
const FOG_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663406734159/6rsjksSkoQXT9eaanuqDMk/dbd_fog_texture-XxAZGdHkXsCvZwTWMWh6pP.webp";

const quickLinks = [
  {
    path: "/ficha-sobrevivente",
    label: "Ficha de Sobrevivente",
    desc: "Crie e gerencie seus personagens sobreviventes",
    icon: Users,
    color: "oklch(0.42 0.22 22)",
  },
  {
    path: "/ficha-assassino",
    label: "Ficha do Assassino",
    desc: "Configure o assassino para a sessão",
    icon: Skull,
    color: "oklch(0.55 0.25 22)",
  },
  {
    path: "/regras",
    label: "Regras do Sistema",
    desc: "Atributos, testes, estados de saúde e mecânicas",
    icon: BookOpen,
    color: "oklch(0.42 0.22 22)",
  },
  {
    path: "/vantagens",
    label: "Lista de Vantagens",
    desc: "Todas as vantagens de sobreviventes e assassinos",
    icon: Star,
    color: "oklch(0.55 0.25 22)",
  },
  {
    path: "/guia-mestre",
    label: "Guia do Mestre",
    desc: "Referência rápida para conduzir sessões",
    icon: Map,
    color: "oklch(0.42 0.22 22)",
  },
];

const systemStats = [
  { label: "Atributos", value: "3", desc: "Cooperação · Fôlego · Foco" },
  { label: "Estados de Saúde", value: "3", desc: "Saudável · Ferido · Em Risco" },
  { label: "Estilos de Sobrevivente", value: "6", desc: "Cada um com bônus únicos" },
  { label: "Estilos de Assassino", value: "7", desc: "Diferentes formas de caçar" },
  { label: "Vantagens Disponíveis", value: "30+", desc: "Para sobreviventes e assassinos" },
  { label: "Habilidades Especiais", value: "7", desc: "Uma por assassino" },
];

export default function Home() {
  return (
    <Layout>
      {/* HERO */}
      <section
        className="relative min-h-[520px] flex items-end overflow-hidden"
        style={{
          backgroundImage: `url(${HERO_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(5,5,5,0.3) 0%, rgba(5,5,5,0.6) 60%, oklch(0.06 0.005 285) 100%)",
          }}
        />
        {/* Scanlines */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 4px)",
          }}
        />

        <div className="relative z-10 container py-12">
          <div
            className="dbd-badge inline-block mb-4"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "0.75rem",
              letterSpacing: "0.2em",
              padding: "3px 12px",
              border: "1px solid oklch(0.42 0.22 22 / 0.7)",
              background: "oklch(0.28 0.18 22 / 0.2)",
              color: "oklch(0.55 0.25 22)",
            }}
          >
            Sistema de RPG de Mesa
          </div>
          <h1
            className="font-display text-6xl md:text-8xl leading-none mb-3"
            style={{ color: "oklch(0.92 0.005 65)", textShadow: "0 0 40px rgba(139,0,0,0.5)" }}
          >
            ALÉM DA
          </h1>
          <h1
            className="font-display text-6xl md:text-8xl leading-none mb-6"
            style={{ color: "oklch(0.42 0.22 22)", textShadow: "0 0 40px rgba(139,0,0,0.8)" }}
          >
            NÉVOA
          </h1>
          <p
            className="text-lg max-w-xl leading-relaxed"
            style={{ color: "oklch(0.75 0.005 65)", fontFamily: "'Source Serif 4', serif" }}
          >
            Um sistema de RPG de mesa baseado em Dead by Daylight. Sobreviventes tentam escapar enquanto o Assassino os caça pela névoa. Versão 2.3.
          </p>
        </div>
      </section>

      {/* STATS BAR */}
      <section
        className="border-y"
        style={{
          borderColor: "oklch(0.28 0.18 22 / 0.3)",
          background: "oklch(0.08 0.005 285)",
        }}
      >
        <div className="container py-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {systemStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div
                  className="font-display text-3xl"
                  style={{ color: "oklch(0.42 0.22 22)" }}
                >
                  {stat.value}
                </div>
                <div
                  className="font-display text-xs tracking-wider mt-1"
                  style={{ color: "oklch(0.92 0.005 65)" }}
                >
                  {stat.label}
                </div>
                <div
                  className="text-xs mt-1"
                  style={{ color: "oklch(0.45 0.01 285)", fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {stat.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUICK ACCESS */}
      <section className="container py-12">
        <div className="flex items-center gap-3 mb-8">
          <Zap size={18} style={{ color: "oklch(0.42 0.22 22)" }} />
          <h2 className="font-display text-3xl tracking-widest" style={{ color: "oklch(0.92 0.005 65)" }}>
            ACESSO RÁPIDO
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickLinks.map(({ path, label, desc, icon: Icon }) => (
            <Link key={path} href={path}>
              <div
                className="group cursor-pointer p-5 border transition-all duration-250"
                style={{
                  background: "oklch(0.09 0.006 285)",
                  borderColor: "oklch(0.28 0.18 22 / 0.35)",
                  clipPath: "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "oklch(0.42 0.22 22)";
                  (e.currentTarget as HTMLDivElement).style.background = "oklch(0.11 0.008 285)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 20px rgba(139,0,0,0.25)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "oklch(0.28 0.18 22 / 0.35)";
                  (e.currentTarget as HTMLDivElement).style.background = "oklch(0.09 0.006 285)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <Icon size={22} style={{ color: "oklch(0.42 0.22 22)" }} />
                  <ChevronRight
                    size={16}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: "oklch(0.42 0.22 22)" }}
                  />
                </div>
                <div
                  className="font-display text-lg tracking-wider mb-2"
                  style={{ color: "oklch(0.92 0.005 65)" }}
                >
                  {label}
                </div>
                <div
                  className="text-sm leading-relaxed"
                  style={{ color: "oklch(0.55 0.01 285)", fontFamily: "'Source Serif 4', serif" }}
                >
                  {desc}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SURVIVOR / KILLER SHOWCASE */}
      <section
        className="py-12"
        style={{
          backgroundImage: `url(${FOG_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "rgba(5,5,5,0.75)" }}
        />
        <div className="container relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Survivor */}
            <div
              className="overflow-hidden border"
              style={{
                borderColor: "oklch(0.28 0.18 22 / 0.4)",
                background: "oklch(0.08 0.005 285 / 0.9)",
                clipPath: "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))",
              }}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={SURVIVOR_IMG}
                  alt="Sobrevivente"
                  className="w-full h-full object-cover"
                  style={{ filter: "brightness(0.85) saturate(0.8)" }}
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, oklch(0.08 0.005 285) 0%, transparent 60%)" }}
                />
                <div className="absolute bottom-4 left-4">
                  <div
                    className="font-display text-3xl"
                    style={{ color: "oklch(0.92 0.005 65)", textShadow: "0 2px 10px rgba(0,0,0,0.8)" }}
                  >
                    SOBREVIVENTE
                  </div>
                </div>
              </div>
              <div className="p-5">
                <p className="text-sm leading-relaxed mb-4" style={{ color: "oklch(0.65 0.01 285)", fontFamily: "'Source Serif 4', serif" }}>
                  Personagens jogáveis que precisam consertar geradores, escapar e sobreviver ao assassino. Possuem 3 atributos, até 4 vantagens e um item especial.
                </p>
                <Link href="/ficha-sobrevivente">
                  <div
                    className="inline-flex items-center gap-2 px-4 py-2 font-display text-sm tracking-wider cursor-pointer transition-all"
                    style={{
                      background: "oklch(0.28 0.18 22 / 0.3)",
                      border: "1px solid oklch(0.42 0.22 22)",
                      color: "oklch(0.92 0.005 65)",
                      clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
                    }}
                  >
                    Abrir Ficha <ChevronRight size={14} />
                  </div>
                </Link>
              </div>
            </div>

            {/* Killer */}
            <div
              className="overflow-hidden border"
              style={{
                borderColor: "oklch(0.42 0.22 22 / 0.5)",
                background: "oklch(0.08 0.005 285 / 0.9)",
                clipPath: "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))",
              }}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={KILLER_IMG}
                  alt="Assassino"
                  className="w-full h-full object-cover"
                  style={{ filter: "brightness(0.8) saturate(0.9)" }}
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, oklch(0.08 0.005 285) 0%, transparent 60%)" }}
                />
                <div className="absolute bottom-4 left-4">
                  <div
                    className="font-display text-3xl"
                    style={{ color: "oklch(0.55 0.25 22)", textShadow: "0 2px 10px rgba(0,0,0,0.8)" }}
                  >
                    ASSASSINO
                  </div>
                </div>
              </div>
              <div className="p-5">
                <p className="text-sm leading-relaxed mb-4" style={{ color: "oklch(0.65 0.01 285)", fontFamily: "'Source Serif 4', serif" }}>
                  Controlado pelo Mestre ou por um jogador. Possui Violência, Tormento, Sede de Sangue, uma Habilidade Especial e até 4 vantagens para caçar os sobreviventes.
                </p>
                <Link href="/ficha-assassino">
                  <div
                    className="inline-flex items-center gap-2 px-4 py-2 font-display text-sm tracking-wider cursor-pointer transition-all"
                    style={{
                      background: "oklch(0.42 0.22 22 / 0.3)",
                      border: "1px solid oklch(0.55 0.25 22)",
                      color: "oklch(0.92 0.005 65)",
                      clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
                    }}
                  >
                    Abrir Ficha <ChevronRight size={14} />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        className="border-t py-6"
        style={{ borderColor: "oklch(0.28 0.18 22 / 0.2)" }}
      >
        <div className="container text-center">
          <div className="font-mono-dbd text-xs" style={{ color: "oklch(0.35 0.01 285)" }}>
            Além da Névoa 2.3 · Sistema de RPG baseado em Dead by Daylight · Idealizador: Myerzinho
          </div>
        </div>
      </footer>
    </Layout>
  );
}
