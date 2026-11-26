"use client";

import { usePathname } from "next/navigation";
import {
  Sparkles,
  Video,
  Flame,
  BookOpen,
  Bookmark,
  Lightbulb,
  Zap,
  Key,
  Download,
  Film,
  Settings,
  Cpu,
  Layers,
  Bell,
  Search,
  User,
  ChevronDown,
} from "lucide-react";

const ROUTE_LABELS: Record<string, { title: string; subtitle: string }> = {
  "/dashboard": { title: "Dashboard", subtitle: "Painel geral & metricas virais" },
  "/script": { title: "Roteiro & IA", subtitle: "Gerador em 4 partes & ganchos" },
  "/mass-production": { title: "Criacao em Massa", subtitle: "Geracao de roteiros em lote" },
  "/editor": { title: "Editor Studio", subtitle: "Teleprompter & edicao de ritmo" },
  "/studio": { title: "Fabrica de Posts", subtitle: "Carrosseis & copies magneticas" },
  "/calendar": { title: "Calendario", subtitle: "Grade semanal de postagens" },
  "/publish": { title: "Publicacao", subtitle: "Checklist & distribuicao" },
  "/pdf-merge": { title: "Juntar PDF", subtitle: "Consolidacao de roteiros" },
  "/videos": { title: "Videos Studio", subtitle: "Juncao FFmpeg, extracao & galeria" },
  "/speed-paint": { title: "SpeedPaint", subtitle: "Storyboards & prompts de cena" },
  "/settings": { title: "Configuracoes", subtitle: "Chaves de API, VPS & Gateway" },
};

interface HeaderProps {
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
  savedCount?: number;
  onNewScriptClick?: () => void;
}

export default function Header({
  activeTab = "generator",
  setActiveTab,
  savedCount = 0,
  onNewScriptClick,
}: HeaderProps) {
  const pathname = usePathname();
  const currentInfo = ROUTE_LABELS[pathname] || ROUTE_LABELS["/dashboard"];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Route Title */}
        <div className="flex items-center gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-extrabold tracking-tight text-white">
                {currentInfo.title}
              </h1>
              <span className="hidden sm:inline-flex rounded-full bg-purple-500/10 px-2 py-0.5 text-[9px] font-black text-purple-300 border border-purple-500/20 uppercase tracking-wide">
                4-Partes AI
              </span>
            </div>
            <p className="hidden text-xs text-slate-400 md:block">
              {currentInfo.subtitle}
            </p>
          </div>
        </div>

        {/* Contextual Sub-Tabs */}
        <div className="flex items-center gap-2">
          {pathname === "/script" && (
            <nav className="flex items-center gap-1 rounded-xl bg-slate-900/90 p-1 border border-slate-800 overflow-x-auto max-w-[50vw] sm:max-w-none">
              <button
                onClick={() => setActiveTab?.("generator")}
                className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  activeTab === "generator"
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md shadow-purple-600/30"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                }`}
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>Gerador</span>
              </button>

              <button
                onClick={() => setActiveTab?.("hook_lab")}
                className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  activeTab === "hook_lab"
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md shadow-purple-600/30"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                }`}
              >
                <Flame className="h-3.5 w-3.5 text-amber-400" />
                <span>Lab Ganchos</span>
              </button>

              <button
                onClick={() => setActiveTab?.("saved")}
                className={`relative flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  activeTab === "saved"
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md shadow-purple-600/30"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                }`}
              >
                <Bookmark className="h-3.5 w-3.5" />
                <span>Salvos</span>
                {savedCount > 0 && (
                  <span className="rounded-full bg-pink-500/20 px-1.5 py-0.2 text-[9px] font-bold text-pink-300 border border-pink-500/30">
                    {savedCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab?.("playbook")}
                className={`hidden sm:flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  activeTab === "playbook"
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md shadow-purple-600/30"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                }`}
              >
                <BookOpen className="h-3.5 w-3.5" />
                <span>Playbook</span>
              </button>
            </nav>
          )}

          {pathname === "/videos" && (
            <nav className="flex items-center gap-1 rounded-xl bg-slate-900/90 p-1 border border-slate-800 overflow-x-auto max-w-[50vw] sm:max-w-none">
              <button
                onClick={() => setActiveTab?.("merger")}
                className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  activeTab === "merger"
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md shadow-purple-600/30"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                }`}
              >
                <Layers className="h-3.5 w-3.5 text-pink-400" />
                <span>Juncao de Videos</span>
                <span className="rounded-full bg-purple-500/20 px-1.5 py-0.2 text-[9px] font-black text-purple-300 border border-purple-500/30">
                  FFmpeg
                </span>
              </button>

              <button
                onClick={() => setActiveTab?.("extractor")}
                className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  activeTab === "extractor"
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md shadow-purple-600/30"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                }`}
              >
                <Video className="h-3.5 w-3.5" />
                <span>Extrair Midia</span>
              </button>

              <button
                onClick={() => setActiveTab?.("downloader")}
                className={`hidden sm:flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  activeTab === "downloader"
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md shadow-purple-600/30"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                }`}
              >
                <Download className="h-3.5 w-3.5" />
                <span>Baixar Link</span>
              </button>

              <button
                onClick={() => setActiveTab?.("gallery")}
                className={`hidden md:flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  activeTab === "gallery"
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md shadow-purple-600/30"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                }`}
              >
                <Film className="h-3.5 w-3.5" />
                <span>Galeria</span>
              </button>
            </nav>
          )}

          {pathname === "/settings" && (
            <nav className="flex items-center gap-1 rounded-xl bg-slate-900/90 p-1 border border-slate-800">
              <button
                onClick={() => setActiveTab?.("apikeys")}
                className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  activeTab === "apikeys"
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md shadow-purple-600/30"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                }`}
              >
                <Settings className="h-3.5 w-3.5 text-pink-400" />
                <span>Chaves & VPS</span>
              </button>

              <button
                onClick={() => setActiveTab?.("gateway")}
                className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  activeTab === "gateway"
                    ? "bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white shadow-md shadow-purple-600/30"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                }`}
              >
                <Cpu className="h-3.5 w-3.5 text-purple-400" />
                <span>OmniRoute Gateway</span>
              </button>
            </nav>
          )}

          {/* Quick Action Button */}
          {pathname === "/script" && (
            <button
              onClick={onNewScriptClick}
              className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-purple-600 via-purple-600 to-pink-600 px-3.5 py-2 text-xs font-bold text-white shadow-md shadow-purple-600/30 transition-all hover:scale-105 active:scale-95"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Novo Roteiro</span>
            </button>
          )}

          {/* Actions */}
          <div className="flex items-center gap-2 ml-2">
            {/* Notifications */}
            <button className="relative p-2.5 rounded-[10px] hover:bg-slate-800/60 transition-colors group">
              <Bell className="w-[18px] h-[18px] text-slate-400 group-hover:text-white transition-colors" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-pink-500 rounded-full ring-2 ring-slate-900" />
            </button>

            {/* Divider */}
            <div className="w-px h-6 bg-slate-800/80 mx-1" />

            {/* User */}
            <button className="flex items-center gap-2.5 pl-1.5 pr-2 py-1.5 rounded-[10px] hover:bg-slate-800/60 transition-colors group">
              <div className="w-8 h-8 rounded-[10px] bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-md shadow-purple-600/15">
                <User className="w-4 h-4 text-white" strokeWidth={2} />
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
