import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { provider, name, apiKey, baseUrl, onlyFree } = body;

    if (!provider) {
      return NextResponse.json(
        { success: false, error: "Provider is required" },
        { status: 400 }
      );
    }

    let models: any[] = [];

    if (provider === "groq") {
      if (!apiKey) {
        return NextResponse.json(
          { success: false, error: "Groq API key is required" },
          { status: 400 }
        );
      }

      const response = await fetch("https://api.groq.com/openai/v1/models", {
        headers: { Authorization: `Bearer ${apiKey}` },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return NextResponse.json(
          { success: false, error: errorData.error?.message || `Groq API error: ${response.status}` },
          { status: response.status }
        );
      }

      const data = await response.json();
      models = (data.data || [])
        .filter((m: any) => !m.id.includes("whisper") && !m.id.includes("tts"))
        .map((m: any) => ({
          id: m.id,
          name: m.id.replace(/-/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase()),
          provider: "groq",
          isFree: true,
          contextLength: m.context_window || 128000,
          tokensUsed: 0,
          callsCount: 0,
          status: "online",
          description: `Modelo Groq: ${m.id}`,
          pricingPrompt: "Grátis (Cota Groq)",
          pricingCompletion: "Grátis (Cota Groq)",
        }));
    } else if (provider === "openrouter") {
      if (!apiKey) {
        return NextResponse.json(
          { success: false, error: "OpenRouter API key is required" },
          { status: 400 }
        );
      }

      const response = await fetch("https://openrouter.ai/api/v1/models", {
        headers: { Authorization: `Bearer ${apiKey}` },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return NextResponse.json(
          { success: false, error: errorData.error?.message || `OpenRouter API error: ${response.status}` },
          { status: response.status }
        );
      }

      const data = await response.json();
      models = (data.data || [])
        .filter((m: any) => {
          if (onlyFree && !m.id.includes(":free")) return false;
          return true;
        })
        .slice(0, 50)
        .map((m: any) => ({
          id: m.id,
          name: m.name || m.id.replace(/-/g, " "),
          provider: "openrouter",
          isFree: m.id.includes(":free"),
          contextLength: m.context_length || 128000,
          tokensUsed: 0,
          callsCount: 0,
          status: "online",
          description: m.description || `Modelo OpenRouter: ${m.id}`,
          pricingPrompt: m.id.includes(":free") ? "0.00 (100% Grátis)" : "Variável",
          pricingCompletion: m.id.includes(":free") ? "0.00 (100% Grátis)" : "Variável",
        }));
    } else if (provider === "ollama") {
      const ollamaUrl = baseUrl || "http://localhost:11434";
      try {
        const response = await fetch(`${ollamaUrl}/api/tags`, {
          signal: AbortSignal.timeout(5000),
        });

        if (!response.ok) {
          return NextResponse.json(
            { success: false, error: "Ollama not reachable" },
            { status: 502 }
          );
        }

        const data = await response.json();
        models = (data.models || []).map((m: any) => ({
          id: m.name,
          name: m.name,
          provider: "ollama",
          isFree: true,
          contextLength: 128000,
          tokensUsed: 0,
          callsCount: 0,
          status: "online",
          description: `Modelo local Ollama: ${m.name}`,
          pricingPrompt: "Grátis (Local)",
          pricingCompletion: "Grátis (Local)",
        }));
      } catch {
        return NextResponse.json(
          { success: false, error: "Ollama not running on localhost:11434" },
          { status: 502 }
        );
      }
    }

    const freeModels = models.filter((m) => m.isFree).length;

    return NextResponse.json({
      success: true,
      provider,
      count: models.length,
      freeCount: freeModels,
      models,
    });
  } catch (err: any) {
    console.error("Gateway fetch-models error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}