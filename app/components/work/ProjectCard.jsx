import Link from "next/link";
import Image from "next/image";

export default function ProjectCard({ title, description, href, imageSrc }) {
  const safeHref = href && href !== "" ? href : "#";

  return (
    <article className="group flex max-w-[320px] flex-col overflow-hidden rounded-xl border border-scheme-accent/15 bg-scheme-surface/60 transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-scheme-accent/35 hover:shadow-[0_28px_56px_-20px_color-mix(in_srgb,var(--scheme-accent)_45%,transparent),0_0_0_1px_color-mix(in_srgb,var(--scheme-heading)_6%,transparent)_inset]">
      <Link
        href={safeHref}
        className="flex h-full min-h-0 flex-col outline-none ring-offset-2 ring-offset-scheme-canvas focus-visible:ring-2 focus-visible:ring-scheme-accent"
      >
        <div className="relative aspect-[5/5.5] w-full shrink-0 overflow-hidden bg-scheme-canvas">
          <Image
            src={imageSrc}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition duration-500 ease-out group-hover:scale-[1.04]"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-scheme-canvas/80 via-transparent to-transparent opacity-90"
            aria-hidden
          />
        </div>
        <div className="flex min-h-0 flex-1 flex-col gap-2 p-3.5 md:p-4">
          <h3 className="text-[0.95rem] font-bold uppercase leading-snug tracking-tight text-scheme-heading md:text-base">
            {title}
          </h3>
          <p className="line-clamp-2 flex-1 text-[0.72rem] leading-relaxed text-scheme-body-muted md:text-[0.76rem]">
            {description}
          </p>
          <div className="mt-auto border-t border-scheme-accent/15 pt-3 md:pt-3.5">
            <span className="inline-flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-scheme-accent transition-colors group-hover:text-scheme-heading">
              View project
              <span
                aria-hidden
                className="translate-x-0 transition-transform group-hover:translate-x-0.5"
              >
                →
              </span>
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
