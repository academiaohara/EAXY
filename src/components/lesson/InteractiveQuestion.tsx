"use client";

import { useMemo } from "react";
import { useRegisterLessonStepControl } from "@/components/lesson/LessonStepControlContext";
import { AnimatedSolution } from "@/components/lesson/steps/AnimatedSolution";
import { ConceptCard } from "@/components/lesson/steps/ConceptCard";
import { FillInBlank } from "@/components/lesson/steps/FillInBlank";
import { InteractiveToolStepView } from "@/components/lesson/steps/InteractiveToolStep";
import { MultipleChoice } from "@/components/lesson/steps/MultipleChoice";
import type { LessonStep } from "@/lib/lesson/types";

type InteractiveQuestionProps = {
  step: LessonStep;
  onCheck: (correct: boolean) => void;
  onContinue?: () => void;
  disabled?: boolean;
  compact?: boolean;
};

function ConceptStepView({
  step,
  onContinue,
  compact,
}: {
  step: Extract<LessonStep, { type: "concept" }>;
  onContinue?: () => void;
  compact?: boolean;
}) {
  const control = useMemo(
    () =>
      onContinue
        ? {
            label: "Continuar",
            onClick: onContinue,
            testId: "lesson-continue-button",
          }
        : null,
    [onContinue],
  );

  useRegisterLessonStepControl(control);

  return (
    <div data-testid="lesson-concept-step">
      <ConceptCard
        title={step.title}
        content={step.content}
        math={step.math}
        warning={step.warning}
        compact={compact}
        showTitle={false}
        split
      />
    </div>
  );
}

export function InteractiveQuestion({
  step,
  onCheck,
  onContinue,
  disabled = false,
  compact = false,
}: InteractiveQuestionProps) {
  if (step.type === "concept") {
    return <ConceptStepView step={step} onContinue={onContinue} compact={compact} />;
  }

  if (step.type === "animated_solution") {
    return (
      <AnimatedSolution step={step} onContinue={onContinue ?? (() => {})} compact={compact} />
    );
  }

  if (step.type === "interactive_tool") {
    return (
      <InteractiveToolStepView step={step} onContinue={onContinue ?? (() => {})} compact={compact} />
    );
  }

  if (step.type === "fill_in_blank") {
    return (
      <FillInBlank step={step} onCheck={onCheck} disabled={disabled} compact={compact} />
    );
  }

  return <MultipleChoice step={step} onCheck={onCheck} disabled={disabled} compact={compact} />;
}
