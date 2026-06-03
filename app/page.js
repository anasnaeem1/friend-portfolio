"use client";

import Link from "next/link";

import { usePortfolio } from "@/context/PortfolioContext";

const btnBase =
  "inline-flex min-h-11 items-center justify-center rounded-md px-6 text-[0.7rem] font-bold uppercase tracking-[0.16em] transition-[transform,box-shadow,background-color,color,border-color] duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-scheme-accent focus-visible:ring-offset-2 focus-visible:ring-offset-scheme-canvas";

const primaryCtaShadow =
  "shadow-[0_12px_40px_-12px_color-mix(in_srgb,var(--scheme-accent)_65%,transparent)] hover:shadow-[0_18px_44px_-10px_color-mix(in_srgb,var(--scheme-accent)_55%,transparent)]";

export default function Home() {
  const { content, loading } = usePortfolio();
  const home = content.home;

  if (loading) {
    return (
      <div className="relative flex min-h-[calc(100svh-5.25rem)] flex-1 items-center justify-center text-scheme-body-muted">
        Loading…
      </div>
    );
  }

  return (
    <div className="relative flex min-h-[calc(100svh-5.25rem)] w-full flex-1 flex-col overflow-hidden bg-transparent text-scheme-body md:min-h-[calc(100svh-5.5rem)]">
      <div className="relative z-10 mx-auto flex min-h-0 w-full max-w-5xl flex-1 flex-col justify-center px-5 py-10 md:px-10 md:py-14">
        <section className="w-full space-y-5 md:space-y-6">
          <div className="home-reveal-up inline-block rounded-sm border border-scheme-accent/35 bg-scheme-canvas/35 px-4 py-3 md:px-5 md:py-3.5">
            <h1 className="text-5xl font-bold leading-[0.92] tracking-tight text-scheme-heading md:text-6xl lg:text-7xl">
              {home.greeting}
            </h1>
          </div>

          <h2 className="home-reveal-up home-delay-1 text-2xl font-light tracking-tight text-scheme-heading md:text-3xl lg:text-4xl">
            I&apos;m {home.name}
          </h2>

          <p className="home-reveal-up home-delay-2 max-w-xl text-pretty text-[0.98rem] font-normal leading-relaxed text-scheme-body/95 md:text-lg md:leading-relaxed">
            <span className="block">{home.intro}</span>
          </p>

          <p className="home-reveal-up home-delay-3 max-w-xl text-sm leading-relaxed text-scheme-body-muted/95 md:text-[0.98rem] md:leading-[1.75]">
            {home.bio}
          </p>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:gap-4 sm:pt-3">
            <Link
              href={home.primaryHref}
              className={`home-reveal-up home-delay-4 ${btnBase} border border-scheme-accent/50 bg-scheme-accent/90 text-scheme-on-accent ${primaryCtaShadow} hover:-translate-y-0.5 hover:bg-scheme-accent`}
            >
              {home.primaryCta}
            </Link>
            <Link
              href={home.secondaryHref}
              className={`home-reveal-up home-delay-6 ${btnBase} border border-scheme-heading/25 bg-scheme-canvas/50 text-scheme-body/95 backdrop-blur-sm hover:-translate-y-0.5 hover:border-scheme-heading/45 hover:bg-scheme-canvas/70`}
            >
              {home.secondaryCta}
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
