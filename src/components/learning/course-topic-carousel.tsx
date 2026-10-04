import Link from "next/link";
import { LayoutListIcon } from "lucide-react";
import { isModuleAccessible, sortModules } from "@/lib/curriculum/course-navigation";
import { courseHref, topicHref } from "@/lib/navigation/learning-trail";
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
  const numberLabel = String(moduleNumber).padStart(2, "0");

  const numberClassName = cn(
    "font-display text-6xl font-extrabold tabular-nums leading-none tracking-tight text-ink transition-[opacity,filter] duration-200 sm:text-7xl",
    href
      ? "opacity-[0.22] blur-[1.5px] group-hover:opacity-100 group-hover:blur-none group-focus-visible:opacity-100 group-focus-visible:blur-none"
      : "pointer-events-none opacity-[0.12] blur-[1.5px]",
  );

  const wrapperClassName = cn(
    "group flex size-[4.75rem] items-center justify-center rounded-2xl border border-slate-200/50 bg-white/30 shadow-sm backdrop-blur-sm transition-[border-color,background-color,box-shadow] sm:size-[5.5rem]",
    href
      ? "hover:border-cobalt/25 hover:bg-white/70 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt/40"
      : "pointer-events-none border-transparent bg-transparent shadow-none",
  );

  if (!href) {
    return (
      <div className={wrapperClassName} aria-hidden>
        <span className={numberClassName}>{numberLabel}</span>
      </div>
    );
  }

  return (
    <Link
      href={href}
      className={wrapperClassName}
      data-testid={`topic-carousel-${side}`}
      aria-label={`Ir al tema ${moduleNumber}: ${title}`}
    >
      <span className={numberClassName} data-testid={`topic-carousel-${side}-number`}>
        {numberLabel}
      </span>
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
      ? topicHref(courseId, prev.id)
      : null;
  const nextHref =
    next && isModuleAccessible(next)
      ? topicHref(courseId, next.id)
      : null;

  return (
    <section
      className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-b from-cobalt-tint/70 via-paper-raised to-paper-raised px-4 py-6 shadow-sm sm:px-8 sm:py-8"
      data-testid="course-topic-carousel"
      aria-label="Temas del curso"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(47,95,224,0.12),transparent_55%)]"
        aria-hidden
      />

      <div className="relative flex justify-center">
        <Link
          href={courseHref(courseId)}
          className="inline-flex items-center gap-1.5 rounded-full bg-paper-raised/80 px-3 py-1 text-xs font-semibold text-cobalt ring-1 ring-cobalt/15 transition-colors hover:bg-cobalt hover:text-white"
          data-testid="topic-carousel-course-link"
        >
          <LayoutListIcon className="size-3.5" aria-hidden />
          {courseTitle} · Ver temario
        </Link>
      </div>

      <div className="relative mt-5 grid min-h-[4.5rem] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 sm:gap-6">
        <div className="flex justify-center">
          {prev ? (
            <SideTopic
              href={prevHref}
              moduleNumber={activeModuleNumber - 1}
              title={prev.title}
              side="left"
            />
          ) : (
            <div className="size-[4.75rem] shrink-0 sm:size-[5.5rem]" aria-hidden />
          )}
        </div>

        <div className="relative z-10 flex min-w-0 flex-col items-center px-1 text-center sm:px-2">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cobalt">
            Tema {activeModuleNumber} de {sorted.length}
          </p>
          <p
            className="font-display text-6xl font-extrabold tabular-nums leading-none tracking-tight text-ink sm:text-7xl"
            data-testid="topic-carousel-active-number"
          >
            {String(activeModuleNumber).padStart(2, "0")}
          </p>
          <h1 className="mt-3 max-w-[14rem] font-heading text-base font-semibold leading-snug text-ink sm:max-w-[18rem] sm:text-lg">
            {activeTitle}
          </h1>
        </div>

        <div className="flex justify-center">
          {next ? (
            <SideTopic
              href={nextHref}
              moduleNumber={activeModuleNumber + 1}
              title={next.title}
              side="right"
            />
          ) : (
            <div className="size-[4.75rem] shrink-0 sm:size-[5.5rem]" aria-hidden />
          )}
        </div>
      </div>
    </section>
  );
}
