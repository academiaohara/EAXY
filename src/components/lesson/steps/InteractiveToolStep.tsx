"use client";

import { useMemo } from "react";
import { useRegisterLessonStepControl } from "@/components/lesson/LessonStepControlContext";
import { ConceptCard } from "@/components/lesson/steps/ConceptCard";
import { SystemGraphTool } from "@/components/lesson/tools/SystemGraphTool";
import type { InteractiveToolStep as InteractiveToolStepType } from "@/lib/lesson/types";

type InteractiveToolStepProps = {
  step: InteractiveToolStepType;
  onContinue: () => void;
  compact?: boolean;
};

export function InteractiveToolStepView({ step, onContinue, compact = false }: InteractiveToolStepProps) {
  const control = useMemo(
    () => ({
      label: "Continuar",
      onClick: onContinue,
      testId: "lesson-continue-button",
    }),
    [onContinue],
  );

  useRegisterLessonStepControl(control);

  return (
    <div className={compact ? "space-y-3" : "space-y-6"} data-testid="lesson-interactive-tool">
      <ConceptCard
        title={step.title}
        content={step.content}
        math={step.math}
        warning={step.warning}
        compact={compact}
        showTitle={false}
      />

      {step.tool === "system-graph" ? <SystemGraphTool config={step.graph} compact={compact} /> : null}
    </div>
  );
}
