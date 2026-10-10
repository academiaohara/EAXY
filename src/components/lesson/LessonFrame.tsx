"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { StarIcon, XIcon } from "lucide-react";
import {
  LessonSlidesSidebar,
  LessonSlidesToggle,
  type LessonSlidePreview,
} from "@/components/lesson/LessonSlidesSidebar";
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
  steps?: LessonSlidePreview[];
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
      className="flex shrink-0 items-center gap-1.5 bg-black/25 px-2.5 py-1 text-xs font-semibold text-amber-400 ring-1 ring-[color:var(--stage-border,#334155)]"
      data-testid="lesson-stars"
      aria-label={
        totalStars ? `${stars} de ${totalStars} estrellas` : `${stars} estrellas conseguidas`
      }
    >
      <StarIcon className="size-3.5 fill-amber-400 text-amber-400" aria-hidden />
      <span className="tabular-nums">
        {stars}
        {totalStars ? <span className="text-amber-400/60">/{totalStars}</span> : null}
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
  steps = [],
  feedback = null,
  children,
  footer,
  overlay,
  tutorPanelOpen = false,
  className,
}: LessonFrameProps) {
  const [slidesOpen, setSlidesOpen] = useState(false);
  const toggleSlides = useCallback(() => setSlidesOpen((open) => !open), []);

  const isCorrect = feedback === "correct";
  const isIncorrect = feedback === "incorrect";
  const stepIndex = currentStepIndex ?? currentStep - 1;

  return (
    <div
      className={cn(
        "lesson-stage-theme-board relative isolate flex h-full min-h-0 w-full flex-col overflow-hidden bg-[color:var(--stage-surface,#1a2332)] transition-[padding] duration-300",
        slidesOpen && "max-lg:pr-0 lg:pr-[17rem]",
        className,
      )}
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

      <header className="relative z-50 flex shrink-0 items-center justify-between gap-3 px-4 py-2 sm:px-6">
        <Button
          variant="ghost"
          size="icon-lg"
          nativeButton={false}
          className="shrink-0 rounded-none text-[color:var(--stage-muted,#94a3b8)] hover:bg-white/5 hover:text-[color:var(--stage-ink,#e8edf5)]"
          aria-label="Cerrar lección"
          render={<Link href={closeHref} data-testid="lesson-close" />}
        >
          <XIcon className="size-5" />
        </Button>

        <LessonSlidesToggle open={slidesOpen} onToggle={toggleSlides} />

        <span className="sr-only">{lessonTitle}</span>
      </header>

      <div
        className={cn(
          "min-h-0 flex-1 transition-[border-color,box-shadow] duration-300",
          lessonStageSurfaceClassName,
          isCorrect && "lesson-panel-glow-correct",
          isIncorrect && "lesson-panel-glow-incorrect",
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
            slidesOpen && !tutorPanelOpen && "lg:right-[19rem]",
          )}
        >
          {overlay}
        </div>
      ) : null}

      {steps.length > 0 && onGoToStep ? (
        <LessonSlidesSidebar
          open={slidesOpen}
          onOpenChange={setSlidesOpen}
          steps={steps}
          currentIndex={stepIndex}
          completed={completedSteps ?? []}
          visited={visitedSteps ?? []}
          onGoToStep={onGoToStep}
        />
      ) : null}
    </div>
  );
}
