"use client";

import { useMemo, useState } from "react";

import PortfolioPagination from "@/components/work/PortfolioPagination";
import ProjectCard from "@/components/work/ProjectCard";
import { usePortfolio } from "@/context/PortfolioContext";

import { dummyImage } from "./constants";

const PROJECTS_PER_PAGE = 3;

const reveal = {
  step1: "page-reveal-down page-delay-1",
  step2: "page-reveal-down page-delay-2",
};

const heroHeading =
  "text-[clamp(2rem,6vw,1.25rem)] font-bold uppercase leading-[0.95] tracking-tight text-scheme-heading";

function WorkPageIntro({ categoryLabel, heading }) {
  return (
    <div className={`flex flex-col items-start ${reveal.step1}`}>
      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-scheme-subheading">
        {categoryLabel}
      </p>
      <h1 className={`${heroHeading} mt-2`}>{heading}</h1>
      <div className="mt-2" aria-hidden>
        <span className="-skew-x-[6deg] block h-1.5 w-1 bg-scheme-accent/95 sm:h-2 sm:w-52" />
      </div>
    </div>
  );
}

function WorkProjectGrid({ items }) {
  return (
    <ul
      className={`grid w-full list-none grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 md:grid-cols-3 md:grid-rows-1 md:items-stretch md:gap-8 lg:gap-10 ${reveal.step2}`}
      aria-label="Project grid"
    >
      {items.map((project) => (
        <li key={project.id} className="flex h-full min-h-0 min-w-0">
          <ProjectCard
            title={project.title}
            description={project.description}
            href={project.href}
            imageSrc={project.imageUrl || dummyImage}
          />
        </li>
      ))}
    </ul>
  );
}

export default function WorkPage() {
  const { content, loading } = usePortfolio();
  const work = content.work;
  const projects = work.projects ?? [];

  const pageCount = Math.max(1, Math.ceil(projects.length / PROJECTS_PER_PAGE));
  const [page, setPage] = useState(0);

  const slice = useMemo(() => {
    const start = page * PROJECTS_PER_PAGE;
    return projects.slice(start, start + PROJECTS_PER_PAGE);
  }, [page, projects]);

  const clampPage = (next) => Math.max(0, Math.min(pageCount - 1, next));

  if (loading) {
    return (
      <div className="relative flex min-h-[calc(100svh-5.25rem)] flex-1 items-center justify-center text-scheme-body-muted">
        Loading…
      </div>
    );
  }

  return (
    <div className="relative flex min-h-[calc(100svh-5.25rem)] w-full flex-1 flex-col items-center justify-center overflow-hidden bg-transparent px-4 py-8 text-scheme-body md:min-h-[calc(100svh-5.75rem)] md:py-6">
      <div className="relative z-10 w-full max-w-6xl">
        <div className="mb-8 flex w-full flex-col gap-6 md:mb-10 md:flex-row md:items-end md:justify-between">
          <WorkPageIntro categoryLabel={work.categoryLabel} heading={work.heading} />
          {pageCount > 1 ? (
            <div className={`w-full md:w-auto md:shrink-0 ${reveal.step1}`}>
              <PortfolioPagination
                page={page}
                pageCount={pageCount}
                onPageChange={(p) => setPage(clampPage(p))}
              />
            </div>
          ) : null}
        </div>
        <WorkProjectGrid items={slice} />
      </div>
    </div>
  );
}
