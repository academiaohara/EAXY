"use client";

import { LESSON_SHELL_WIDTH } from "@/components/lesson/LessonFrame";
import { cn } from "@/lib/utils";
import type { FeedbackStatus } from "@/lib/lesson/types";

type LessonFooterDockProps = {
  /** Tutor a la izquierda: acompaña siempre al alumno. */
  tutor: React.ReactNode;
  /** Acción principal del paso (comprobar, continuar, finalizar). */
  action: React.ReactNode;
  feedback?: FeedbackStatus | null;
};

export function LessonFooterDock({ tutor, action, feedback = null }: LessonFooterDockProps) {
  return (
    <div
      className={cn(
        "shrink-0 border-t transition-colors duration-300",
        feedback === "correct" && "border-emerald-200 bg-emerald-50/80",
        feedback === "incorrect" && "border-rose-200 bg-rose-50/80",
        !feedback && "border-slate-200/80 bg-white/70",
      )}
      data-testid="lesson-footer-dock"
    >
      <div
        className={cn(
          "flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6",
          LESSON_SHELL_WIDTH,
        )}
      >
        <div className="min-w-0 flex-1">{tutor}</div>
        <div className="flex w-full shrink-0 flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
          {action}
        </div>
      </div>
    </div>
  );
}
