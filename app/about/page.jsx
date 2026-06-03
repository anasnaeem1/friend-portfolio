"use client";

import { useMemo, useState } from "react";

import { textToLines, usePortfolio } from "@/context/PortfolioContext";

const ICON_ACCENTS = "shrink-0 text-scheme-accent";

const reveal = {
  base: "page-reveal-down",
  step1: "page-reveal-down page-delay-1",
  step2: "page-reveal-down page-delay-2",
  step3: "page-reveal-down page-delay-3",
};

const heroHeading =
  "text-[1.875rem] font-bold uppercase leading-tight tracking-tight text-scheme-heading sm:text-4xl md:text-[2.65rem] lg:text-5xl";

const sectionLabel = "text-xs font-semibold uppercase tracking-wider text-scheme-heading/90 md:text-[0.8rem]";

const bulletRow =
  "flex items-start gap-2 sm:gap-2.5 break-inside-avoid text-[0.8rem] leading-snug text-scheme-body sm:text-[0.85rem] md:text-[0.9rem]";

function BulletDot() {
  return (
    <span
      className="mt-[0.35rem] h-1 w-1 shrink-0 rounded-[1px] bg-scheme-accent sm:h-1.5 sm:w-1.5"
      aria-hidden
    />
  );
}

function ContactIcon({ name }) {
  const common = `${ICON_ACCENTS} h-7 w-7 md:h-8 md:w-8`;
  switch (name) {
    case "whatsapp":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.884 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      );
    case "mail":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "behance":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.096 2.392-5.892 5.71-5.892 3.068 0 4.892 2.118 5.072 4.065h-3.155c-.113-.962-.849-2.073-2.031-2.073-1.477 0-2.558 1.222-2.558 3.069 0 1.815 1.012 3.069 2.558 3.069 1.299 0 2.031-.775 2.031-1.984H15.5v-2.5h8.225v1.224c0 2.52-1.675 4.636-4.999 4.636zm-10.224-8.5h-8.5v11h8.5c2.209 0 4-1.791 4-4s-1.791-4-4-4zm-.5 7h-3v-2h3c.551 0 1-.449 1-1s-.449-1-1-1h-3v-2h3.5c1.381 0 2.5 1.119 2.5 2.5s-1.119 2.5-2.5 2.5z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    case "instagram":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      );
    default:
      return <span className={common} aria-hidden />;
  }
}

function AboutMobileTabs({ panel, onPanelChange }) {
  const tabClass =
    "min-h-9 px-2 text-center text-[0.6rem] font-bold uppercase leading-tight tracking-wide transition-colors";

  return (
    <div
      className={`mb-3 grid shrink-0 grid-cols-2 gap-px overflow-hidden rounded-sm border border-scheme-accent/35 bg-scheme-accent/35 p-px md:hidden ${reveal.base}`}
      role="tablist"
      aria-label="About sections"
    >
      <button
        type="button"
        role="tab"
        aria-selected={panel === 0}
        aria-controls="about-skills"
        id="tab-skills"
        onClick={() => onPanelChange(0)}
        className={`${tabClass} ${
          panel === 0 ? "bg-scheme-accent text-scheme-on-accent" : "bg-scheme-canvas text-scheme-body-muted"
        }`}
      >
        Education & skills
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={panel === 1}
        aria-controls="about-contacts"
        id="tab-contacts"
        onClick={() => onPanelChange(1)}
        className={`${tabClass} ${
          panel === 1 ? "bg-scheme-accent text-scheme-on-accent" : "bg-scheme-canvas text-scheme-body-muted"
        }`}
      >
        Contacts
      </button>
    </div>
  );
}

function CatalogList({ lines, twoCol }) {
  return (
    <ul
      className={
        twoCol
          ? "mt-2 grid grid-cols-1 gap-x-10 gap-y-1 sm:grid-cols-2"
          : "mt-2 space-y-1"
      }
    >
      {lines.map((line) => (
        <li key={line} className={bulletRow}>
          <BulletDot />
          <span>{line}</span>
        </li>
      ))}
    </ul>
  );
}

function ContactListItem({ item }) {
  const body = (
    <span className="flex gap-2.5 sm:gap-4">
      <ContactIcon name={item.icon} />
      <span className="flex min-w-0 flex-col pt-0.5">
        <span className="text-[0.6rem] font-semibold uppercase tracking-wider text-scheme-heading/90 sm:text-[0.65rem]">
          {item.label}
        </span>
        <span className="mt-px truncate text-[0.78rem] font-medium text-scheme-body sm:text-[0.85rem] md:text-[0.9rem]">
          {item.value}
        </span>
      </span>
    </span>
  );

  return (
    <li>
      {item.href ? (
        <a
          href={item.href}
          className="block rounded-sm outline-none ring-offset-2 ring-offset-scheme-canvas transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-scheme-accent"
        >
          {body}
        </a>
      ) : (
        body
      )}
    </li>
  );
}

function getAboutContacts(about) {
  if (about.contacts?.length) {
    return about.contacts.map((c) => ({
      id: c.id,
      label: c.label,
      value: c.value,
      href: c.href || null,
      icon: c.icon || "mail",
    }));
  }

  if (!about.contactLabel && !about.contactValue) return [];

  return [
    {
      id: "main",
      label: about.contactLabel,
      value: about.contactValue,
      href: about.contactHref || null,
      icon: "mail",
    },
  ];
}

export default function AboutPage() {
  const [mobilePanel, setMobilePanel] = useState(0);
  const { content, loading } = usePortfolio();
  const about = content.about;

  const educationLines = useMemo(() => textToLines(about.education), [about.education]);
  const skillsLines = useMemo(() => textToLines(about.skills), [about.skills]);
  const contacts = useMemo(() => getAboutContacts(about), [about]);

  if (loading) {
    return (
      <div className="relative flex flex-1 items-center justify-center py-20 text-scheme-body-muted">
        Loading…
      </div>
    );
  }

  return (
    <div className="relative z-10 flex min-h-0 flex-1 flex-col justify-center overflow-y-auto bg-transparent px-4 pb-10 pt-6 text-scheme-body sm:px-5 md:px-8 md:pb-12 md:pt-8">
      <div className="mx-auto w-full max-w-6xl shrink-0">
        <AboutMobileTabs panel={mobilePanel} onPanelChange={setMobilePanel} />

        <div className="grid gap-8 md:grid-cols-2 md:items-start md:gap-12 lg:gap-16">
          <section
            id="about-skills"
            role="tabpanel"
            aria-labelledby="tab-skills"
            className={`flex flex-col ${mobilePanel === 0 ? "max-md:flex" : "max-md:hidden"} md:flex`}
          >
            <h1 className={`${heroHeading} ${reveal.step1}`}>{about.skillsHeading}</h1>

            <div className="mt-3 grid gap-5 md:mt-6">
              <div className={reveal.step2}>
                <h2 className={sectionLabel}>Education</h2>
                <CatalogList lines={educationLines} twoCol={false} />
              </div>

              <div className={reveal.step3}>
                <h2 className={sectionLabel}>Skills</h2>
                <CatalogList lines={skillsLines} twoCol />
              </div>
            </div>
          </section>

          <section
            id="about-contacts"
            role="tabpanel"
            aria-labelledby="tab-contacts"
            className={`flex flex-col ${mobilePanel === 1 ? "max-md:flex" : "max-md:hidden"} md:flex`}
          >
            <h2 className={`${heroHeading} ${reveal.step1}`}>{about.contactsHeading}</h2>
            <ul
              className={`mt-3 space-y-2 sm:space-y-2.5 md:mt-6 md:space-y-3 ${reveal.step2}`}
            >
              {contacts.map((item) => (
                <ContactListItem key={item.id} item={item} />
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
