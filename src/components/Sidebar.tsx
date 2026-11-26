"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Sparkles,
  Factory,
  Scissors,
  Share2,
  Settings,
  Zap,
  FileStack,
  Paintbrush,
  CalendarDays,
  Store,
  Video,
} from "lucide-react";

const menuItems = [
  { icon: Home, label: "Dashboard", href: "/dashboard" },
  { icon: Sparkles, label: "Roteiro & IA", href: "/script" },
  { icon: Factory, label: "Criacao em Massa", href: "/mass-production" },
  { icon: Scissors, label: "Editor", href: "/editor" },
  { icon: Store, label: "Fabrica de Posts", href: "/studio" },
  { icon: CalendarDays, label: "Calendario", href: "/calendar" },
  { icon: Share2, label: "Publicacao", href: "/publish" },
  { icon: FileStack, label: "Juntar PDF", href: "/pdf-merge" },
  { icon: Video, label: "Videos", href: "/videos" },
  { icon: Paintbrush, label: "SpeedPaint", href: "/speed-paint" },
];

const bottomItems = [
  { icon: Settings, label: "Configuracoes", href: "/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      id="main-sidebar"
      className="fixed left-0 top-0 bottom-0 z-50 flex h-screen w-[72px] flex-col justify-between border-r border-slate-800/80 bg-slate-950 select-none"
    >
      {/* Glow ambiente no topo */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-36 bg-gradient-to-b from-purple-600/10 via-pink-600/5 to-transparent" />

      {/* =================================================================== */}
      {/* 1. LOGO (TOPO) */}
      {/* =================================================================== */}
      <div className="relative z-10 flex h-[72px] w-full items-center justify-center flex-shrink-0">
        <a
          href="/dashboard"
          title="Nexia Video - Dashboard"
          className="group flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 via-purple-600 to-pink-600 text-white shadow-lg shadow-purple-600/30 transition-all duration-200 hover:scale-105 active:scale-95"
        >
          <Zap className="h-6 w-6 text-white transition-transform duration-200 group-hover:scale-110" />
        </a>
      </div>

      {/* =================================================================== */}
      {/* 2. MENU PRINCIPAL (MEIO) */}
      {/* =================================================================== */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-start gap-1.5 overflow-y-auto py-2 px-3 no-scrollbar [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              title={item.label}
              className={`group relative flex h-[48px] w-[48px] items-center justify-center rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-gradient-to-r from-purple-600/25 via-pink-600/20 to-purple-600/10 text-white shadow-sm ring-1 ring-purple-500/30"
                  : "text-slate-400 hover:bg-slate-800/60 hover:text-white"
              }`}
            >
              {/* Barra lateral esquerda colorida quando ativo */}
              {isActive && (
                <span
                  className="absolute -left-3 top-1.5 bottom-1.5 w-[3px] rounded-r-full bg-gradient-to-b from-purple-500 via-pink-500 to-purple-500"
                  aria-hidden="true"
                />
              )}

              {/* Ícone */}
              <Icon
                className={`h-5 w-5 transition-transform duration-200 group-hover:scale-110 ${
                  isActive ? "text-purple-300" : "text-slate-400 group-hover:text-white"
                }`}
                strokeWidth={isActive ? 2.2 : 1.8}
              />
            </Link>
          );
        })}
      </div>

      {/* =================================================================== */}
      {/* 3. CONFIGURACOES (RODAPE) */}
      {/* =================================================================== */}
      <div className="relative z-10 flex h-[72px] w-full flex-shrink-0 items-center justify-center border-t border-slate-800/80 px-3">
        {bottomItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              title={item.label}
              className={`group relative flex h-[48px] w-[48px] items-center justify-center rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-gradient-to-r from-purple-600/25 via-pink-600/20 to-purple-600/10 text-white shadow-sm ring-1 ring-purple-500/30"
                  : "text-slate-400 hover:bg-slate-800/60 hover:text-white"
              }`}
            >
              {/* Barra lateral esquerda colorida quando ativo */}
              {isActive && (
                <span
                  className="absolute -left-3 top-1.5 bottom-1.5 w-[3px] rounded-r-full bg-gradient-to-b from-purple-500 via-pink-500 to-purple-500"
                  aria-hidden="true"
                />
              )}

              {/* Ícone */}
              <Icon
                className={`h-5 w-5 transition-transform duration-200 group-hover:scale-110 ${
                  isActive ? "text-purple-300" : "text-slate-400 group-hover:text-white"
                }`}
                strokeWidth={isActive ? 2.2 : 1.8}
              />
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
