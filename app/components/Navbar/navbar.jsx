"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";

import ThemeToggle from "@/components/ThemeToggle";

/** Labels match routes */
const navLinks = [
  {
    id: "intro",
    href: "/",
    lines: ["Personal", "Introduction"],
  },
  { id: "about-me", label: "About Me", href: "/about" },
  {
    id: "experience",
    href: "/work-experience",
    lines: ["Work", "Experience"],
  },
  { id: "Work", label: "Work", href: "/work" },
];

const lineHeightTight =
  "[&_.nav-stack]:leading-[1.1] [&_.nav-stack]:tracking-tight";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const panelId = useId();

  const isActive = (href) =>
    pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const linkClass = (active) =>
    `flex cursor-pointer items-center rounded-none px-4 py-3 text-left text-[0.7rem] font-bold uppercase tracking-wide text-scheme-heading transition-[background-color,color] duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-scheme-accent-2 focus-visible:ring-offset-2 focus-visible:ring-offset-scheme-canvas md:text-center md:px-5 md:py-2 md:text-[0.78rem] ${lineHeightTight} ${
      active
        ? "bg-scheme-accent text-scheme-on-accent md:bg-scheme-accent"
        : "hover:bg-scheme-accent/90 hover:text-scheme-on-accent md:hover:bg-scheme-accent md:hover:text-scheme-on-accent"
    }`;

  return (
    <header className="relative z-[70] shrink-0 border-b border-scheme-accent/12 bg-transparent text-scheme-heading md:border-b-0">
      <nav
        aria-label="Main"
        className="relative z-[70] mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-3.5 md:gap-10 md:px-8 md:py-4"
      >
        {/* Desktop: rule */}
        <div className="hidden min-h-11 min-w-[5rem] w-[30%] max-w-md shrink-0 items-center md:flex md:w-[32%]">
          <span className="block h-px w-full bg-scheme-heading" aria-hidden />
        </div>

        {/* Mobile brand */}
        <Link
          href="/"
          prefetch={false}
          className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-scheme-heading/95 transition-colors hover:text-scheme-heading focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-scheme-accent-2 focus-visible:ring-offset-2 focus-visible:ring-offset-scheme-canvas md:hidden"
          onClick={() => setMenuOpen(false)}
        >
          Umme Habiba
        </Link>

        {/* Desktop links + theme */}
        <div className="hidden min-h-11 flex-1 items-stretch justify-end gap-3 md:flex">
          <ul className="flex flex-wrap items-stretch justify-end gap-x-2 gap-y-1 md:gap-x-4">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.id} className="flex">
                  <Link
                    href={link.href}
                    prefetch={false}
                    aria-current={active ? "page" : undefined}
                    className={linkClass(active)}
                  >
                    {"lines" in link ? (
                      <span className="nav-stack flex flex-col">
                        <span>{link.lines[0]}</span>
                        <span>{link.lines[1]}</span>
                      </span>
                    ) : (
                      link.label
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="flex items-center">
            <ThemeToggle />
          </div>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          {/* Mobile menu control */}
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls={panelId}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((o) => !o)}
            className="relative z-[210] flex h-10 w-10 shrink-0 items-center justify-center rounded-sm text-scheme-heading transition-colors hover:bg-scheme-accent/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-scheme-accent-2 focus-visible:ring-offset-2 focus-visible:ring-offset-scheme-canvas"
          >
          <span className="relative block h-[14px] w-5">
            <span
              className={`absolute left-0 top-0 block h-0.5 w-5 rounded-full bg-current transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                menuOpen ? "top-[6px] rotate-45" : "top-0 rotate-0"
              }`}
              aria-hidden
            />
            <span
              className={`absolute left-0 top-[6px] block h-0.5 w-5 rounded-full bg-current transition-opacity duration-200 ease-out ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
              aria-hidden
            />
            <span
              className={`absolute bottom-0 left-0 block h-0.5 w-5 rounded-full bg-current transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                menuOpen ? "bottom-[6px] -rotate-45" : "bottom-0 rotate-0"
              }`}
              aria-hidden
            />
          </span>
        </button>
        </div>
      </nav>

      {/* Mobile overlay — above layout, main, and grid backdrop */}
      <div
        className={`fixed inset-0 z-[200] md:hidden ${
          menuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!menuOpen}
      >
        <div
          role="presentation"
          className={`absolute inset-0 z-0 cursor-default bg-scheme-canvas/70 backdrop-blur-[2px] transition-opacity duration-300 ease-out motion-reduce:transition-none ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMenuOpen(false)}
        />

        <div
          id={panelId}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className={`absolute left-0 right-0 top-0 z-10 max-h-[min(100dvh,100vh)] overflow-y-auto overscroll-contain border-b border-scheme-accent/35 bg-scheme-canvas/98 pt-[env(safe-area-inset-top)] shadow-[0_12px_40px_rgba(0,0,0,0.45)] transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
            menuOpen
              ? "translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-full opacity-0"
          }`}
        >
          <div className="flex items-center justify-between border-b border-scheme-accent/20 px-5 py-4">
            <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-scheme-heading/90">
              Menu
            </span>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="rounded-sm px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-scheme-body-muted transition-colors hover:text-scheme-heading focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-scheme-accent-2"
            >
              Close
            </button>
          </div>
          <ul className="flex flex-col px-2 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-2">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.id} className="border-b border-scheme-accent/10 last:border-b-0">
                  <Link
                    href={link.href}
                    prefetch={false}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setMenuOpen(false)}
                    className={`${linkClass(active)} w-full border-l-2 border-transparent py-3.5 pl-4 pr-4`}
                  >
                    {"lines" in link ? (
                      <span className="nav-stack flex flex-col">
                        <span>{link.lines[0]}</span>
                        <span>{link.lines[1]}</span>
                      </span>
                    ) : (
                      link.label
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </header>
  );
}
