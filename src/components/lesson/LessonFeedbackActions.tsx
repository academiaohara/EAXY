"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { FeedbackStatus } from "@/lib/lesson/types";

type LessonFeedbackActionsProps = {
  status: FeedbackStatus;
  isLastStep?: boolean;
  onNext: () => void;
  /** Pregunta al tutor por qué: al acertar confirma el razonamiento, al fallar lo explica. */
  onHelp?: () => void;
};

export function LessonFeedbackActions({
  status,
  isLastStep = false,
  onNext,
  onHelp,
}: LessonFeedbackActionsProps) {
  const isCorrect = status === "correct";

  return (
    <div className="flex items-center gap-3" role="status" data-testid="lesson-feedback-footer">
      {onHelp ? (
        <Button
          type="button"
          variant="outline"
          className={cn(
            "rounded-full border-2 bg-white px-6 py-6 text-base font-semibold shadow-[0_3px_0_rgba(15,23,42,0.08)]",
            isCorrect
              ? "border-emerald-200 text-emerald-900 hover:bg-emerald-50"
              : "border-amber-200 text-amber-950 hover:bg-amber-50",
          )}
          onClick={onHelp}
          data-testid="lesson-feedback-help"
        >
          {isCorrect ? "¿Por qué?" : "Ayúdame"}
        </Button>
      ) : null}
      <Button
        type="button"
        className={cn(
          "min-w-[11rem] rounded-full py-6 text-base font-semibold sm:min-w-[13rem]",
          isCorrect
            ? "bg-emerald-500 text-white shadow-[0_3px_0_#059669] hover:bg-emerald-600"
            : "bg-amber-400 text-amber-950 shadow-[0_3px_0_#d97706] hover:bg-amber-300",
        )}
        onClick={onNext}
        data-testid="lesson-next-button"
      >
        {isLastStep ? "Finalizar" : "Continuar"}
      </Button>
    </div>
  );
}
