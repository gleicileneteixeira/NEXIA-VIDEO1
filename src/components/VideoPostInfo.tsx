"use client";

import { useState } from "react";
import { Copy, Sparkles, Hash, FileText } from "lucide-react";
import { runAgentEngine, type AgentConfig } from "@/lib/agentEngine";

function extractTextFromTranscript(text: string): string {
  // Simplifica: remove repeticoes, pega primeiras frases como headline
  const sentences = text.split(/[.!?]+/).map(s => s.trim()).filter(Boolean);
  const core = sentences.slice(0, 3).join(" ").slice(0, 120);
  return core || "Vídeo de impacto — confira!";
}

function buildHeadline(text: string): string {
  const base = extractTextFromTranscript(text);
  return `🔥 ${base}`;
}

function buildDescription(text: string): string {
  const body = extractTextFromTranscript(text) || "Conteúdo incrível.";
  const tags = ["#viral", "#video", "#reels", "#trend", "#fyp"];
  return `${body}\n\n${tags.join("  ")}`;
}

export default function VideoPostInfo({ videoUrl, videoName }: { videoUrl: string; videoName: string }) {
  const [headline, setHeadline] = useState("");
  const [desc, setDesc] = useState("");
  const [processing, setProcessing] = useState(false);

  const generate = async () => {
    setProcessing(true);
    try {
      const cfg: AgentConfig = { provider: "llama", apiKeyName: "Motor", freeOnly: false, strategy: "auto" };
      const res = await runAgentEngine(`Vídeo: ${videoName}`, cfg);
      // Usa resposta do motor como base para headline/descrição
      const base = res.response || "Conteúdo de impacto.";
      setHeadline(`🔥 ${base.slice(0, 120)}`);
      setDesc(`${base}\n\n#viral  #video  #reels  #trend  #fyp`);
    } catch {
      setHeadline("🔥 Confira este vídeo!");
      setDesc("Vídeo poderoso.\n\n#viral #video #reels #trend #fyp");
    } finally {
      setProcessing(false);
    }
  };

  const copy = async (t: string) => {
    await navigator.clipboard.writeText(t);
  };

  return (
    <div className="bg-[#13131f] border border-[#1e293b] rounded-xl p-4 space-y-3 mt-3">
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 uppercase tracking-wider">
        <Sparkles size={14} /> Post para Redes
      </div>

      {!headline && (
        <button
          onClick={generate}
          disabled={processing}
          className="w-full bg-gradient-to-r from-[#8b5cf6] to-[#6366f1] hover:from-[#7c4cf0] hover:to-[#5b5ce6] text-white text-xs font-medium rounded-lg px-4 py-2.5 transition-colors disabled:opacity-60"
        >
          {processing ? "Gerando..." : "Gerar headline + descrição + hashtags"}
        </button>
      )}

      {headline && (
        <>
          <div className="bg-[#0f172a] border border-[#1e293b] rounded-lg p-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] text-slate-400 font-medium">Headline</span>
              <button onClick={() => copy(headline)} className="text-slate-400 hover:text-white" title="Copiar">
                <Copy size={12} />
              </button>
            </div>
            <p className="text-sm text-slate-100 font-medium leading-snug">{headline}</p>
          </div>

          <div className="bg-[#0f172a] border border-[#1e293b] rounded-lg p-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] text-slate-400 font-medium">Descrição + Hashtags</span>
              <button onClick={() => copy(desc)} className="text-slate-400 hover:text-white" title="Copiar">
                <Copy size={12} />
              </button>
            </div>
            <p className="text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">{desc}</p>
          </div>

          <button onClick={() => { setHeadline(""); setDesc(""); }} className="text-[10px] text-slate-500 hover:text-slate-300">Regenerar</button>
        </>
      )}
    </div>
  );
}
