export type ProviderKey = "llama" | "openrouter" | "groq" | "mistral";

export interface AgentConfig {
  provider: ProviderKey;
  apiKeyName: string; // nome personalizado da chave ex: "Llama Pro"
  freeOnly: boolean;
  strategy: "credit" | "auto" | "manual" | "least-cost" | "fallback";
}

export interface ModelEntry {
  id: string;
  provider: ProviderKey;
  free: boolean;
  name: string;
}

const CATALOG: ModelEntry[] = [
  { id: "llama-3.1-70b", provider: "llama", free: false, name: "Llama 3.1 70B" },
  { id: "llama-3.1-8b", provider: "llama", free: true, name: "Llama 3.1 8B" },
  { id: "groq-llama3-8b", provider: "groq", free: true, name: "Groq Llama 3 8B" },
  { id: "openrouter-claude-3.5", provider: "openrouter", free: false, name: "Claude 3.5 via OpenRouter" },
];

export async function runAgentEngine(
  prompt: string,
  config: AgentConfig
): Promise<{ model: string; response: string }> {
  let pool = CATALOG.filter((m) => m.provider === config.provider);
  if (config.freeOnly) pool = pool.filter((m) => m.free);

  if (pool.length === 0) throw new Error("Nenhum modelo disponível para esta configuração.");

  let chosen: ModelEntry;
  switch (config.strategy) {
    case "credit":
      chosen = pool.sort((a, b) => (a.free ? -1 : 1))[0];
      break;
    case "auto":
    case "least-cost":
      chosen = pool.filter((m) => m.free)[0] || pool[0];
      break;
    case "manual":
    default:
      chosen = pool[0];
      break;
  }

  // Em produção real: chamar API do provedor com a chave configurada
  return {
    model: chosen.name,
    response: `Resposta gerada por ${chosen.name} (${config.strategy}) para: ${prompt.slice(0, 60)}...`,
  };
}
