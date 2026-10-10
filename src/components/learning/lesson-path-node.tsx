"use client";

import Link from "next/link";
import { useMemo } from "react";
import {
  CheckIcon,
  ChevronRightIcon,
  DumbbellIcon,
  PlayIcon,
  RotateCcwIcon,
  SparklesIcon,
} from "lucide-react";
import {
  getLessonProgressStatus,
  type LessonProgressStatus,
} from "@/lib/curriculum/course-progress";
import { resolveInteractiveLessonHref, resolveLessonHref } from "@/lib/curriculum/lesson-meta";
import {
  readPersistedInteractiveLesson,
  shouldOfferInteractiveLessonResume,
} from "@/lib/local-progress/interactive-lesson-state";
import { useLocalProgress } from "@/lib/local-progress/use-local-progress";
import { cn } from "@/lib/utils";
import type { LessonSummary } from "@/lib/curriculum/types";

const STATUS_LABELS: Record<LessonProgressStatus, string> = {
  completed: "Completada",
  incomplete: "Incompleta",
  started: "En curso",
  available: "Disponible",
};

const STATUS_CHIP_STYLES: Record<LessonProgressStatus, string> = {
  completed: "bg-white/20 text-white",
  incomplete: "bg-cobalt-tint text-cobalt",
  started: "bg-cobalt-tint text-cobalt",
  available: "bg-slate-100 text-slate-500",
};

/** Corte diagonal en el borde interior de cada mitad (~75 % / ~25 % con hueco). */
const CONTINUE_PIECE_CLIP =
  "[clip-path:polygon(0_0,100%_0,calc(100%-0.7rem)_100%,0_100%)]";
const RESTART_PIECE_CLIP = "[clip-path:polygon(0.7rem_0,100%_0,100%_100%,0_100%)]";

function lessonMetaLabel(lesson: LessonSummary): string {
  if (lesson.kind === "interactive") {
    return lesson.stepCount ? `${lesson.stepCount} pasos guiados` : "Lección guiada";
  }
  return `${lesson.exerciseCount} ${lesson.exerciseCount === 1 ? "ejercicio" : "ejercicios"}`;
}

type LessonPathNodeProps = {
  lesson: LessonSummary;
  position: number;
  isLast: boolean;
  isNextTarget: boolean;
};

export function LessonPathNode({ lesson, position, isLast, isNextTarget }: LessonPathNodeProps) {
  const localStore = useLocalProgress();

  const status = getLessonProgressStatus(lesson);
  const isInteractive = lesson.kind === "interactive";
  const isInProgress = status === "started" || status === "incomplete";
  const isCurrent = isInProgress || (isNextTarget && status !== "completed");
  const isUpcoming = status === "available" && !isCurrent;
  const connectorBrand = status === "completed";

  const stepCount = lesson.stepCount ?? 0;
  const interactiveSlug = lesson.interactiveSlug;
  const offersResume = useMemo(() => {
    if (!isInteractive || !interactiveSlug || stepCount <= 0) {
      return false;
    }
    return shouldOfferInteractiveLessonResume(
      readPersistedInteractiveLesson(interactiveSlug, stepCount),
      stepCount,
    );
  }, [interactiveSlug, isInteractive, localStore, stepCount]);

  const cardSurfaceClass = cn(
    "group relative flex items-center gap-4 overflow-hidden rounded-[1.35rem] border bg-paper-raised p-3.5 shadow-sm outline-none transition-all sm:gap-5 sm:p-4",
    status === "completed" &&
      "border-cobalt bg-cobalt hover:border-cobalt/90 hover:bg-cobalt/95 focus-visible:ring-cobalt/50",
    status !== "completed" &&
      isCurrent &&
      "border-slate-200 hover:border-cobalt/45 focus-visible:ring-cobalt/40",
    status !== "completed" &&
      !isCurrent &&
      "border-slate-200/90 hover:border-cobalt/35 focus-visible:ring-cobalt/40",
  );

  const splitSurfaceClass = cn(
    "border bg-paper-raised shadow-sm outline-none transition-all focus-visible:ring-2",
    status === "completed" &&
      "border-cobalt bg-cobalt hover:border-cobalt/90 focus-visible:ring-cobalt/50",
    status !== "completed" &&
      isCurrent &&
      "border-slate-200 hover:border-cobalt/45 focus-visible:ring-cobalt/40",
    status !== "completed" &&
      !isCurrent &&
      "border-slate-200/90 hover:border-cobalt/35 focus-visible:ring-cobalt/40",
  );

  const continueHoverClass =
    status === "completed"
      ? "hover:-translate-y-0.5 hover:bg-cobalt/95 hover:shadow-md"
      : "hover:-translate-y-0.5 hover:border-cobalt/45 hover:bg-cobalt/[0.04] hover:shadow-md";
  const restartHoverClass =
    status === "completed"
      ? "hover:-translate-y-0.5 hover:bg-cobalt/95 hover:shadow-md"
      : "hover:-translate-y-0.5 hover:border-cobalt/40 hover:bg-slate-900/[0.04] hover:shadow-md";

  const body = (
    <>
      <span
        className={cn(
          "relative z-[1] flex size-11 shrink-0 items-center justify-center rounded-full border-[3px] transition-colors sm:size-12",
          status === "completed" && "border-white bg-white/10 text-white",
          status !== "completed" &&
            isCurrent &&
            "border-cobalt bg-white text-cobalt shadow-[0_0_0_4px_rgba(67,83,255,0.1)]",
          status !== "completed" &&
            !isCurrent &&
            "border-slate-200 bg-white text-slate-300 group-hover/card:border-cobalt/45 group-hover/card:text-cobalt/80",
        )}
        aria-hidden
      >
        {status === "completed" ? (
          <CheckIcon className="size-5" strokeWidth={3} />
        ) : isInteractive ? (
          <SparklesIcon className="size-5" />
        ) : (
          <DumbbellIcon className="size-5" />
        )}
      </span>

      <span className="relative z-[1] min-w-0 flex-1 pr-2">
        <span className="flex flex-wrap items-center gap-2">
          <span
            className={cn(
              "text-[11px] font-semibold tabular-nums tracking-wide",
              status === "completed" ? "text-white/75" : isUpcoming ? "text-slate-400" : "text-slate-400",
            )}
          >
            {String(position).padStart(2, "0")}
          </span>
          {status !== "available" ? (
            <span
              className={cn(
                "inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em]",
                STATUS_CHIP_STYLES[status],
              )}
            >
              {STATUS_LABELS[status]}
            </span>
          ) : null}
        </span>
        <span
          className={cn(
            "mt-1 block font-heading text-base font-semibold leading-snug sm:text-[1.05rem]",
            status === "completed"
              ? "text-white"
              : isUpcoming
                  ? "text-slate-500 group-hover/card:text-slate-600"
                  : "text-ink group-hover/card:text-cobalt",
          )}
        >
          {lesson.title.replace(/^\d+\.\s*/, "")}
        </span>
        <span
          className={cn(
            "mt-0.5 block text-xs",
            status === "completed"
              ? "text-white/75"
              : isUpcoming
                ? "text-slate-400"
                : "text-muted-foreground",
          )}
        >
          {lessonMetaLabel(lesson)}
        </span>
      </span>

      {!offersResume ? (
        <ChevronRightIcon
          className={cn(
            "relative z-[1] size-5 shrink-0 transition-transform group-hover/card:translate-x-0.5",
            status === "completed"
              ? "text-white/70 group-hover/card:text-white"
              : isUpcoming
                ? "text-slate-300"
                : "text-slate-300 group-hover/card:text-cobalt",
          )}
          aria-hidden
        />
      ) : null}
    </>
  );

  return (
    <li className="relative">
      {!isLast ? (
        <span
          className={cn(
            "pointer-events-none absolute left-[2.125rem] top-[calc(100%-0.25rem)] z-0 h-[calc(0.75rem+2px)] w-0.5 -translate-x-1/2 sm:left-[2.5rem]",
            connectorBrand ? "bg-cobalt" : "bg-slate-300",
          )}
          aria-hidden
        />
      ) : null}

      {offersResume && interactiveSlug ? (
        <div
          className="flex min-w-0 items-stretch gap-2"
          data-testid={`lesson-link-${lesson.id}`}
        >
          <Link
            href={resolveInteractiveLessonHref(interactiveSlug, "continue")}
            aria-label={`Continuar: ${lesson.title.replace(/^\d+\.\s*/, "")}`}
            className={cn(
              "group/card group/continue flex min-w-0 flex-[3] items-center gap-4 rounded-l-[1.35rem] p-3.5 sm:gap-5 sm:p-4",
              splitSurfaceClass,
              CONTINUE_PIECE_CLIP,
              continueHoverClass,
            )}
            data-testid={`lesson-link-continue-${lesson.id}`}
          >
            {body}
            <PlayIcon
              className={cn(
                "size-6 shrink-0 opacity-45 transition-opacity group-hover/continue:opacity-80 sm:size-7",
                status === "completed" ? "text-white/85" : "text-cobalt/55",
              )}
              aria-hidden
            />
          </Link>
          <Link
            href={resolveInteractiveLessonHref(interactiveSlug, "restart")}
            aria-label={`Empezar de cero: ${lesson.title.replace(/^\d+\.\s*/, "")}`}
            className={cn(
              "group/restart flex w-[min(26%,6.75rem)] shrink-0 items-center justify-center rounded-r-[1.35rem] p-3 sm:p-4",
              splitSurfaceClass,
              RESTART_PIECE_CLIP,
              restartHoverClass,
            )}
            data-testid={`lesson-link-restart-${lesson.id}`}
          >
            <RotateCcwIcon
              className={cn(
                "size-6 opacity-55 transition-opacity group-hover/restart:opacity-90 sm:size-7",
                status === "completed" ? "text-white/80" : "text-slate-500",
              )}
              aria-hidden
            />
          </Link>
        </div>
      ) : (
        <Link
          href={resolveLessonHref(lesson.id)}
          data-testid={`lesson-link-${lesson.id}`}
          className={cn(
            cardSurfaceClass,
            "group/card hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-2",
          )}
        >
          {body}
        </Link>
      )}
    </li>
  );
}
