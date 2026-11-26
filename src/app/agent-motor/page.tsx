"use client";

import { useState } from "react";
import { Zap, CheckCircle, AlertCircle, Sparkles } from "lucide-react";
import { runAgentEngine, type AgentConfig } from "@/lib/agentEngine";

export default function AgentMotorPage() {
  const [provider, setProvider] = useState("llama");
  const [keyName, setKeyName] = useState("Llama Pro");
  const [freeOnly, setFreeOnly] = useState(false);
  const [strategy, setStrategy] = useState<AgentConfig["strategy"]>("auto");
  const [result, setResult] = useState<{ model: string; response: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRun = async () => {
    setLoading(true);
    const cfg: AgentConfig = { provider: provider as any, apiKeyName: keyName, freeOnly, strategy };
    const res = await runAgentEngine("Teste de roteamento do motor de agentes.", cfg);
    setResult(res);
    setLoading(false);
  };

  const freeCount = 2; // catalog has 2 free entries for demo

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/20">
          <Zap className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">Motor de Agentes</h1>
          <p className="text-xs text-slate-400">Roteador central — OmniRoute-inspired</p>
        </div>
      </div>

      <div className="bg-[#13131f] border border-[#1e293b] rounded-2xl p-6 space-y-5">
        <h2 className="text-sm font-semibold text-white flex items-center gap-2"><Sparkles size={16} /> Configuração</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Provedor</label>
            <select value={provider} onChange={e => setProvider(e.target.value)} className="w-full mt-1 bg-[#0f172a] border border-[#1e293b] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500">
              <option value="llama">Llama</option>
              <option value="openrouter">OpenRouter</option>
              <option value="groq">Groq</option>
            </select>
          </div>
          <div>
            <label className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Nome da Chave</label>
            <input value={keyName} onChange={e => setKeyName(e.target.value)} className="w-full mt-1 bg-[#0f172a] border border-[#1e293b] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500" placeholder="Ex: Llama Pro" />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => setFreeOnly(!freeOnly)} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium border transition-colors ${freeOnly ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-300" : "bg-[#0f172a] border-[#1e293b] text-slate-300 hover:text-white"}`}>
            <CheckCircle size={14} /> Somente Modelos Grátis
          </button>
          {freeOnly && <span className="text-xs text-emerald-400">{freeCount} gratuitos encontrados</span>}
        </div>

        <div>
          <label className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Estratégia de Uso</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {[
              { id: "credit", label: "Mais crédito" },
              { id: "auto", label: "Auto / Melhor modelo" },
              { id: "least-cost", label: "Menor custo" },
              { id: "fallback", label: "Fallback automático" },
              { id: "manual", label: "Manual" },
            ].map((s) => (
              <button key={s.id} onClick={() => setStrategy(s.id as any)} className={`px-3 py-1.5 rounded-lg text-xs border transition-colors ${strategy === s.id ? "bg-violet-500/20 border-violet-500/50 text-violet-200" : "bg-[#0f172a] border-[#1e293b] text-slate-400 hover:text-white"}`}>{s.label}</button>
            ))}
          </div>
        </div>

        <button onClick={handleRun} disabled={loading} className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white text-sm font-medium rounded-xl px-6 py-3 shadow-lg shadow-violet-500/20 transition-all disabled:opacity-60">{loading ? "Roteando..." : "Executar Motor de Agentes"}</button>
      </div>

      {result && (
        <div className="bg-emerald-900/20 border border-emerald-500/30 rounded-2xl p-5 space-y-2">
          <h3 className="text-sm font-bold text-emerald-300 flex items-center gap-2"><CheckCircle size={16} /> Modelo Escolhido</h3>
          <p className="text-white font-medium">{result.model}</p>
          <p className="text-xs text-slate-300">{result.response}</p>
        </div>
      )}
    </div>
  );
}
