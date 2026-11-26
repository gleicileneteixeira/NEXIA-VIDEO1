import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { provider, modelId, apiKey, baseUrl } = body;

    if (!provider || !modelId) {
      return NextResponse.json(
        { success: false, error: "Provider and modelId are required" },
        { status: 400 }
      );
    }

    const startTime = Date.now();

    try {
      let testUrl = "";
      let headers: Record<string, string> = {};
      let bodyPayload: any = null;

      if (provider === "groq") {
        testUrl = "https://api.groq.com/openai/v1/chat/completions";
        headers = {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        };
        bodyPayload = {
          model: modelId,
          messages: [{ role: "user", content: "Hi" }],
          max_tokens: 1,
        };
      } else if (provider === "openrouter") {
        testUrl = "https://openrouter.ai/api/v1/chat/completions";
        headers = {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        };
        bodyPayload = {
          model: modelId,
          messages: [{ role: "user", content: "Hi" }],
          max_tokens: 1,
        };
      } else if (provider === "ollama") {
        const ollamaUrl = baseUrl || "http://localhost:11434";
        testUrl = `${ollamaUrl}/api/generate`;
        headers = { "Content-Type": "application/json" };
        bodyPayload = {
          model: modelId,
          prompt: "Hi",
          stream: false,
          options: { num_predict: 1 },
        };
      } else {
        return NextResponse.json(
          { success: false, error: "Unsupported provider" },
          { status: 400 }
        );
      }

      const response = await fetch(testUrl, {
        method: "POST",
        headers,
        body: JSON.stringify(bodyPayload),
        signal: AbortSignal.timeout(10000),
      });

      const latencyMs = Date.now() - startTime;

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return NextResponse.json({
          success: false,
          latencyMs,
          error: errorData.error?.message || `HTTP ${response.status}`,
        });
      }

      return NextResponse.json({
        success: true,
        latencyMs,
      });
    } catch (err: any) {
      const latencyMs = Date.now() - startTime;
      return NextResponse.json({
        success: false,
        latencyMs,
        error: err.message || "Connection failed",
      });
    }
  } catch (err: any) {
    console.error("Gateway test-model error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}