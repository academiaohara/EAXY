"use client";

import { LESSON_SHELL_WIDTH } from "@/components/lesson/LessonFrame";
import { cn } from "@/lib/utils";
import type { FeedbackStatus } from "@/lib/lesson/types";

type LessonFooterDockProps = {
  /** Acción principal del paso (comprobar, continuar, finalizar): va centrada. */
  action: React.ReactNode;
  /** Atajo de ayuda, a un lado para no competir con la acción principal. */
  help?: React.ReactNode;
  feedback?: FeedbackStatus | null;
};

export function LessonFooterDock({ action, help, feedback = null }: LessonFooterDockProps) {
  return (
    <div
      className={cn(
        "shrink-0 border-t transition-colors duration-300",
        feedback === "correct" && "border-emerald-200 bg-emerald-50/80",
        feedback === "incorrect" && "border-rose-200 bg-rose-50/80",
        !feedback && "border-slate-200/80 bg-slate-100/70",
      )}
      data-testid="lesson-footer-dock"
    >
      <div className={cn("flex items-center gap-3 py-3", LESSON_SHELL_WIDTH)}>
        {/* Espaciador simétrico al de la ayuda: deja la acción en el centro. */}
        <div className="flex-1" aria-hidden />
        <div className="flex shrink-0 items-center justify-center">{action}</div>
        <div className="flex flex-1 items-center justify-end">{help}</div>
      </div>
    </div>
  );
}
