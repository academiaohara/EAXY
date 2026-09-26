"use client";

import { useState } from "react";
import { ChevronRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { ConceptCard } from "@/components/lesson/steps/ConceptCard";
import { cn } from "@/lib/utils";
import type { AnimatedSolutionStep } from "@/lib/lesson/types";

type AnimatedSolutionProps = {
  step: AnimatedSolutionStep;
  onContinue: () => void;
};

export function AnimatedSolution({ step, onContinue }: AnimatedSolutionProps) {
  const [frameIndex, setFrameIndex] = useState(0);
  const totalFrames = step.frames.length;
  const isLastFrame = frameIndex >= totalFrames - 1;

  function handleAdvance() {
    if (isLastFrame) {
      onContinue();
      return;
    }
    setFrameIndex((prev) => prev + 1);
  }

  return (
    <div className="space-y-6" data-testid="lesson-animated-solution">
      <ConceptCard
        title={step.title}
        content={step.content}
        math={step.math}
        warning={step.warning}
        variant="inline"
      />

      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Paso {frameIndex + 1} de {totalFrames}</span>
          <span>Pulsa para avanzar en la resolución</span>
        </div>

        <div className="space-y-2">
          {step.frames.slice(0, frameIndex + 1).map((frame, index) => (
            <div
              key={`${frame.math}-${index}`}
              className={cn(
                "rounded-lg border border-border bg-paper-raised px-4 py-3 transition-all",
                index === frameIndex && "border-cobalt bg-cobalt-tint/30 animate-in fade-in slide-in-from-bottom-2 duration-300",
              )}
            >
              {frame.caption ? (
                <p className="mb-2 text-sm text-muted-foreground">
                  <MathRenderer text={frame.caption} />
                </p>
              ) : null}
              <MathRenderer text={frame.math} display />
            </div>
          ))}
        </div>

        <Button
          type="button"
          onClick={handleAdvance}
          className="w-full rounded-full py-6 text-base font-semibold sm:w-auto"
          data-testid={isLastFrame ? "lesson-continue-button" : "lesson-animation-next"}
        >
          {isLastFrame ? "Continuar" : "Ver siguiente paso"}
          {!isLastFrame ? <ChevronRightIcon data-icon="inline-end" /> : null}
        </Button>
      </div>
    </div>
  );
}
