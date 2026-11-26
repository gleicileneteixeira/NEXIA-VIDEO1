"use client";

import { Play, Clock, Eye, MoreHorizontal, Plus } from "lucide-react";

const videos = [
  { title: "Roteiro Viral — Episodio 12", duration: "03:42", views: "12.4k", status: "Publicado", thumb: "bg-gradient-to-br from-violet-900/60 to-fuchsia-900/60" },
  { title: "Tutorial QuickCut Pro", duration: "08:15", views: "8.2k", status: "Pendente", thumb: "bg-gradient-to-br from-cyan-900/60 to-blue-900/60" },
  { title: "Behind the Scenes — Estudio", duration: "05:30", views: "3.1k", status: "Rascunho", thumb: "bg-gradient-to-br from-amber-900/60 to-orange-900/60" },
];

export default function VideosPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-3 duration-700">
      {/* Hero header */}
      <div className="relative overflow-hidden rounded-[20px] p-8 md:p-10 bg-gradient-to-br from-purple-600/15 via-pink-600/10 to-purple-600/5 border border-slate-800/80">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-purple-600/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3" />
        <div className="relative z-10">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-3">Painel de Videos</h1>
          <p className="text-slate-400 text-base md:text-lg max-w-xl">Gerencie, edite e publique seus conteudos em um so lugar. Design atualizado, funcoes preservadas.</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Videos", value: "142", sub: "+12 esta semana", color: "text-purple-400" },
          { label: "Visualizacoes", value: "48.3k", sub: "+8.2%", color: "text-emerald-400" },
          { label: "Em edicao", value: "18", sub: "Pendentes", color: "text-amber-400" },
        ].map((s) => (
          <div key={s.label} className="bg-slate-900/90 backdrop-blur-xl border border-slate-800/80 rounded-[16px] p-6 shadow-xl">
            <div className="text-slate-400 text-sm font-medium mb-1">{s.label}</div>
            <div className="text-3xl font-bold text-white">{s.value}</div>
            <div className={`text-xs ${s.color} mt-2`}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Video grid */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-white">Ultimos videos</h2>
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-[10px] bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-medium hover:from-purple-500 hover:to-pink-500 transition-all shadow-lg shadow-purple-600/30">
            <Plus className="w-4 h-4" /> Novo video
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {videos.map((v) => (
            <div key={v.title} className="bg-slate-900/90 backdrop-blur-xl border border-slate-800/80 rounded-[16px] overflow-hidden hover:-translate-y-1 hover:border-slate-700/80 transition-all duration-300 shadow-xl group">
              <div className={`h-36 ${v.thumb} relative flex items-center justify-center`}>
                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                  <Play className="w-5 h-5 text-white ml-1" fill="white" />
                </div>
                <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-black/60 text-xs text-white font-medium">{v.duration}</span>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="font-semibold text-white leading-snug line-clamp-2">{v.title}</h3>
                  <button className="shrink-0 p-1 rounded-md hover:bg-slate-800/60"><MoreHorizontal className="w-4 h-4 text-slate-400" /></button>
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {v.views}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {v.duration}</span>
                </div>
                <div className="mt-3 pt-3 border-t border-slate-800/60 flex items-center justify-between">
                  <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${v.status === "Publicado" ? "bg-emerald-500/10 text-emerald-400" : v.status === "Pendente" ? "bg-amber-500/10 text-amber-400" : "bg-slate-700/30 text-slate-300"}`}>{v.status}</span>
                  <span className="text-purple-400 text-xs font-medium hover:underline">Edit</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
