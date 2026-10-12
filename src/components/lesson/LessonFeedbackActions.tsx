"use client";

import { CircleHelpIcon, MessageCircleQuestionIcon, RotateCcwIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { FeedbackStatus } from "@/lib/lesson/types";

type LessonFeedbackActionsProps = {
  status: FeedbackStatus;
  isLastStep?: boolean;
  onNext: () => void;
  /** Pregunta al tutor por qué: al acertar confirma el razonamiento, al fallar lo explica. */
  onHelp?: () => void;
  /** Vuelve a dejar el paso en blanco para practicar otra vez. */
  onReset?: () => void;
};

const iconActionClassName =
  "size-11 shrink-0 rounded-full border-2 border-[color:var(--stage-border,#475569)] bg-[color:var(--stage-surface,#1a2332)]/90 p-0 text-[color:var(--stage-muted,#94a3b8)] shadow-sm hover:border-cobalt/45 hover:bg-[color:var(--stage-surface,#1a2332)] hover:text-[color:var(--stage-ink,#e8edf5)]";

export function LessonFeedbackActions({
  status,
  isLastStep = false,
  onNext,
  onHelp,
  onReset,
}: LessonFeedbackActionsProps) {
  const isCorrect = status === "correct";
  const helpLabel = isCorrect ? "¿Por qué?" : "Ayúdame";

  return (
    <div
      className="flex items-center justify-center gap-3 rounded-full border border-[color:var(--stage-border,#334155)] bg-[#121a26]/92 px-3 py-2 shadow-lg backdrop-blur-md"
      role="status"
      data-testid="lesson-feedback-actions"
    >
      {onReset ? (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className={iconActionClassName}
          onClick={onReset}
          aria-label="Reintentar paso"
          data-testid="lesson-step-reset"
        >
          <RotateCcwIcon className="size-5" aria-hidden />
        </Button>
      ) : (
        <span className="size-11 shrink-0" aria-hidden />
      )}
      <Button
        type="button"
        className={cn(
          "min-w-[10.5rem] rounded-full px-8 py-6 text-base font-semibold sm:min-w-[12rem]",
          isCorrect
            ? "bg-emerald-500 text-white shadow-[0_3px_0_#059669] hover:bg-emerald-600"
            : "bg-amber-400 text-amber-950 shadow-[0_3px_0_#d97706] hover:bg-amber-300",
        )}
        onClick={onNext}
        data-testid="lesson-next-button"
      >
        {isLastStep ? "Finalizar" : "Continuar"}
      </Button>
      {onHelp ? (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className={cn(
            iconActionClassName,
            isCorrect
              ? "hover:border-emerald-400/45 hover:text-emerald-200"
              : "hover:border-amber-400/45 hover:text-amber-100",
          )}
          onClick={onHelp}
          aria-label={helpLabel}
          data-testid="lesson-feedback-help"
        >
          {isCorrect ? (
            <CircleHelpIcon className="size-5" aria-hidden />
          ) : (
            <MessageCircleQuestionIcon className="size-5" aria-hidden />
          )}
        </Button>
      ) : (
        <span className="size-11 shrink-0" aria-hidden />
      )}
    </div>
  );
}
