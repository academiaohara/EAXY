"use client";

import { cn } from "@/lib/utils";
import type { FeedbackStatus } from "@/lib/lesson/types";

type LessonFooterDockProps = {
  /** Acción principal del paso (comprobar, continuar, finalizar): va centrada. */
  action: React.ReactNode;
  /** Atajo de ayuda, a un lado para no competir con la acción principal. */
  help?: React.ReactNode;
  feedback?: FeedbackStatus | null;
};

/** Pie del panel de la lección; se tiñe con el color del feedback. */
export function LessonFooterDock({ action, help, feedback = null }: LessonFooterDockProps) {
  return (
    <div
      className={cn(
        "shrink-0 border-t transition-colors duration-300",
        feedback === "correct" && "border-emerald-200/80 bg-emerald-50/70",
        feedback === "incorrect" && "border-amber-200/80 bg-amber-50/70",
        !feedback && "border-slate-100 bg-white",
      )}
      data-testid="lesson-footer-dock"
      data-feedback={feedback ?? "none"}
    >
      <div className="flex items-center gap-3 px-4 py-3.5 sm:px-8">
        {/* Espaciador simétrico al de la ayuda: deja la acción en el centro. */}
        <div className="flex-1" aria-hidden />
        <div className="flex shrink-0 items-center justify-center">{action}</div>
        <div className="flex flex-1 items-center justify-end">{help}</div>
      </div>
    </div>
  );
}
