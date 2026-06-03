"use client";

import CinematicHeroCanvas from "./CinematicHeroCanvas";

export default function CinematicHeroBackdrop() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] isolate min-h-dvh w-full"
      aria-hidden
    >
      <div className="relative h-full min-h-dvh w-full">
        <CinematicHeroCanvas />
        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{ background: "var(--hero-vignette)" }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{ background: "var(--hero-fade-vertical)" }}
          aria-hidden
        />
      </div>
    </div>
  );
}
