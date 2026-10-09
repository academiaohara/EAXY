"use client";

import { ChevronLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { FeedbackStatus } from "@/lib/lesson/types";

type LessonFooterDockProps = {
  /** Acción principal del paso (comprobar, continuar, finalizar): centrada salvo que haya stageControls. */
  action: React.ReactNode;
  /** Controles de animación / diapositiva en el centro; la acción principal pasa a la derecha. */
  stageControls?: React.ReactNode;
  /** Atajo de ayuda, a un lado para no competir con la acción principal. */
  help?: React.ReactNode;
  /** Contador de estrellas u otros metadatos discretos. */
  meta?: React.ReactNode;
  /** Paso anterior (exploración libre). */
  onBack?: () => void;
  canBack?: boolean;
  /** Avanzar sin marcar el paso como completado. */
  onSkip?: () => void;
  feedback?: FeedbackStatus | null;
};

/** Barra de acciones flotante en la parte inferior de la lección. */
export function LessonFooterDock({
  action,
  stageControls,
  help,
  meta,
  onBack,
  canBack = false,
  onSkip,
  feedback = null,
}: LessonFooterDockProps) {
  const primaryOnRight = Boolean(stageControls) && Boolean(action);
  return (
    <div
      className={cn(
        "rounded-2xl border shadow-lg backdrop-blur-md transition-[background-color,border-color,box-shadow] duration-300",
        feedback === "correct" && "border-emerald-200/70 bg-emerald-50/85",
        feedback === "incorrect" && "border-amber-200/70 bg-amber-50/85",
        !feedback && "border-white/60 bg-white/75",
      )}
      data-testid="lesson-footer-dock"
      data-feedback={feedback ?? "none"}
    >
      <div className="flex items-center gap-2 px-4 py-3 sm:gap-3 sm:px-6">
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
          {meta}
        </div>
        <div className="flex shrink-0 items-center justify-center">
          {stageControls ?? action}
        </div>
        <div className="flex min-w-0 flex-1 items-center justify-end gap-2">
          {primaryOnRight ? action : null}
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
