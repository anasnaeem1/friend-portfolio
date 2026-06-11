"use client";

import { useMemo, useState } from "react";

import { usePortfolio } from "@/context/PortfolioContext";

const PAGE_SIZE = 3;

const reveal = {
  step1: "page-reveal-down page-delay-1",
  step2: "page-reveal-down page-delay-2",
  step3: "page-reveal-down page-delay-3",
  step4: "page-reveal-down page-delay-4",
};

const heroHeading =
  "text-[1.5rem] font-bold uppercase leading-tight tracking-tight text-scheme-heading sm:text-3xl md:text-[2.35rem]";

const pagerBtn =
  "rounded-sm border border-scheme-accent/50 px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-wide text-scheme-body transition-colors hover:bg-scheme-accent/25 disabled:pointer-events-none disabled:opacity-35";

function getExperienceEntries(workExperience) {
  if (!workExperience) return [];

  if (workExperience.entries?.length) {
    return workExperience.entries.map((entry) => ({
      id: entry.id,
      period: entry.period,
      headline: Array.isArray(entry.headline) ? entry.headline : [entry.headline],
      descriptionLead: entry.descriptionLead || "",
      descriptionRest: entry.descriptionRest || entry.description || "",
    }));
  }

  return [
    {
      id: "main",
      period: workExperience.period || "",
      headline: [workExperience.role || ""],
      descriptionLead: "",
      descriptionRest: workExperience.description || "",
    },
  ];
}

function ExperiencePageHeader({ heading }) {
  return (
    <header className={`mb-6 w-full text-center md:mb-8 ${reveal.step1}`}>
      <h1 className={heroHeading}>{heading}</h1>
      <div className="mt-3 flex justify-center" aria-hidden>
        <span className="-skew-x-[5deg] h-2.5 w-[min(88%,18rem)] bg-scheme-accent opacity-95 sm:h-3" />
      </div>
    </header>
  );
}

function TimelineEntry({ period, headline, descriptionLead, descriptionRest, last }) {
  const lines = Array.isArray(headline) ? headline : [headline];

  return (
    <li className="relative pb-7 pl-[1.875rem] sm:pb-8 sm:pl-[2.25rem] md:pb-9 md:pl-[2.65rem]">
      {!last && (
        <span
          className="absolute bottom-1 left-[0.4375rem] top-5 w-px bg-scheme-accent/90 sm:left-[0.5rem] sm:top-6 md:left-[0.6rem]"
          aria-hidden
        />
      )}
      <span
        className="absolute left-0 top-[0.25rem] z-[1] h-3.5 w-3.5 rounded-full border-2 border-scheme-canvas bg-scheme-accent shadow-[0_0_0_1px_rgba(110,19,42,0.35)] ring-2 ring-scheme-accent/25 sm:h-4 sm:w-4"
        aria-hidden
      />

      <p className="text-[0.9rem] font-bold text-scheme-heading md:text-[0.95rem]">{period}</p>

      <div className="mt-0.5 space-y-0.5 text-[0.75rem] leading-snug text-scheme-body-muted sm:text-[0.8rem] md:text-[0.85rem] md:leading-[1.4]">
        {lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>

      <p className="mt-2 max-w-xl text-[0.75rem] leading-relaxed text-scheme-body/95 sm:text-[0.8rem] md:mt-2.5 md:text-[0.85rem]">
        {descriptionLead ? (
          <>
            <span className="font-semibold text-scheme-accent">{descriptionLead}</span>{" "}
            {descriptionRest}
          </>
        ) : (
          descriptionRest
        )}
      </p>
    </li>
  );
}

function ExperiencePager({ page, pageCount, onPageChange }) {
  return (
    <nav
      className={`mt-6 flex w-full max-w-md flex-col items-center gap-4 sm:mt-8 ${reveal.step3}`}
      aria-label="Experience pages"
    >
      <div className="flex items-center gap-3">
        <button
          type="button"
          disabled={page <= 0}
          onClick={() => onPageChange((p) => Math.max(0, p - 1))}
          className={pagerBtn}
        >
          Previous
        </button>
        <span className="min-w-[5.5rem] text-center text-[0.7rem] tabular-nums text-scheme-body-muted">
          {page + 1} / {pageCount}
        </span>
        <button
          type="button"
          disabled={page >= pageCount - 1}
          onClick={() => onPageChange((p) => Math.min(pageCount - 1, p + 1))}
          className={pagerBtn}
        >
          Next
        </button>
      </div>
    </nav>
  );
}

function ExperiencePageFooter({ showPager }) {
  return (
    <div
      className={`mt-6 flex w-full max-w-md items-center justify-center gap-4 sm:mt-8 ${showPager ? reveal.step4 : reveal.step3}`}
    >
      <div className="h-px w-full max-w-[14rem] bg-scheme-heading/85 sm:max-w-xs" />
    </div>
  );
}

export default function WorkExperiencePage() {
  const { content, loading } = usePortfolio();
  const workExperience = content?.workExperience;

  const allEntries = useMemo(
    () => getExperienceEntries(workExperience),
    [workExperience]
  );

  const total = allEntries.length;
  const showPager = total > PAGE_SIZE;
  const pageCount = showPager ? Math.ceil(total / PAGE_SIZE) : 1;
  const [page, setPage] = useState(0);

  const pageEntries = useMemo(() => {
    if (!showPager) return allEntries;
    const start = page * PAGE_SIZE;
    return allEntries.slice(start, start + PAGE_SIZE);
  }, [page, allEntries, showPager]);

  if (loading) {
    return (
      <div className="relative flex flex-1 items-center justify-center py-20 text-scheme-body-muted">
        Loading…
      </div>
    );
  }

  return (
    <div className="relative flex h-full max-h-[calc(100svh-5.5rem)] min-h-0 w-full flex-1 flex-col items-center justify-center bg-transparent px-4 text-scheme-body md:max-h-[calc(100svh-5.75rem)]">
      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center justify-center">
        <ExperiencePageHeader heading={workExperience.heading} />

        <ol
          className={`relative mx-auto w-full max-w-xl list-none pl-2 text-left sm:pl-4 md:max-w-2xl ${reveal.step2}`}
          role="list"
        >
          {pageEntries.map((entry, i, arr) => (
            <TimelineEntry key={entry.id} {...entry} last={i === arr.length - 1} />
          ))}
        </ol>

        {showPager ? (
          <ExperiencePager page={page} pageCount={pageCount} onPageChange={setPage} />
        ) : null}

        <ExperiencePageFooter showPager={showPager} />
      </div>
    </div>
  );
}
