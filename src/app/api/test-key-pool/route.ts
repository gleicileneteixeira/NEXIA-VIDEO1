import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { provider, keys } = body;

    if (!provider || !Array.isArray(keys) || keys.length === 0) {
      return NextResponse.json(
        { success: false, error: "Provider and keys array are required" },
        { status: 400 }
      );
    }

    const results = await Promise.all(
      keys.map(async (keyItem: { id: string; name: string; key: string }) => {
        const startTime = Date.now();

        try {
          let testUrl = "";
          let headers: Record<string, string> = {};
          let bodyPayload: any = null;

          if (provider === "groq") {
            testUrl = "https://api.groq.com/openai/v1/chat/completions";
            headers = {
              Authorization: `Bearer ${keyItem.key}`,
              "Content-Type": "application/json",
            };
            bodyPayload = {
              model: "llama-3.1-8b-instant",
              messages: [{ role: "user", content: "Hi" }],
              max_tokens: 1,
            };
          } else if (provider === "openrouter") {
            testUrl = "https://openrouter.ai/api/v1/chat/completions";
            headers = {
              Authorization: `Bearer ${keyItem.key}`,
              "Content-Type": "application/json",
            };
            bodyPayload = {
              model: "meta-llama/llama-3.1-8b-instruct:free",
              messages: [{ role: "user", content: "Hi" }],
              max_tokens: 1,
            };
          } else {
            return {
              id: keyItem.id,
              name: keyItem.name,
              status: "invalid" as const,
              error: "Unsupported provider",
              latencyMs: 0,
            };
          }

          const response = await fetch(testUrl, {
            method: "POST",
            headers,
            body: JSON.stringify(bodyPayload),
            signal: AbortSignal.timeout(10000),
          });

          const latencyMs = Date.now() - startTime;

          if (response.status === 429) {
            return {
              id: keyItem.id,
              name: keyItem.name,
              status: "rate_limited" as const,
              error: "Rate limit exceeded",
              latencyMs,
            };
          }

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            return {
              id: keyItem.id,
              name: keyItem.name,
              status: "invalid" as const,
              error: errorData.error?.message || `HTTP ${response.status}`,
              latencyMs,
            };
          }

          return {
            id: keyItem.id,
            name: keyItem.name,
            status: "active" as const,
            latencyMs,
          };
        } catch (err: any) {
          const latencyMs = Date.now() - startTime;
          return {
            id: keyItem.id,
            name: keyItem.name,
            status: "invalid" as const,
            error: err.message || "Connection failed",
            latencyMs,
          };
        }
      })
    );

    return NextResponse.json({
      success: true,
      results,
    });
  } catch (err: any) {
    console.error("Test key pool error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}