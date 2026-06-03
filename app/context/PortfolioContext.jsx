"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

import { defaultContent } from "@/lib/portfolioContent";

const PortfolioContext = createContext(null);

export function PortfolioProvider({ children }) {
  const [content, setContent] = useState(defaultContent);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    setError(null);
    try {
      const res = await fetch("/api/content");
      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || "Failed to load");
      }
      setContent(data);
    } catch {
      setError("Could not load portfolio content");
      setContent(defaultContent);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <PortfolioContext.Provider
      value={{ content, setContent, loading, error, refresh }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const ctx = useContext(PortfolioContext);
  if (!ctx) {
    throw new Error("usePortfolio must be used within PortfolioProvider");
  }
  return ctx;
}

/** Split newline-separated admin text into list items */
export function textToLines(text) {
  if (!text) return [];
  return text.split("\n").map((s) => s.trim()).filter(Boolean);
}
