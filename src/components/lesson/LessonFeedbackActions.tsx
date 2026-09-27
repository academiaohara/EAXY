"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { FeedbackStatus } from "@/lib/lesson/types";

type LessonFeedbackActionsProps = {
  status: FeedbackStatus;
  isLastStep?: boolean;
  onNext: () => void;
};

export function LessonFeedbackActions({
  status,
  isLastStep = false,
  onNext,
}: LessonFeedbackActionsProps) {
  const isCorrect = status === "correct";

  return (
    <div className="flex items-center" role="status" data-testid="lesson-feedback-footer">
      <Button
        type="button"
        className={cn(
          "min-w-[11rem] rounded-full py-6 text-base font-semibold text-white sm:min-w-[13rem]",
          isCorrect ? "bg-emerald-500 hover:bg-emerald-600" : "bg-cobalt hover:bg-cobalt/90",
        )}
        onClick={onNext}
        data-testid="lesson-next-button"
      >
        {isLastStep ? "Finalizar" : "Continuar"}
      </Button>
    </div>
  );
}
