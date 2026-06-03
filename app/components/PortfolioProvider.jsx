"use client";

import { PortfolioProvider } from "@/context/PortfolioContext";

export default function PortfolioProviderWrapper({ children }) {
  return <PortfolioProvider>{children}</PortfolioProvider>;
}
