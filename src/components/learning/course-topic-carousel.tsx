import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { isModuleAccessible, sortModules } from "@/lib/curriculum/course-navigation";
import type { ModuleSummary } from "@/lib/curriculum/types";
import { cn } from "@/lib/utils";

type CourseTopicCarouselProps = {
  courseId: string;
  modules: ModuleSummary[];
  activeModuleId: string;
  activeModuleNumber: number;
  activeTitle: string;
  courseTitle: string;
};

type SideTopicProps = {
  href: string | null;
  moduleNumber: number;
  title: string;
  side: "left" | "right";
};

function SideTopic({ href, moduleNumber, title, side }: SideTopicProps) {
  const content = (
    <>
      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-cobalt/70">
        Tema {String(moduleNumber).padStart(2, "0")}
      </p>
      <p className="mt-1 line-clamp-2 text-xs font-medium leading-snug text-ink/80">{title}</p>
    </>
  );

  const className = cn(
    "flex min-h-[4.5rem] min-w-0 flex-1 flex-col justify-center rounded-2xl border border-slate-200/80 bg-white/40 px-3 py-3 text-left shadow-sm backdrop-blur-sm transition-all sm:px-4",
    side === "left" ? "items-start text-left" : "items-end text-right",
    href
      ? "group hover:border-cobalt/30 hover:bg-white/70 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt/40"
      : "pointer-events-none opacity-40",
  );

  if (!href) {
    return (
      <div className={className} aria-hidden>
        {content}
      </div>
    );
  }

  return (
    <Link
      href={href}
      className={className}
      data-testid={`topic-carousel-${side}`}
      aria-label={`Ir al tema ${moduleNumber}: ${title}`}
    >
      <span
        className={cn(
          "mb-1 flex size-7 items-center justify-center rounded-full bg-slate-100/90 text-slate-500 transition-colors group-hover:bg-cobalt-tint group-hover:text-cobalt",
          side === "right" && "self-end",
        )}
        aria-hidden
      >
        {side === "left" ? (
          <ChevronLeftIcon className="size-4" />
        ) : (
          <ChevronRightIcon className="size-4" />
        )}
      </span>
      {content}
    </Link>
  );
}

export function CourseTopicCarousel({
  courseId,
  modules,
  activeModuleId,
  activeModuleNumber,
  activeTitle,
  courseTitle,
}: CourseTopicCarouselProps) {
  const sorted = sortModules(modules);
  const activeIndex = sorted.findIndex((courseModule) => courseModule.id === activeModuleId);

  const prev = activeIndex > 0 ? sorted[activeIndex - 1] : null;
  const next = activeIndex >= 0 && activeIndex < sorted.length - 1 ? sorted[activeIndex + 1] : null;

  const prevHref =
    prev && isModuleAccessible(prev)
      ? `/aprender/curso/${courseId}/tema/${prev.id}`
      : null;
  const nextHref =
    next && isModuleAccessible(next)
      ? `/aprender/curso/${courseId}/tema/${next.id}`
      : null;

  return (
    <section
      className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-b from-cobalt-tint/50 via-paper-raised to-paper-raised px-4 py-6 shadow-sm sm:px-8 sm:py-8"
      data-testid="course-topic-carousel"
      aria-label="Temas del curso"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(47,95,224,0.12),transparent_55%)]"
        aria-hidden
      />

      <p className="relative text-center text-[11px] font-bold uppercase tracking-[0.16em] text-cobalt">
        {courseTitle}
      </p>

      <div className="relative mt-5 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 sm:gap-4">
        <div className="min-w-0 scale-[0.92] opacity-70 blur-[0.4px] sm:scale-[0.88] sm:opacity-60 sm:blur-[0.6px]">
          {prev ? (
            <SideTopic
              href={prevHref}
              moduleNumber={activeIndex}
              title={prev.title}
              side="left"
            />
          ) : (
            <div className="min-h-[4.5rem]" aria-hidden />
          )}
        </div>

        <div className="relative z-10 flex min-w-[8.5rem] flex-col items-center px-2 text-center sm:min-w-[10rem]">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cobalt">Tema</p>
          <p
            className="font-display text-6xl font-semibold tabular-nums leading-none tracking-tight text-ink sm:text-7xl"
            data-testid="topic-carousel-active-number"
          >
            {String(activeModuleNumber).padStart(2, "0")}
          </p>
          <h1 className="mt-3 max-w-[14rem] font-heading text-base font-semibold leading-snug text-ink sm:max-w-[18rem] sm:text-lg">
            {activeTitle}
          </h1>
        </div>

        <div className="min-w-0 scale-[0.92] opacity-70 blur-[0.4px] sm:scale-[0.88] sm:opacity-60 sm:blur-[0.6px]">
          {next ? (
            <SideTopic
              href={nextHref}
              moduleNumber={activeIndex + 2}
              title={next.title}
              side="right"
            />
          ) : (
            <div className="min-h-[4.5rem]" aria-hidden />
          )}
        </div>
      </div>
    </section>
  );
}
