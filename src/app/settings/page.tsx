"use client";

import { useState, useEffect } from "react";
import { ApiSettings } from "@/components/ApiSettings";
import { ApiKeysConfig } from "@/types/aiProviders";

const STORAGE_KEY = "nexia_api_keys_config";

const DEFAULT_API_KEYS: ApiKeysConfig = {
  groqApiKey: "",
  openRouterApiKey: "",
  groqKeyPool: [],
  openRouterKeyPool: [],
  autoRotateOnRateLimit: true,
  prioritizeGroq: true,
};

export default function SettingsPage() {
  const [apiKeys, setApiKeys] = useState<ApiKeysConfig>(DEFAULT_API_KEYS);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === "object") {
          setApiKeys({
            ...DEFAULT_API_KEYS,
            ...parsed,
          });
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const handleSaveApiKeys = (keys: ApiKeysConfig) => {
    setApiKeys(keys);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(keys));
    } catch {
      // ignore
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a12]">
      <ApiSettings
        apiKeys={apiKeys}
        onSaveApiKeys={handleSaveApiKeys}
      />
    </div>
  );
}