"use client";

import Link from "next/link";
import { useMemo } from "react";
import { CheckIcon, RotateCcwIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getLessonProgressStatus,
  type LessonProgressStatus,
} from "@/lib/curriculum/course-progress";
import { resolveInteractiveLessonHref, resolveLessonHref } from "@/lib/curriculum/lesson-meta";
import {
  readPersistedInteractiveLesson,
  shouldOfferInteractiveLessonResume,
  summarizeInteractiveLessonProgress,
} from "@/lib/local-progress/interactive-lesson-state";
import { useLocalProgress } from "@/lib/local-progress/use-local-progress";
import { cn } from "@/lib/utils";
import type { LessonSummary } from "@/lib/curriculum/types";

const STATUS_TAG_LABELS: Record<LessonProgressStatus, string> = {
  completed: "Completada",
  incomplete: "Incompleta",
  started: "En curso",
  available: "Sin empezar",
};

type LessonPathNodeProps = {
  lesson: LessonSummary;
  position: number;
  isLast: boolean;
  isNextTarget: boolean;
};

function lessonStepsMeta(lesson: LessonSummary): string {
  if (lesson.kind === "interactive") {
    return lesson.stepCount ? `${lesson.stepCount} pasos guiados` : "Lección guiada";
  }
  return `${lesson.exerciseCount} ${lesson.exerciseCount === 1 ? "ejercicio" : "ejercicios"}`;
}

export function LessonPathNode({ lesson, position, isLast, isNextTarget }: LessonPathNodeProps) {
  const localStore = useLocalProgress();

  const status = getLessonProgressStatus(lesson);
  const isInteractive = lesson.kind === "interactive";
  const interactiveSlug = lesson.interactiveSlug;
  const stepCount = lesson.stepCount ?? 0;
  const isInProgress = status === "started" || status === "incomplete";
  const isCurrent = isInProgress || (isNextTarget && status !== "completed");
  const isCompleted = status === "completed";
  const connectorBrand = isCompleted;

  const interactiveProgress = useMemo(() => {
    if (!isInteractive || !interactiveSlug || stepCount <= 0) {
      return null;
    }
    const saved = readPersistedInteractiveLesson(interactiveSlug, stepCount);
    return {
      saved,
      summary: summarizeInteractiveLessonProgress(saved, stepCount),
      offersResume: shouldOfferInteractiveLessonResume(saved, stepCount),
    };
  }, [interactiveSlug, isInteractive, localStore, stepCount]);

  const continueHref =
    isInteractive && interactiveSlug
      ? resolveInteractiveLessonHref(interactiveSlug, "continue")
      : resolveLessonHref(lesson.id);

  const restartHref =
    isInteractive && interactiveSlug
      ? resolveInteractiveLessonHref(interactiveSlug, "restart")
      : null;

  const showStepTrack =
    isInteractive &&
    stepCount > 0 &&
    interactiveProgress &&
    (isInProgress || interactiveProgress.offersResume);

  const primaryLabel = (() => {
    if (isInteractive && interactiveProgress?.offersResume) {
      return isCompleted || interactiveProgress.summary.finished ? "Ver la lección" : "Continuar";
    }
    if (isCompleted) {
      return "Repasar";
    }
    return "Empezar";
  })();

  const metaDetail = (() => {
    if (showStepTrack && interactiveProgress) {
      const { summary } = interactiveProgress;
      const currentStep = Math.min(summary.furthestStepIndex + 1, summary.stepCount);
      return `Paso ${currentStep} de ${summary.stepCount}`;
    }
    return lessonStepsMeta(lesson);
  })();

  const title = lesson.title.replace(/^\d+\.\s*/, "");

  return (
    <li
      className={cn(
        "relative grid grid-cols-[2.75rem_minmax(0,1fr)] items-start gap-4 pb-3.5 sm:grid-cols-[3rem_minmax(0,1fr)]",
        isCurrent && !isCompleted && "z-[1]",
      )}
    >
      {!isLast ? (
        <span
          className={cn(
            "pointer-events-none absolute left-[1.375rem] top-11 z-0 w-0.5 -translate-x-1/2 sm:left-6 sm:top-12",
            connectorBrand ? "bottom-0 bg-cobalt" : "h-[calc(100%-0.5rem)] bg-slate-300",
          )}
          aria-hidden
        />
      ) : null}

      <div
        className={cn(
          "relative z-[1] flex size-11 items-center justify-center rounded-full border-2 text-[15px] font-bold tabular-nums sm:size-12",
          isCompleted && "border-cobalt bg-cobalt text-white",
          !isCompleted &&
            isCurrent &&
            "border-cobalt bg-cobalt text-white shadow-[0_0_0_6px_rgba(67,83,255,0.12)]",
          !isCompleted &&
            !isCurrent &&
            "border-slate-200 bg-paper-raised text-muted-foreground",
        )}
        aria-hidden
      >
        {isCompleted ? <CheckIcon className="size-5" strokeWidth={3} /> : position}
      </div>

      <div
        className={cn(
          "relative z-[1] flex min-w-0 items-center gap-3 rounded-2xl border bg-paper-raised p-4 shadow-sm",
          isCompleted && "border-cobalt bg-cobalt text-white shadow-md",
          !isCompleted &&
            isCurrent &&
            "border-cobalt shadow-[0_8px_24px_-12px_rgba(67,83,255,0.45)]",
          !isCompleted && !isCurrent && "border-slate-200/90",
        )}
        data-testid={`lesson-link-${lesson.id}`}
      >
        <div className="min-w-0 flex-1">
          <p
            className={cn(
              "font-heading text-base font-semibold leading-snug",
              isCompleted ? "text-white" : "text-ink",
            )}
          >
            {title}
          </p>
          <div
            className={cn(
              "mt-1 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[13px]",
              isCompleted ? "text-white/80" : "text-muted-foreground",
            )}
          >
            <span
              className={cn(
                "inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold",
                isCompleted && "bg-white/20 text-white",
                !isCompleted &&
                  isCurrent &&
                  "bg-cobalt-tint text-cobalt",
                !isCompleted &&
                  !isCurrent &&
                  "bg-slate-100 text-slate-500",
              )}
            >
              {STATUS_TAG_LABELS[status]}
            </span>
            <span>{metaDetail}</span>
          </div>

          {showStepTrack ? (
            <div
              className="mt-2.5 flex max-w-[16.25rem] gap-0.5"
              aria-hidden
              data-testid={`lesson-step-track-${lesson.id}`}
            >
              {Array.from({ length: stepCount }, (_, index) => {
                const { completedStepCount, furthestStepIndex } = interactiveProgress!.summary;
                const filled =
                  index < completedStepCount ||
                  (completedStepCount === 0 && index <= furthestStepIndex) ||
                  (index === completedStepCount && index <= furthestStepIndex);
                return (
                  <span
                    key={index}
                    className={cn(
                      "h-1 flex-1 rounded-full",
                      filled
                        ? isCompleted
                          ? "bg-white/90"
                          : "bg-cobalt"
                        : isCompleted
                          ? "bg-white/25"
                          : "bg-slate-200",
                    )}
                  />
                );
              })}
            </div>
          ) : null}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <Button
            nativeButton={false}
            variant={isCurrent && !isCompleted ? "default" : "outline"}
            size="sm"
            className={cn(
              "rounded-[10px] px-4 font-semibold",
              isCompleted &&
                "border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white",
            )}
            render={<Link href={continueHref} data-testid={`lesson-link-continue-${lesson.id}`} />}
          >
            {primaryLabel}
          </Button>

          {restartHref ? (
            <Button
              nativeButton={false}
              variant="ghost"
              size="icon-sm"
              className={cn(
                "size-9 rounded-[10px] text-muted-foreground hover:bg-slate-100 hover:text-ink",
                isCompleted && "text-white/75 hover:bg-white/15 hover:text-white",
              )}
              render={
                <Link
                  href={restartHref}
                  aria-label={`Reiniciar: ${title}`}
                  title="Reiniciar"
                  data-testid={`lesson-link-restart-${lesson.id}`}
                />
              }
            >
              <RotateCcwIcon className="size-5" aria-hidden />
            </Button>
          ) : null}
        </div>
      </div>
    </li>
  );
}
