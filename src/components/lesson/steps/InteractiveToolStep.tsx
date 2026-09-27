"use client";

import { useMemo } from "react";
import { useRegisterLessonStepControl } from "@/components/lesson/LessonStepControlContext";
import { ConceptCard } from "@/components/lesson/steps/ConceptCard";
import { SystemGraphTool } from "@/components/lesson/tools/SystemGraphTool";
import type { InteractiveToolStep as InteractiveToolStepType } from "@/lib/lesson/types";
import { cn } from "@/lib/utils";

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

  const hasContext = Boolean(step.content?.length || step.math?.length || step.warning);

  return (
    <div
      className={cn(
        "gap-6",
        hasContext ? "grid lg:grid-cols-2 lg:items-start lg:gap-12" : "space-y-4",
      )}
      data-testid="lesson-interactive-tool"
    >
      {hasContext ? (
        <ConceptCard
          title={step.title}
          content={step.content}
          math={step.math}
          warning={step.warning}
          compact={compact}
          showTitle={false}
        />
      ) : null}

      {step.tool === "system-graph" ? <SystemGraphTool config={step.graph} compact={compact} /> : null}
    </div>
  );
}
