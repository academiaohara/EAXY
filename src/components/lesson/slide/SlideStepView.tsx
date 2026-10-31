"use client";

import { useMemo } from "react";
import {
  useRegisterLessonStepControl,
  type LessonContinueMeta,
} from "@/components/lesson/LessonStepControlContext";
import { SlideBlockView } from "@/components/lesson/slide/SlideBlocks";
import { StageViewport } from "@/components/lesson/stage/StageViewport";
import type { LessonStageTheme, SlideStep } from "@/lib/lesson/types";
import { cn } from "@/lib/utils";

type SlideStepViewProps = {
  step: SlideStep;
  theme: LessonStageTheme;
  onContinue: (meta?: LessonContinueMeta) => void;
};

/**
 * Diapositiva de teoría: columna de bloques de texto + elemento visual (animación
 * o figura). Se puede continuar siempre: la animación es una ayuda, no un peaje.
 */
export function SlideStepView({ step, theme, onContinue }: SlideStepViewProps) {
  const control = useMemo(
    () => ({
      label: "Continuar",
      onClick: () => onContinue({ completed: true }),
      testId: "lesson-continue-button",
    }),
    [onContinue],
  );
  useRegisterLessonStepControl(control);

  const arrange = step.arrange ?? (step.visual ? "split" : "stack");

  // Mesa de dibujo sola: ocupa todo el escenario, sin scroll (los textos van en sus pasos).
  if (step.visual?.kind === "bench" && step.blocks.length === 0) {
    return (
      <StageViewport
        theme={theme}
        className="min-h-0 flex-1"
        stage={
          <div className="lesson-slide min-h-0 flex-1 pb-2" data-testid="lesson-slide" data-arrange="bench">
            <SlideBlockView block={step.visual} />
          </div>
        }
      />
    );
  }

  const text = (
    <div
      className={cn(
        "min-w-0 gap-4",
        arrange === "text-top" ? "grid lg:grid-cols-2 lg:items-start" : "flex flex-col",
      )}
      data-testid="lesson-slide-text"
    >
      {step.blocks.map((block, i) => (
        <SlideBlockView key={i} block={block} />
      ))}
    </div>
  );
  const visual = step.visual ? (
    <div className="flex min-w-0 flex-col justify-start" data-testid="lesson-slide-visual">
      <SlideBlockView block={step.visual} />
    </div>
  ) : null;

  return (
    <StageViewport
      theme={theme}
      className="min-h-0 flex-1"
      stage={
        <div
          className={cn(
            "lesson-slide grid min-h-0 w-full gap-6 overflow-y-auto pb-4 pr-1",
            arrange === "split" && visual && "lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-start lg:gap-8",
            (arrange === "visual-top" || arrange === "text-top") && "grid-cols-1",
          )}
          data-testid="lesson-slide"
          data-arrange={arrange}
        >
          {arrange === "visual-top" ? (
            <>
              {visual}
              {text}
            </>
          ) : (
            <>
              {text}
              {visual}
            </>
          )}
        </div>
      }
    />
  );
}
