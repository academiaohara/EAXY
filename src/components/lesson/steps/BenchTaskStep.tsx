"use client";

import { BenchPracticeContext, type BenchPractice } from "@/components/lesson/bench/practice";
import { SlideBench } from "@/components/lesson/bench/SlideBench";
import { StageViewport } from "@/components/lesson/stage/StageViewport";
import type { StepCheckResult, BenchTaskSnapshot } from "@/lib/lesson/step-attempt";
import type { BenchTaskStep, LessonStageTheme } from "@/lib/lesson/types";
import { useMemo } from "react";

type BenchTaskStepViewProps = {
  step: BenchTaskStep;
  theme: LessonStageTheme;
  onCheck: (result: StepCheckResult) => void;
  disabled?: boolean;
  saved?: BenchTaskSnapshot | null;
};

/** Ejercicio sobre la mesa de dibujo: la escena ocupa todo el escenario y se comprueba desde el pie. */
export function BenchTaskStepView({ step, theme, onCheck, disabled, saved }: BenchTaskStepViewProps) {
  const practice = useMemo<BenchPractice>(() => ({ onCheck, disabled, saved }), [onCheck, disabled, saved]);
  return (
    <BenchPracticeContext.Provider value={practice}>
      <StageViewport
        theme={theme}
        className="min-h-0 flex-1"
        stage={
          <div className="lesson-slide min-h-0 flex-1 pb-2" data-testid="lesson-bench-task">
            <SlideBench block={{ kind: "bench", scene: step.scene, params: step.params, notes: step.notes }} />
          </div>
        }
      />
    </BenchPracticeContext.Provider>
  );
}
