import CinematicHeroCanvas from "@/components/home/CinematicHeroCanvas";

export default function CinematicPageShell({ children, innerClassName = "" }) {
  return (
    <div className="relative flex min-h-[calc(100svh-5.25rem)] w-full flex-1 flex-col overflow-hidden bg-scheme-canvas text-scheme-body md:min-h-[calc(100svh-5.5rem)]">
      <CinematicHeroCanvas />

      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_85%_70%_at_50%_38%,transparent_0%,rgba(17,17,17,0.35)_55%,rgba(17,17,17,0.88)_100%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-scheme-canvas/50 via-transparent to-scheme-canvas/90"
        aria-hidden
      />

      <div
        className={`relative z-10 mx-auto flex min-h-0 w-full flex-1 flex-col ${innerClassName}`.trim()}
      >
        {children}
      </div>
    </div>
  );
}
