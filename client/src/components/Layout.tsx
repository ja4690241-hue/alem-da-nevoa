/* Layout — Terminal da Entidade
   Sidebar esquerda estreita + área principal
   Paleta: void black, blood red, mist white */

import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Skull, Users, BookOpen, Shield, Star, Map } from "lucide-react";

const navItems = [
  { path: "/", label: "Início", icon: Skull },
  { path: "/ficha-sobrevivente", label: "Ficha Sobrevivente", icon: Users },
  { path: "/ficha-assassino", label: "Ficha Assassino", icon: Skull },
  { path: "/regras", label: "Regras", icon: BookOpen },
  { path: "/vantagens", label: "Vantagens", icon: Star },
  { path: "/guia-mestre", label: "Guia do Mestre", icon: Map },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-void flex" style={{ background: "oklch(0.06 0.005 285)" }}>
      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full z-40 flex flex-col
          transition-transform duration-300
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:relative lg:flex
          w-64
        `}
        style={{
          background: "oklch(0.07 0.005 285)",
          borderRight: "1px solid oklch(0.28 0.18 22 / 0.3)",
        }}
      >
        {/* Logo */}
        <div className="p-6 border-b" style={{ borderColor: "oklch(0.28 0.18 22 / 0.3)" }}>
          <div className="font-display text-2xl tracking-widest" style={{ color: "oklch(0.42 0.22 22)" }}>
            ALÉM DA
          </div>
          <div className="font-display text-4xl tracking-widest" style={{ color: "oklch(0.92 0.005 65)" }}>
            NÉVOA
          </div>
          <div
            className="font-mono-dbd text-xs mt-1"
            style={{ color: "oklch(0.55 0.01 285)", letterSpacing: "0.2em" }}
          >
            SISTEMA v2.3
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(({ path, label, icon: Icon }) => {
            const active = location === path;
            return (
              <Link key={path} href={path}>
                <div
                  onClick={() => setMobileOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-sm cursor-pointer
                    transition-all duration-200 group
                    ${active
                      ? "bg-blood-dim border-l-2 border-blood-bright"
                      : "hover:bg-blood-dim border-l-2 border-transparent hover:border-blood"
                    }
                  `}
                  style={{
                    background: active ? "oklch(0.28 0.18 22 / 0.15)" : undefined,
                    borderLeftColor: active ? "oklch(0.42 0.22 22)" : undefined,
                  }}
                >
                  <Icon
                    size={16}
                    style={{ color: active ? "oklch(0.42 0.22 22)" : "oklch(0.55 0.01 285)" }}
                  />
                  <span
                    className="font-display text-sm tracking-wider"
                    style={{
                      color: active ? "oklch(0.92 0.005 65)" : "oklch(0.65 0.01 285)",
                    }}
                  >
                    {label}
                  </span>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Footer sidebar */}
        <div className="p-4 border-t" style={{ borderColor: "oklch(0.28 0.18 22 / 0.2)" }}>
          <div className="font-mono-dbd text-xs" style={{ color: "oklch(0.35 0.01 285)" }}>
            Baseado em Dead by Daylight
          </div>
          <div className="font-mono-dbd text-xs mt-1" style={{ color: "oklch(0.28 0.18 22 / 0.8)" }}>
            Além da Névoa 2.3
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 lg:hidden"
          style={{ background: "rgba(0,0,0,0.7)" }}
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile header */}
        <header
          className="lg:hidden flex items-center justify-between px-4 py-3 border-b"
          style={{
            background: "oklch(0.07 0.005 285)",
            borderColor: "oklch(0.28 0.18 22 / 0.3)",
          }}
        >
          <div className="font-display text-xl tracking-widest" style={{ color: "oklch(0.92 0.005 65)" }}>
            ALÉM DA NÉVOA
          </div>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ color: "oklch(0.55 0.01 285)" }}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
