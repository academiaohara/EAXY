"use client";

import { useCallback, useMemo, useState } from "react";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { useRegisterLessonStepControl } from "@/components/lesson/LessonStepControlContext";
import { ConceptCard } from "@/components/lesson/steps/ConceptCard";
import { cn } from "@/lib/utils";
import type { AnimatedSolutionStep } from "@/lib/lesson/types";

type AnimatedSolutionProps = {
  step: AnimatedSolutionStep;
  onContinue: () => void;
  compact?: boolean;
};

export function AnimatedSolution({ step, onContinue, compact = false }: AnimatedSolutionProps) {
  const [frameIndex, setFrameIndex] = useState(0);
  const totalFrames = step.frames.length;
  const isLastFrame = frameIndex >= totalFrames - 1;

  const handleAdvance = useCallback(() => {
    if (isLastFrame) {
      onContinue();
      return;
    }
    setFrameIndex((prev) => prev + 1);
  }, [isLastFrame, onContinue]);

  const control = useMemo(
    () => ({
      label: isLastFrame ? "Continuar" : "Ver siguiente paso",
      onClick: handleAdvance,
      testId: isLastFrame ? "lesson-continue-button" : "lesson-animation-next",
    }),
    [handleAdvance, isLastFrame],
  );

  useRegisterLessonStepControl(control);

  return (
    <div className={compact ? "space-y-3" : "space-y-6"} data-testid="lesson-animated-solution">
      <ConceptCard
        title={step.title}
        content={step.content}
        math={step.math}
        warning={step.warning}
        compact={compact}
        showTitle={false}
      />

      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>
            Paso {frameIndex + 1} de {totalFrames}
          </span>
          <span>Resolución paso a paso</span>
        </div>

        <div className="space-y-2">
          {step.frames.slice(0, frameIndex + 1).map((frame, index) => (
            <div
              key={`${frame.math}-${index}`}
              className={cn(
                "rounded-lg border border-border bg-paper-raised px-3 py-2 transition-all",
                index === frameIndex &&
                  "border-emerald-400/70 bg-emerald-50/80 animate-in fade-in slide-in-from-bottom-2 duration-300",
              )}
            >
              {frame.caption ? (
                <p className="mb-1 text-xs text-muted-foreground">
                  <MathRenderer text={frame.caption} />
                </p>
              ) : null}
              <MathRenderer text={frame.math} display />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
