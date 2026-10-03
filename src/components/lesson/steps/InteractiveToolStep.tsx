"use client";

import { useMemo } from "react";
import { useRegisterLessonStepControl } from "@/components/lesson/LessonStepControlContext";
import { ConceptCard } from "@/components/lesson/steps/ConceptCard";
import { NaturalesNumeracionTool } from "@/components/lesson/tools/naturales-numeracion/NaturalesNumeracionTool";
import { SystemGraphTool } from "@/components/lesson/tools/SystemGraphTool";
import type { LessonContinueMeta } from "@/components/lesson/LessonStepControlContext";
import type { InteractiveToolStep as InteractiveToolStepType, SystemGraphToolStep } from "@/lib/lesson/types";
import { cn } from "@/lib/utils";

type InteractiveToolStepProps = {
  step: InteractiveToolStepType;
  onContinue: (meta?: LessonContinueMeta) => void;
  compact?: boolean;
};

function SystemGraphInteractiveStep({
  step,
  onContinue,
  compact = false,
}: {
  step: SystemGraphToolStep;
  onContinue: (meta?: LessonContinueMeta) => void;
  compact?: boolean;
}) {
  const control = useMemo(
    () => ({
      label: "Continuar",
      onClick: () => onContinue({ completed: true }),
      testId: "lesson-continue-button",
    }),
    [onContinue],
  );

  useRegisterLessonStepControl(control);

  const hasContext = Boolean(
    step.content?.length || step.math?.length || step.warning || step.visuals?.length,
  );

  const split = hasContext && (step.layout ?? "split") === "split";

  return (
    <div
      className={cn(
        "gap-6",
        split ? "grid lg:grid-cols-2 lg:items-start lg:gap-12" : "flex flex-col",
      )}
      data-testid="lesson-interactive-tool"
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

      <SystemGraphTool config={step.graph} compact={compact} />
    </div>
  );
}

export function InteractiveToolStepView({ step, onContinue, compact = false }: InteractiveToolStepProps) {
  if (step.tool === "naturales-numeracion") {
    return <NaturalesNumeracionTool step={step} onContinue={onContinue} compact={compact} />;
  }

  return <SystemGraphInteractiveStep step={step} onContinue={onContinue} compact={compact} />;
}
