"use client";
import { useEffect, useState } from "react";

import { usePortfolio } from "@/context/PortfolioContext";
import { PAGES } from "@/lib/portfolioContent";

const input =
  "w-full rounded-sm border border-scheme-accent/35 bg-scheme-canvas/80 px-3 py-2.5 text-[0.85rem] text-scheme-body focus:border-scheme-accent/70 focus:outline-none focus:ring-2 focus:ring-scheme-accent/25";

const label =
  "mb-1 block text-[0.65rem] font-semibold uppercase tracking-wider text-scheme-heading/85";

const box = "space-y-4 rounded-sm border border-scheme-accent/25 bg-scheme-canvas/40 p-4 sm:p-6";

export default function AdminPage() {
  const { content, setContent, loading, error: loadError } = usePortfolio();
  const [page, setPage] = useState("home");
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(null);
  const [defaultProjects, setDefaultProjects] = useState(null);
  const home = content.home;
  const work = content.work;
  const about = content.about;
  const experience = content.Experience;

  useEffect(() => {
    setDefaultProjects(content);
  }, [0]);

  function setHome(field, value) {
    setContent((c) => ({ ...c, home: { ...c.home, [field]: value } }));
    setSaved(false);
  }

  function setWork(field, value) {
    setContent((c) => ({ ...c, work: { ...c.work, [field]: value } }));
    setSaved(false);
  }

  function setProject(index, field, value) {
    setContent((c) => ({
      ...c,
      work: {
        ...c.work,
        projects: c.work.projects.map((p, i) =>
          i === index ? { ...p, [field]: value } : p
        ),
      },
    }));
    setSaved(false);
  }

  function setAbout(field, value) {
    setContent((c) => ({ ...c, about: { ...c.about, [field]: value } }));
    setSaved(false);
  }

  function setExperience(index, field, value) {
    setContent((c) => {
      const updated = [...(c.Experience.workExperience || [])];
  
      updated[index] = {
        ...updated[index],
        [field]: value,
      };
  
      return {
        ...c,
        Experience: {
          ...c.Experience,
          workExperience: updated,
        },
      };
    });
  }
  async function handleSave(e) {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setContent(data);
      setSaved(true);
    } catch {
      setError("Could not save to database");
      setSaved(false);
    }
  }

  function handleReset(defaultProjects) {
    setContent(defaultProjects);
    setSaved(false);
    setError(null);
  }

  const pageLabel = PAGES.find((p) => p.id === page)?.label ?? "Home";

  return (
    <div className="relative z-10 flex flex-1 flex-col overflow-y-auto px-4 pb-12 pt-6 text-scheme-body md:px-8 md:pt-8">
      <div className="mx-auto w-full max-w-2xl">
        <h1 className="text-2xl font-bold uppercase tracking-tight text-scheme-heading sm:text-3xl">
          Admin
        </h1>

        <label htmlFor="page-select" className={`${label} mt-6`}>
          Page
        </label>
        <select
          id="page-select"
          value={page}
          onChange={(e) => setPage(e.target.value)}
          className={input}
        >
          {PAGES.map((p) => (
            <option key={p.id} value={p.id}>
              {p.label}
            </option>
          ))}
        </select>

        {loading ? (
          <p className="mt-6 text-[0.85rem] text-scheme-body-muted">Loading…</p>
        ) : null}
        {loadError || error ? (
          <p className="mt-4 text-[0.85rem] text-scheme-accent-2">{error || loadError}</p>
        ) : null}

        <form onSubmit={handleSave} className="mt-6">
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-scheme-heading/90">
            {pageLabel}
          </h2>

          {page === "home" && (
            <div className={box}>
              <div>
                <label className={label} htmlFor="greeting">Greeting</label>
                <input id="greeting" className={input} value={home.greeting} onChange={(e) => setHome("greeting", e.target.value)} />
              </div>
              <div>
                <label className={label} htmlFor="name">Name</label>
                <input id="name" className={input} value={home.name} onChange={(e) => setHome("name", e.target.value)} />
              </div>
              <div>
                <label className={label} htmlFor="intro">Intro</label>
                <textarea id="intro" rows={3} className={input} value={home.intro} onChange={(e) => setHome("intro", e.target.value)} />
              </div>
              <div>
                <label className={label} htmlFor="bio">Bio</label>
                <textarea id="bio" rows={4} className={input} value={home.bio} onChange={(e) => setHome("bio", e.target.value)} />
              </div>
              <div>
                <label className={label} htmlFor="primaryCta">Primary button</label>
                <input id="primaryCta" className={input} value={home.primaryCta} onChange={(e) => setHome("primaryCta", e.target.value)} />
              </div>
              <div>
                <label className={label} htmlFor="primaryHref">Primary link</label>
                <input id="primaryHref" className={input} value={home.primaryHref} onChange={(e) => setHome("primaryHref", e.target.value)} />
              </div>
              <div>
                <label className={label} htmlFor="secondaryCta">Secondary button</label>
                <input id="secondaryCta" className={input} value={home.secondaryCta} onChange={(e) => setHome("secondaryCta", e.target.value)} />
              </div>
              <div>
                <label className={label} htmlFor="secondaryHref">Secondary link</label>
                <input id="secondaryHref" className={input} value={home.secondaryHref} onChange={(e) => setHome("secondaryHref", e.target.value)} />
              </div>
            </div>
          )}

          {page === "work" && (
            <div className={box}>
              <div>
                <label className={label} htmlFor="categoryLabel">Category label</label>
                <input id="categoryLabel" className={input} value={work.categoryLabel} onChange={(e) => setWork("categoryLabel", e.target.value)} />
              </div>
              <div>
                <label className={label} htmlFor="heading">Heading</label>
                <input id="heading" className={input} value={work.heading} onChange={(e) => setWork("heading", e.target.value)} />
              </div>
              <button
                type="button"
                className="cursor-pointer text-[0.65rem] font-semibold uppercase tracking-wider text-scheme-heading/80"
                onClick={() =>
                  setContent((c) => ({
                    ...c,
                    work: {
                      ...c.work,
                      projects: [
                        ...(c.work.projects || []),
                        {
                          id: crypto.randomUUID(),
                          title: "",
                          description: "",
                          href: "#",
                          imageUrl: "",
                        },
                      ],
                    },
                  }))
                }
              >
                Add project
              </button>
              {work.projects.map((project, index) => (
                <div key={project.id} className="space-y-4 border-t border-scheme-accent/20 pt-4">
                  <div className="flex items-center justify-between">
                    <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-scheme-heading/80">
                      Project {index + 1}
                    </p>
                    <button
                      type="button"
                      className="cursor-pointer text-[0.65rem] font-semibold uppercase tracking-wider text-scheme-heading/80"
                      onClick={() =>
                        setWork("projects", work.projects.filter((_, i) => i !== index))
                      }
                    >
                      Delete project
                    </button>
                  </div>

                  <div>
                    <label className={label} htmlFor={`p${index}-title`}>Title</label>
                    <input
                      id={`p${index}-title`}
                      className={input}
                      value={project.title}
                      onChange={(e) => setProject(index, "title", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className={label} htmlFor={`p${index}-desc`}>Description</label>
                    <textarea
                      id={`p${index}-desc`}
                      rows={3}
                      className={input}
                      value={project.description}
                      onChange={(e) => setProject(index, "description", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className={label} htmlFor={`p${index}-pdf`}>Link</label>
                    <input
                      id={`p${index}-link`}
                      type="url"
                      className={input}
                      value={project.href ?? ""}
                      placeholder="https://..."
                      onChange={(e) => setProject(index, "href", e.target.value)}
                    />a
                  </div>
                  <div>
                    <label className={label} htmlFor={`p${index}-image`}>Image URL</label>
                    <input
                      id={`p${index}-image`}
                      type="url"
                      className={input}
                      value={project.imageUrl ?? ""}
                      placeholder="https://..."
                      onChange={(e) => setProject(index, "imageUrl", e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {page === "about" && (
            <div className={box}>
              <div>
                <label className={label} htmlFor="skillsHeading">Left heading</label>
                <input id="skillsHeading" className={input} value={about.skillsHeading} onChange={(e) => setAbout("skillsHeading", e.target.value)} />
              </div>
              <div>
                <label className={label} htmlFor="contactsHeading">Right heading</label>
                <input id="contactsHeading" className={input} value={about.contactsHeading} onChange={(e) => setAbout("contactsHeading", e.target.value)} />
              </div>
              <div>
                <label className={label} htmlFor="education">Education (one per line)</label>
                <textarea id="education" rows={4} className={input} value={about.education} onChange={(e) => setAbout("education", e.target.value)} />
              </div>
              <div>
                <label className={label} htmlFor="skills">Skills (one per line)</label>
                <textarea id="skills" rows={5} className={input} value={about.skills} onChange={(e) => setAbout("skills", e.target.value)} />
              </div>
              <div>
                <label className={label} htmlFor="contactLabel">Contact label</label>
                <input id="contactLabel" className={input} value={about.contactLabel} onChange={(e) => setAbout("contactLabel", e.target.value)} />
              </div>
              <div>
                <label className={label} htmlFor="contactValue">Contact value</label>
                <input id="contactValue" className={input} value={about.contactValue} onChange={(e) => setAbout("contactValue", e.target.value)} />
              </div>
              <div>
                <label className={label} htmlFor="contactHref">Contact link</label>
                <input id="contactHref" className={input} value={about.contactHref} onChange={(e) => setAbout("contactHref", e.target.value)} />
              </div>
            </div>
          )}

          {page === "Experience" && (
            <div className={box}>
              <div>
                <label className={label} htmlFor="expHeading">Page heading</label>
                <input id="expHeading" className={input} value={experience.heading} onChange={(e) => setExperience("heading", e.target.value)} />
              </div>
              <button
                type="button"
                className="cursor-pointer text-[0.65rem] font-semibold uppercase tracking-wider text-scheme-heading/80"
                onClick={() =>
                  setContent((c) => ({
                    ...c,
                    Experience: {
                      ...c.Experience,
                      workExperience: [
                        ...(c.Experience.workExperience || []),
                        {
                          period: "",
                          role: "",
                          description: "",
                        },
                      ],
                    },
                  }))
                }
              >
                Add Experience
              </button>

              {experience.workExperience.map((item, index) => (
                <div key={index} className={box}>

                  <div className="flex items-center justify-between">
                    <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-scheme-heading/80">
                      Experience {index + 1}
                    </p>

                    <button
                      type="button"
                      className="cursor-pointer text-[0.65rem] font-semibold uppercase tracking-wider text-scheme-heading/80 hover:text-red-500 transition-colors"
                      onClick={() =>
                        setContent((c) => ({
                          ...c,
                          Experience: {
                            ...c.Experience,
                            workExperience: (c.Experience.workExperience || []).filter(
                              (_, i) => i !== index
                            ),
                          },
                        }))
                      }
                    >
                      Delete experience
                    </button>
                  </div>

                  <div>
                    <label className={label}>Period</label>
                    <input
                      className={input}
                      value={item.period}
                      onChange={(e) =>
                        setExperience(index, "period", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <label className={label}>Role / company</label>
                    <input
                      className={input}
                      value={item.role}
                      onChange={(e) =>
                        setExperience(index, "role", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <label className={label}>Description</label>
                    <textarea
                      rows={4}
                      className={input}
                      value={item.description}
                      onChange={(e) =>
                        setExperience(index, "description", e.target.value)
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-6 flex items-center gap-2">
            <button
              type="submit"
              disabled={loading}
              className="mt-6 rounded-sm border border-scheme-accent/50 bg-scheme-accent/90 px-5 py-2.5 text-[0.65rem] font-bold uppercase tracking-wide text-scheme-on-accent hover:bg-scheme-accent disabled:opacity-40"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => handleReset(defaultProjects)}
              disabled={loading}
              className="mt-6 rounded-sm border border-scheme-accent/50 bg-scheme-accent/90 px-5 py-2.5 text-[0.65rem] font-bold uppercase tracking-wide text-scheme-on-accent hover:bg-scheme-accent disabled:opacity-40"
            >
              Reset
            </button>
          </div>
          {saved ? (
            <p className="mt-3 text-[0.75rem] text-scheme-accent">Saved to database</p>
          ) : null}
        </form>
      </div>
    </div>
  );
}
