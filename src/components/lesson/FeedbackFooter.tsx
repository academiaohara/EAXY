"use client";

import { CheckCircle2Icon, XCircleIcon } from "lucide-react";
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
  const isCorrect = status === "correct";

  return (
    <div
      className={cn(
        "border-t px-4 py-4 animate-in slide-in-from-bottom duration-300",
        variant === "fixed"
          ? "fixed inset-x-0 bottom-0 z-50 shadow-[0_-4px_24px_rgba(0,0,0,0.08)]"
          : "shrink-0 shadow-none",
        isCorrect ? "border-emerald-200 bg-emerald-50" : "border-destructive/30 bg-destructive/5",
      )}
      role="status"
      data-testid="lesson-feedback-footer"
    >
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          {isCorrect ? (
            <CheckCircle2Icon className="mt-0.5 size-5 shrink-0 text-emerald-600" />
          ) : (
            <XCircleIcon className="mt-0.5 size-5 shrink-0 text-destructive" />
          )}
          <div className="space-y-1">
            <p
              className={cn(
                "font-medium",
                isCorrect ? "text-emerald-800" : "text-destructive",
              )}
            >
              {isCorrect ? "¡Correcto!" : "Incorrecto"}
            </p>
            {explanation ? (
              <p className="text-sm text-ink-muted">
                <MathRenderer text={explanation} />
              </p>
            ) : null}
          </div>
        </div>
        <Button type="button" onClick={onNext} data-testid="lesson-next-button">
          {isLastStep ? "Finalizar lección" : "Continuar"}
        </Button>
      </div>
    </div>
  );
}
