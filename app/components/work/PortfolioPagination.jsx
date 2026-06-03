export default function PortfolioPagination({ page, pageCount, onPageChange }) {
  if (pageCount <= 1) return null;

  return (
    <nav
      className="mt-8 flex w-full max-w-xl flex-col items-center gap-5 sm:mt-10 md:flex-row md:justify-center md:gap-8"
      aria-label="Project pages"
    >
      <div className="flex items-center gap-3">
        <button
          type="button"
          disabled={page <= 0}
          onClick={() => onPageChange(page - 1)}
          className="rounded-md border border-scheme-accent/45 px-3.5 py-2 text-[0.65rem] font-bold uppercase tracking-wide text-scheme-body transition-colors hover:bg-scheme-accent/20 disabled:pointer-events-none disabled:opacity-30"
        >
          Previous
        </button>
        <span className="min-w-[6rem] text-center text-[0.72rem] tabular-nums text-scheme-body-muted">
          Page {page + 1} of {pageCount}
        </span>
        <button
          type="button"
          disabled={page >= pageCount - 1}
          onClick={() => onPageChange(page + 1)}
          className="rounded-md border border-scheme-accent/45 px-3.5 py-2 text-[0.65rem] font-bold uppercase tracking-wide text-scheme-body transition-colors hover:bg-scheme-accent/20 disabled:pointer-events-none disabled:opacity-30"
        >
          Next
        </button>
      </div>
      <div className="flex items-center gap-2" role="group" aria-label="Jump to page">
        {Array.from({ length: pageCount }, (_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to page ${i + 1}`}
            aria-current={i === page ? "page" : undefined}
            onClick={() => onPageChange(i)}
            className={`h-2 w-2 rounded-full transition-colors sm:h-2.5 sm:w-2.5 ${
              i === page ? "bg-scheme-accent" : "bg-scheme-accent/30 hover:bg-scheme-accent/55"
            }`}
          />
        ))}
      </div>
    </nav>
  );
}
