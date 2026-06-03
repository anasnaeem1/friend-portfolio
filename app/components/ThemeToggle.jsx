"use client";

import { useCallback, useEffect, useState } from "react";

import { CLASS_DARK, CLASS_LIGHT, toggleThemeClass } from "@/lib/theme";

export default function ThemeToggle() {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    setIsLight(document.documentElement.classList.contains(CLASS_LIGHT));
  }, []);

  const onToggle = useCallback(() => {
    toggleThemeClass();
    setIsLight(document.documentElement.classList.contains(CLASS_LIGHT));
  }, []);

  return (
    <button
      type="button"
      onClick={onToggle}
      className="rounded-sm border border-scheme-accent/35 px-2.5 py-1.5 text-[0.6rem] font-bold uppercase tracking-wide text-scheme-heading transition-colors hover:border-scheme-accent/55 hover:bg-scheme-accent/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-scheme-accent-2 focus-visible:ring-offset-2 focus-visible:ring-offset-scheme-canvas md:px-3 md:py-2 md:text-[0.65rem]"
      aria-label={isLight ? "Switch to dark theme" : "Switch to light theme"}
    >
      {isLight ? "Dark" : "Light"}
    </button>
  );
}
