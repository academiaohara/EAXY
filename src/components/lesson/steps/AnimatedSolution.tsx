"use client";

import { useCallback, useMemo, useState } from "react";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { useRegisterLessonStepControl } from "@/components/lesson/LessonStepControlContext";
import { ConceptCard } from "@/components/lesson/steps/ConceptCard";
import { cn } from "@/lib/utils";
import type { LessonContinueMeta } from "@/components/lesson/LessonStepControlContext";
import type { AnimatedSolutionStep } from "@/lib/lesson/types";

type AnimatedSolutionProps = {
  step: AnimatedSolutionStep;
  onContinue: (meta?: LessonContinueMeta) => void;
  compact?: boolean;
};

export function AnimatedSolution({ step, onContinue, compact = false }: AnimatedSolutionProps) {
  const [frameIndex, setFrameIndex] = useState(0);
  const totalFrames = step.frames.length;
  const isLastFrame = frameIndex >= totalFrames - 1;

  const handleAdvance = useCallback(() => {
    if (isLastFrame) {
      onContinue({ completed: true });
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

  const hasContext = Boolean(
    step.content?.length || step.math?.length || step.warning || step.visuals?.length,
  );
  const split = hasContext && step.layout === "split";

  return (
    <div
      className={cn(
        split ? "grid gap-6 lg:grid-cols-2 lg:items-start lg:gap-12" : "flex flex-col gap-5",
      )}
      data-testid="lesson-animated-solution"
    >
      {hasContext ? (
        <ConceptCard
          title={step.title}
          content={step.content}
          math={step.math}
          warning={step.warning}
          visuals={step.visuals}
          layout={split ? "stack" : step.layout}
          compact={compact}
          showTitle={false}
        />
      ) : null}

      <div className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50/60 p-4 text-ink sm:p-5 lesson-stage-theme-board:border-[color:var(--stage-border)] lesson-stage-theme-board:bg-black/30 lesson-stage-theme-board:text-[color:var(--stage-ink)]">
        <div className="flex items-center justify-between gap-3">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Resolución paso a paso
          </span>
          <span className="text-xs font-semibold tabular-nums text-muted-foreground">
            {frameIndex + 1}/{totalFrames}
          </span>
        </div>

        <ol className="space-y-2">
          {step.frames.slice(0, frameIndex + 1).map((frame, index) => (
            <li
              key={`${frame.math}-${index}`}
              className={cn(
                "flex gap-3 rounded-xl border border-border bg-paper-raised px-3 py-2.5 transition-all lesson-stage-theme-board:border-[color:var(--stage-border)] lesson-stage-theme-board:bg-black/20",
                index === frameIndex &&
                  "border-emerald-400/70 bg-emerald-50/80 animate-in fade-in slide-in-from-top-2 duration-300 lesson-stage-theme-board:border-[color:var(--stage-accent-muted)]/70 lesson-stage-theme-board:bg-[color:var(--stage-accent-muted)]/12",
              )}
            >
              <span
                className={cn(
                  "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold",
                  index === frameIndex
                    ? "bg-emerald-500 text-white lesson-stage-theme-board:bg-[color:var(--stage-accent-muted)]"
                    : "bg-slate-200 text-slate-600 lesson-stage-theme-board:bg-white/15 lesson-stage-theme-board:text-[color:var(--stage-muted)]",
                )}
                aria-hidden
              >
                {index + 1}
              </span>
              <div className="min-w-0 flex-1">
                {frame.caption ? (
                  <p className="mb-1 text-xs text-muted-foreground">
                    <MathRenderer text={frame.caption} />
                  </p>
                ) : null}
                <MathRenderer text={frame.math} display />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
