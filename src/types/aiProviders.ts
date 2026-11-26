export type AIProvider = "openrouter" | "groq" | "ollama";

export interface AIProviderConfig {
  id: AIProvider;
  name: string;
  baseUrl: string;
  requiresApiKey: boolean;
  freeModelsOnly: boolean;
  apiKeyEnvVar?: string;
  apiKeyLocalStorage?: string;
}

export interface AIModel {
  id: string;
  name: string;
  provider: AIProvider;
  isFree: boolean;
  maxTokens: number;
  contextWindow: number;
  supportsStreaming: boolean;
}

export interface AIProviderState {
  provider: AIProvider;
  isEnabled: boolean;
  apiKey: string;
  models: AIModel[];
  selectedModelId: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface AIExecutionRequest {
  prompt: string;
  systemPrompt?: string;
  maxTokens?: number;
  temperature?: number;
  stream?: boolean;
}

export interface AIExecutionResponse {
  content: string;
  model: string;
  provider: AIProvider;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

export interface AIFallbackConfig {
  providers: AIProvider[];
  maxRetriesPerProvider: number;
  timeoutMs: number;
}

export const AI_PROVIDERS: Record<AIProvider, AIProviderConfig> = {
  openrouter: {
    id: "openrouter",
    name: "OpenRouter",
    baseUrl: "https://openrouter.ai/api/v1",
    requiresApiKey: true,
    freeModelsOnly: false,
    apiKeyLocalStorage: "nexia_openrouter_token_v1",
  },
  groq: {
    id: "groq",
    name: "Groq",
    baseUrl: "https://api.groq.com/openai/v1",
    requiresApiKey: true,
    freeModelsOnly: true,
    apiKeyLocalStorage: "nexia_groq_token_v1",
  },
  ollama: {
    id: "ollama",
    name: "Ollama (Local)",
    baseUrl: "http://localhost:11434/v1",
    requiresApiKey: false,
    freeModelsOnly: true,
  },
};

export const DEFAULT_FALLBACK_CONFIG: AIFallbackConfig = {
  providers: ["openrouter", "groq", "ollama"],
  maxRetriesPerProvider: 1,
  timeoutMs: 30000,
};

// ==========================================
// OMNIROUTE / AI GATEWAY TYPES
// ==========================================
export type GatewayProvider = 'groq' | 'openrouter' | 'ollama';

export interface GatewayModel {
  id: string;
  name: string;
  provider: GatewayProvider;
  isFree: boolean;
  contextLength?: number;
  tokensUsed: number;
  callsCount: number;
  status: 'online' | 'busy' | 'offline';
  description?: string;
  pricingPrompt?: string;
  pricingCompletion?: string;
  sourceConnectionId: string;
  sourceConnectionName: string;
}

export interface GatewayConnection {
  id: string;
  name: string;
  provider: GatewayProvider;
  apiKey: string;
  baseUrl?: string;
  onlyFree: boolean;
  connectedAt: string;
  modelsCount: number;
  models: GatewayModel[];
  isActive: boolean;
}

export type RoutingStrategy = 
  | 'ai_smart'          // A IA do sistema escolhe o melhor modelo para a tarefa
  | 'least_used_tokens'  // Pega os modelos com mais tokens disponíveis / que usou menos
  | 'round_robin'       // Rotativo contínuo: usa um, se acabar/der limite vai para o outro de forma contínua
  | 'random'            // Distribuição aleatória equilibrada
  | 'manual';           // Escolha fixa manual do usuário

export interface GatewayConfig {
  connections: GatewayConnection[];
  activeStrategy: RoutingStrategy;
  selectedModelId?: string;
  autoFallbackOnError: boolean;
  totalTokensProcessed: number;
  totalCallsMade: number;
}

// ==========================================
// API KEY POOL TYPES
// ==========================================
export interface ApiKeyItem {
  id: string;
  name: string;
  key: string;
  provider: 'groq' | 'openrouter';
  isActive: boolean;
  addedAt: string;
  lastUsedAt?: string;
  status?: 'active' | 'rate_limited' | 'invalid' | 'unknown';
  lastLatencyMs?: number;
  lastError?: string;
}

export interface ApiKeysConfig {
  groqApiKey?: string; // backwards compatibility single key
  openRouterApiKey?: string; // backwards compatibility single key
  groqKeyPool: ApiKeyItem[];
  openRouterKeyPool: ApiKeyItem[];
  autoRotateOnRateLimit: boolean;
  prioritizeGroq: boolean;
}
