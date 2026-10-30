"use client";

import Link from "next/link";
import { useMemo } from "react";
import { ArrowRightIcon, BookOpenIcon, DumbbellIcon } from "lucide-react";
import { getCourseProgress } from "@/lib/curriculum/course-progress";
import type { BlockSummary } from "@/lib/curriculum/blocks";
import { applyLocalProgressToModules } from "@/lib/local-progress/storage";
import { useLocalProgress } from "@/lib/local-progress/use-local-progress";
import { blockHref, courseRangeLabel } from "@/lib/navigation/learning-trail";
import { SUBJECT_THEME, type SubjectKey } from "@/lib/navigation/subjects";
import { cn } from "@/lib/utils";

type BlockCatalogViewProps = {
  subject: SubjectKey;
  blocks: BlockSummary[];
  /** Si false, no mezcla progreso del navegador (usuario con sesión). */
  mergeLocalProgress?: boolean;
};

function BlockCard({
  summary,
  subject,
  mergeLocalProgress,
}: {
  summary: BlockSummary;
  subject: SubjectKey;
  mergeLocalProgress: boolean;
}) {
  const theme = SUBJECT_THEME[subject];
  const localStore = useLocalProgress();
  const modules = useMemo(
    () =>
      mergeLocalProgress
        ? applyLocalProgressToModules(summary.modules, localStore)
        : summary.modules,
    [mergeLocalProgress, localStore, summary.modules],
  );
  const { totalLessons, completedLessons, percent } =
    getCourseProgress(modules);
  const { block } = summary;

  return (
    <Link
      href={blockHref(subject, block.slug)}
      data-testid={`block-link-${block.slug}`}
      className={cn(
        "group flex h-full flex-col gap-4 rounded-2xl border border-border bg-paper-raised p-5 shadow-xs outline-none transition-all hover:-translate-y-0.5 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-cobalt/40",
        theme.hoverBorder,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className={cn(
            "rounded-full px-3 py-1.5 text-xs font-bold tabular-nums",
            theme.badge,
          )}
        >
          {courseRangeLabel(summary.courses.map((course) => course.title))}
        </span>
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-paper text-slate-400 transition-colors group-hover:bg-cobalt group-hover:text-white">
          <ArrowRightIcon className="size-4" aria-hidden />
        </span>
      </div>

      <div className="space-y-1">
        <h3 className="font-display text-xl font-bold leading-tight text-ink group-hover:text-cobalt">
          {block.title}
        </h3>
        <p className="text-sm leading-relaxed text-ink-muted">
          {block.description}
        </p>
      </div>

      <div className="mt-auto space-y-2">
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-medium text-ink-muted">
          <span className="inline-flex items-center gap-1.5">
            <BookOpenIcon className="size-3.5" aria-hidden />
            {completedLessons}/{totalLessons}{" "}
            {totalLessons === 1 ? "lección" : "lecciones"}
          </span>
          {summary.topicExerciseCount > 0 ? (
            <span className="inline-flex items-center gap-1.5">
              <DumbbellIcon className="size-3.5" aria-hidden />
              {summary.topicExerciseCount}{" "}
              {summary.topicExerciseCount === 1 ? "ejercicio" : "ejercicios"}
            </span>
          ) : null}
        </div>
        <div
          className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100"
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Progreso en ${block.title}`}
        >
          <div
            className="h-full rounded-full bg-emerald-500 transition-all duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </Link>
  );
}

export function BlockCatalogView({
  subject,
  blocks,
  mergeLocalProgress = true,
}: BlockCatalogViewProps) {
  if (blocks.length === 0) {
    return (
      <p
        className="rounded-2xl border border-dashed border-border p-6 text-center text-sm text-ink-muted"
        data-testid="block-catalog-empty"
      >
        Los contenidos de esta asignatura estarán disponibles cuando haya
        lecciones publicadas.
      </p>
    );
  }

  return (
    <section data-testid="block-catalog" className="space-y-3">
      <p className="max-w-2xl text-sm text-ink-muted">
        Elige un contenido y recórrelo a lo largo de los cursos, de menor a
        mayor nivel.
      </p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {blocks.map((summary) => (
          <BlockCard
            key={summary.block.slug}
            summary={summary}
            subject={subject}
            mergeLocalProgress={mergeLocalProgress}
          />
        ))}
      </div>
    </section>
  );
}
