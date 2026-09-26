"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { TutorMascot } from "@/components/tutor/tutor-mascot";
import { cn } from "@/lib/utils";
import { tutorMoodForFeedback } from "@/lib/tutor/moods";
import type { FeedbackStatus } from "@/lib/lesson/types";

type FeedbackFooterProps = {
  status: FeedbackStatus;
  explanation?: string;
  isLastStep?: boolean;
  onNext: () => void;
  variant?: "fixed" | "docked";
};

export function FeedbackFooter({
  status,
  explanation,
  isLastStep = false,
  onNext,
  variant = "fixed",
}: FeedbackFooterProps) {
  const [showWhy, setShowWhy] = useState(false);
  const isCorrect = status === "correct";

  return (
    <div
      className={cn(
        "border-t-2 px-4 py-4 animate-in slide-in-from-bottom duration-300",
        variant === "fixed"
          ? "fixed inset-x-0 bottom-0 z-50 shadow-[0_-4px_24px_rgba(0,0,0,0.08)]"
          : "shrink-0 shadow-none",
        isCorrect
          ? "border-emerald-300 bg-emerald-50"
          : "border-red-200 bg-red-50",
      )}
      role="status"
      data-testid="lesson-feedback-footer"
    >
      <div
        className={cn(
          "mx-auto flex w-full flex-col gap-4",
          variant === "fixed" ? "max-w-2xl" : "max-w-none",
        )}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <TutorMascot
              mood={tutorMoodForFeedback(status)}
              size={52}
              label={null}
            />
            <p
              className={cn(
                "text-lg font-semibold",
                isCorrect ? "text-emerald-800" : "text-red-700",
              )}
            >
              {isCorrect ? "¡Correcto!" : "Incorrecto"}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {explanation ? (
              <Button
                type="button"
                variant="outline"
                className="rounded-full border-slate-300 bg-white"
                onClick={() => setShowWhy((prev) => !prev)}
                data-testid="lesson-why-button"
              >
                ¿Por qué?
              </Button>
            ) : null}
            <Button
              type="button"
              className="min-w-[120px] rounded-full bg-emerald-500 font-semibold text-white hover:bg-emerald-600"
              onClick={onNext}
              data-testid="lesson-next-button"
            >
              {isLastStep ? "Finalizar" : "Continuar"}
            </Button>
          </div>
        </div>

        {showWhy && explanation ? (
          <p className="text-sm leading-relaxed text-ink-muted">
            <MathRenderer text={explanation} />
          </p>
        ) : null}
      </div>
    </div>
  );
}
