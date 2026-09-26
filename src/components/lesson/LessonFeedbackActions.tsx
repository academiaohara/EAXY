"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { FeedbackStatus } from "@/lib/lesson/types";

type LessonFeedbackActionsProps = {
  status: FeedbackStatus;
  /** Hay explicación disponible para mostrar en el globo del tutor. */
  hasExplanation?: boolean;
  explanationVisible?: boolean;
  onToggleExplanation?: () => void;
  isLastStep?: boolean;
  onNext: () => void;
};

export function LessonFeedbackActions({
  status,
  hasExplanation = false,
  explanationVisible = false,
  onToggleExplanation,
  isLastStep = false,
  onNext,
}: LessonFeedbackActionsProps) {
  const isCorrect = status === "correct";

  return (
    <div
      className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center"
      role="status"
      data-testid="lesson-feedback-footer"
    >
      {hasExplanation ? (
        <Button
          type="button"
          variant="outline"
          className="rounded-full border-slate-300 bg-white py-6 sm:py-3"
          onClick={onToggleExplanation}
          data-testid="lesson-why-button"
        >
          {explanationVisible ? "Ocultar" : "¿Por qué?"}
        </Button>
      ) : null}
      <Button
        type="button"
        className={cn(
          "w-full rounded-full py-6 text-base font-semibold text-white sm:w-auto sm:min-w-[13rem]",
          isCorrect
            ? "bg-emerald-500 hover:bg-emerald-600"
            : "bg-cobalt hover:bg-cobalt/90",
        )}
        onClick={onNext}
        data-testid="lesson-next-button"
      >
        {isLastStep ? "Finalizar" : "Continuar"}
      </Button>
    </div>
  );
}
