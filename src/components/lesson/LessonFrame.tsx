"use client";

import {
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
            "pl-5 pr-[calc(2.75rem+56px)] pt-4 sm:pl-6 sm:pr-[calc(3rem+56px)] sm:pt-5",
          )}
          data-testid="lesson-step-content-inset"
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
