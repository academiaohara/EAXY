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

/** Zona «continuar» (~75 % ancho); el corte diagonal separa la zona «reiniciar». */
const CONTINUE_CLIP =
  "[clip-path:polygon(0_0,74%_0,58%_100%,0_100%)]";
const RESTART_CLIP =
  "[clip-path:polygon(74%_0,100%_0,100%_100%,58%_100%)]";

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

  const continueHoverClass =
    status === "completed"
      ? "hover:bg-white/10 focus-visible:bg-white/10"
      : "hover:bg-cobalt/[0.07] focus-visible:bg-cobalt/[0.07]";
  const restartHoverClass =
    status === "completed"
      ? "hover:bg-white/15 focus-visible:bg-white/15"
      : "hover:bg-slate-900/[0.05] focus-visible:bg-slate-900/[0.05]";

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
            "border-slate-200 bg-white text-slate-300 group-hover:border-cobalt/45 group-hover:text-cobalt/80",
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
                ? "text-slate-500 group-hover:text-slate-600"
                : "text-ink group-hover:text-cobalt",
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
            "relative z-[1] size-5 shrink-0 transition-transform group-hover:translate-x-0.5",
            status === "completed"
              ? "text-white/70 group-hover:text-white"
              : isUpcoming
                ? "text-slate-300"
                : "text-slate-300 group-hover:text-cobalt",
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
          className={cn(cardSurfaceClass, "pointer-events-none hover:shadow-md")}
          data-testid={`lesson-link-${lesson.id}`}
        >
          <div className="pointer-events-none relative flex w-full items-center gap-4 sm:gap-5">
            {body}
          </div>

          <span
            className="pointer-events-none absolute inset-y-3 right-[22%] z-[1] w-px bg-gradient-to-b from-transparent via-slate-300/80 to-transparent sm:inset-y-4"
            style={{ transform: "skewX(-12deg)" }}
            aria-hidden
          />

          <PlayIcon
            className={cn(
              "pointer-events-none absolute right-[26%] top-1/2 z-[1] size-6 -translate-y-1/2 opacity-40 sm:size-7",
              status === "completed" ? "text-white/80" : "text-cobalt/50",
            )}
            aria-hidden
          />
          <RotateCcwIcon
            className={cn(
              "pointer-events-none absolute right-4 top-1/2 z-[1] size-5 -translate-y-1/2 opacity-50 sm:right-5 sm:size-6",
              status === "completed" ? "text-white/70" : "text-slate-400",
            )}
            aria-hidden
          />

          <Link
            href={resolveInteractiveLessonHref(interactiveSlug, "continue")}
            aria-label={`Continuar: ${lesson.title.replace(/^\d+\.\s*/, "")}`}
            className={cn(
              "pointer-events-auto absolute inset-y-0 left-0 z-[2] w-[78%] rounded-l-[1.35rem] transition-colors focus-visible:ring-2 focus-visible:ring-cobalt/40 focus-visible:outline-none",
              CONTINUE_CLIP,
              continueHoverClass,
            )}
            data-testid={`lesson-link-continue-${lesson.id}`}
          />
          <Link
            href={resolveInteractiveLessonHref(interactiveSlug, "restart")}
            aria-label={`Empezar de cero: ${lesson.title.replace(/^\d+\.\s*/, "")}`}
            className={cn(
              "pointer-events-auto absolute inset-y-0 right-0 z-[3] w-[32%] rounded-r-[1.35rem] transition-colors focus-visible:ring-2 focus-visible:ring-cobalt/40 focus-visible:outline-none",
              RESTART_CLIP,
              restartHoverClass,
            )}
            data-testid={`lesson-link-restart-${lesson.id}`}
          />
        </div>
      ) : (
        <Link
          href={resolveLessonHref(lesson.id)}
          data-testid={`lesson-link-${lesson.id}`}
          className={cn(
            cardSurfaceClass,
            "hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-2",
          )}
        >
          {body}
        </Link>
      )}
    </li>
  );
}
