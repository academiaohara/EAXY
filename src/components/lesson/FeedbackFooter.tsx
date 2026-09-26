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
          ? "fixed inset-x-0 bottom-0 z-20 border-t shadow-[0_-4px_24px_rgba(0,0,0,0.06)] backdrop-blur-sm"
          : "shrink-0 shadow-none",
        isCorrect ? "border-emerald-300 bg-emerald-50/95" : "border-red-200 bg-red-50/95",
      )}
      role="status"
      data-testid="lesson-feedback-footer"
    >
      <div className="mx-auto flex w-full max-w-lg flex-col items-center gap-3 text-center">
        <p
          className={cn("text-lg font-semibold", isCorrect ? "text-emerald-800" : "text-red-700")}
        >
          {isCorrect ? "¡Correcto!" : "Incorrecto"}
        </p>

        {showWhy && explanation ? (
          <p className="text-sm leading-relaxed text-ink-muted">
            <MathRenderer text={explanation} />
          </p>
        ) : null}

        <div className="flex w-full flex-col items-center gap-2 sm:flex-row sm:justify-center">
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
            className="w-full max-w-md rounded-full bg-emerald-500 py-6 text-base font-semibold text-white hover:bg-emerald-600 sm:py-3"
            onClick={onNext}
            data-testid="lesson-next-button"
          >
            {isLastStep ? "Finalizar" : "Continuar"}
          </Button>
        </div>
      </div>
    </div>
  );
}
