"use client";

import { ChevronLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { FeedbackStatus } from "@/lib/lesson/types";

type LessonFooterDockProps = {
  /** Acción principal del paso (comprobar, continuar, finalizar): va centrada. */
  action: React.ReactNode;
  /** Atajo de ayuda, a un lado para no competir con la acción principal. */
  help?: React.ReactNode;
  /** Paso anterior (exploración libre). */
  onBack?: () => void;
  canBack?: boolean;
  /** Avanzar sin marcar el paso como completado. */
  onSkip?: () => void;
  feedback?: FeedbackStatus | null;
};

/** Pie del panel de la lección; se tiñe con el color del feedback. */
export function LessonFooterDock({
  action,
  help,
  onBack,
  canBack = false,
  onSkip,
  feedback = null,
}: LessonFooterDockProps) {
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
      <div className="flex items-center gap-2 px-4 py-3.5 sm:gap-3 sm:px-8">
        <div className="flex min-w-0 flex-1 items-center justify-start gap-2">
          {canBack && onBack ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="rounded-full text-slate-600"
              onClick={onBack}
              data-testid="lesson-back-button"
            >
              <ChevronLeftIcon className="size-4" aria-hidden />
              Atrás
            </Button>
          ) : null}
        </div>
        <div className="flex shrink-0 items-center justify-center">{action}</div>
        <div className="flex min-w-0 flex-1 items-center justify-end gap-2">
          {onSkip && !feedback ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="rounded-full text-slate-500"
              onClick={onSkip}
              data-testid="lesson-skip-button"
            >
              Saltar
            </Button>
          ) : null}
          {help}
        </div>
      </div>
    </div>
  );
}
