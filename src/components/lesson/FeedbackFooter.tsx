"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { cn } from "@/lib/utils";
import type { FeedbackStatus } from "@/lib/lesson/types";

type FeedbackFooterProps = {
  status: FeedbackStatus;
  explanation?: string;
  isLastStep?: boolean;
  onNext: () => void;
};

export function FeedbackFooter({
  status,
  explanation,
  isLastStep = false,
  onNext,
}: FeedbackFooterProps) {
  const [showWhy, setShowWhy] = useState(false);
  const isCorrect = status === "correct";

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 border-t-2 px-4 py-4 animate-in slide-in-from-bottom duration-300",
        isCorrect ? "border-emerald-300 bg-emerald-50" : "border-red-200 bg-red-50",
      )}
      role="status"
      data-testid="lesson-feedback-footer"
    >
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p
            className={cn(
              "text-lg font-semibold",
              isCorrect ? "text-emerald-800" : "text-red-700",
            )}
          >
            {isCorrect ? "🎉 ¡Correcto!" : "Incorrecto"}
          </p>

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
