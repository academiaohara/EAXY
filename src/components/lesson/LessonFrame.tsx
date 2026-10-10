"use client";

import { StarIcon } from "lucide-react";
import {
  useLessonBoardClickAdvance,
  useLessonPresenterChrome,
  type LessonPresenterChromeProps,
} from "@/components/lesson/LessonPresenterChrome";
import { lessonStageSurfaceClassName } from "@/lib/lesson/stage-surface";
import { cn } from "@/lib/utils";
import type { FeedbackStatus } from "@/lib/lesson/types";

type LessonFrameProps = LessonPresenterChromeProps & {
  feedback?: FeedbackStatus | null;
  children: React.ReactNode;
  overlay?: React.ReactNode;
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
  feedback = null,
  children,
  overlay,
  tutorPanelOpen = false,
  className,
  presenterNav,
  footerCenter,
  ...presenterProps
}: LessonFrameProps) {
  const { header, overlays } = useLessonPresenterChrome({
    ...presenterProps,
    feedback,
    footerCenter,
    presenterNav,
  });

  const isCorrect = feedback === "correct";
  const isIncorrect = feedback === "incorrect";

  const boardClickAdvance = useLessonBoardClickAdvance(
    Boolean(presenterNav?.clickSurfaceToAdvance && footerCenter && !feedback),
    presenterNav?.onAdvance,
  );

  return (
    <div
      className={cn(
        "lesson-stage-theme-board relative isolate flex h-full min-h-0 w-full flex-col overflow-hidden bg-[color:var(--stage-surface,#1a2332)]",
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

      {header}

      <div
        className={cn(
          "min-h-0 flex-1 transition-[border-color,box-shadow] duration-300",
          lessonStageSurfaceClassName,
          isCorrect && "lesson-panel-glow-correct",
          isIncorrect && "lesson-panel-glow-incorrect",
        )}
        data-testid="lesson-step-panel"
      >
        <div
          className={cn(
            "flex min-h-0 flex-1 flex-col overflow-hidden",
            "pl-3 pr-[calc(2.75rem+56px)] pt-1 sm:pl-4 sm:pr-[calc(3rem+56px)]",
          )}
          data-testid="lesson-step-content-inset"
          onClick={boardClickAdvance}
        >
          {children}
        </div>
      </div>

      {overlays}

      {overlay ? (
        <div
          className={cn(
            "pointer-events-none absolute z-[55] transition-[opacity] duration-300",
            "bottom-5 left-4 sm:bottom-6 sm:left-6",
            tutorPanelOpen && "opacity-0",
          )}
        >
          {overlay}
        </div>
      ) : null}
    </div>
  );
}
