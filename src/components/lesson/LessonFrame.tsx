"use client";

import Link from "next/link";
import { StarIcon, XIcon } from "lucide-react";
import { LessonProgressHeader } from "@/components/lesson/LessonProgressHeader";
import { Button } from "@/components/ui/button";
import { lessonStageSurfaceClassName } from "@/lib/lesson/stage-surface";
import { cn } from "@/lib/utils";
import type { FeedbackStatus } from "@/lib/lesson/types";

type LessonFrameProps = {
  closeHref: string;
  lessonTitle: string;
  currentStep: number;
  totalSteps: number;
  /** Índice actual 0-based para la barra navegable. */
  currentStepIndex?: number;
  completedSteps?: boolean[];
  visitedSteps?: boolean[];
  onGoToStep?: (index: number) => void;
  stars?: number;
  totalStars?: number;
  feedback?: FeedbackStatus | null;
  children: React.ReactNode;
  /** Pie flotante con las acciones del paso. */
  footer?: React.ReactNode;
  /** Capa flotante sobre el contenido (el tutor), fuera del flujo del paso. */
  overlay?: React.ReactNode;
  /** Con el panel izquierdo abierto, la bola se mueve a la derecha para no taparse. */
  tutorPanelOpen?: boolean;
  className?: string;
};

export function LessonStarCounter({ stars, totalStars }: { stars: number; totalStars?: number }) {
  return (
    <div
      className="flex shrink-0 items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-amber-600 shadow-sm ring-1 ring-slate-200/60"
      data-testid="lesson-stars"
      aria-label={
        totalStars ? `${stars} de ${totalStars} estrellas` : `${stars} estrellas conseguidas`
      }
    >
      <StarIcon className="size-3.5 fill-amber-400 text-amber-400" aria-hidden />
      <span className="tabular-nums">
        {stars}
        {totalStars ? <span className="text-amber-600/60">/{totalStars}</span> : null}
      </span>
    </div>
  );
}

export function LessonFrame({
  closeHref,
  lessonTitle,
  currentStep,
  totalSteps,
  currentStepIndex,
  completedSteps,
  visitedSteps,
  onGoToStep,
  feedback = null,
  children,
  footer,
  overlay,
  tutorPanelOpen = false,
  className,
}: LessonFrameProps) {
  const isCorrect = feedback === "correct";
  const isIncorrect = feedback === "incorrect";

  return (
    <div
      className={cn("relative isolate flex h-full min-h-0 w-full flex-col overflow-hidden", className)}
      data-testid="lesson-frame"
      data-feedback={feedback ?? "none"}
    >
      <div
        className={cn("lesson-feedback-backdrop lesson-feedback-backdrop-correct", isCorrect && "is-visible")}
        aria-hidden
      />
      <div
        className={cn(
          "lesson-feedback-backdrop lesson-feedback-backdrop-incorrect",
          isIncorrect && "is-visible",
        )}
        aria-hidden
      />

      <header className="flex shrink-0 items-center gap-3 px-4 py-3 sm:gap-4 sm:px-6">
        <Button
          variant="ghost"
          size="icon-lg"
          nativeButton={false}
          className="shrink-0 rounded-full text-ink-muted hover:bg-cobalt-tint hover:text-cobalt active:bg-[color-mix(in_srgb,var(--cobalt-tint),var(--cobalt)_18%)] active:text-cobalt"
          aria-label="Cerrar lección"
          render={<Link href={closeHref} data-testid="lesson-close" />}
        >
          <XIcon className="size-5" />
        </Button>

        <LessonProgressHeader
          currentIndex={currentStepIndex ?? currentStep - 1}
          total={totalSteps}
          completed={completedSteps ?? []}
          visited={visitedSteps ?? []}
          onGoToStep={onGoToStep ?? (() => {})}
        />

        <span className="sr-only">{lessonTitle}</span>
      </header>

      <div
        className={cn(
          "lesson-stage-theme-board min-h-0",
          lessonStageSurfaceClassName,
          "transition-[border-color,box-shadow] duration-300",
          isCorrect && "lesson-panel-glow-correct border-emerald-400/80",
          isIncorrect && "lesson-panel-glow-incorrect border-amber-400/80",
        )}
        data-testid="lesson-step-panel"
      >
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden">{children}</div>
      </div>

      {footer ? (
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex justify-center px-3 pb-4 sm:px-4 sm:pb-5"
          data-testid="lesson-footer-slot"
        >
          <div className="lesson-floating-footer pointer-events-auto w-full max-w-5xl opacity-[0.52] transition-opacity duration-200 hover:opacity-100 focus-within:opacity-100">
            {footer}
          </div>
        </div>
      ) : null}

      {overlay ? (
        <div
          className={cn(
            "pointer-events-none absolute z-30 transition-[left,right,bottom] duration-300",
            footer ? "bottom-[5.75rem] sm:bottom-[6rem]" : "bottom-6",
            tutorPanelOpen ? "right-4 sm:right-8 lg:right-12" : "left-4 sm:left-8 lg:left-12",
          )}
        >
          {overlay}
        </div>
      ) : null}
    </div>
  );
}
