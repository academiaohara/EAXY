"use client";

import { useMemo } from "react";
import {
  useRegisterLessonStepControl,
  type LessonContinueMeta,
} from "@/components/lesson/LessonStepControlContext";
import { AnimatedSolution } from "@/components/lesson/steps/AnimatedSolution";
import { Classify } from "@/components/lesson/steps/Classify";
import { ConceptCard } from "@/components/lesson/steps/ConceptCard";
import { FillInBlank } from "@/components/lesson/steps/FillInBlank";
import { FractionPick } from "@/components/lesson/steps/FractionPick";
import { InteractiveToolStepView } from "@/components/lesson/steps/InteractiveToolStep";
import { NumberLinePick } from "@/components/lesson/steps/NumberLinePick";
import type { LessonStep } from "@/lib/lesson/types";

type InteractiveQuestionProps = {
  step: LessonStep;
  onCheck: (correct: boolean) => void;
  onContinue?: (meta?: LessonContinueMeta) => void;
  disabled?: boolean;
  compact?: boolean;
};

function ConceptStepView({
  step,
  onContinue,
  compact,
}: {
  step: Extract<LessonStep, { type: "concept" }>;
  onContinue?: (meta?: LessonContinueMeta) => void;
  compact?: boolean;
}) {
  const control = useMemo(
    () =>
      onContinue
        ? {
            label: "Continuar",
            onClick: () => onContinue({ completed: true }),
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
        visuals={step.visuals}
        compact={compact}
        showTitle={false}
        layout={step.layout}
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

  if (step.type === "fraction_pick") {
    return <FractionPick step={step} onCheck={onCheck} disabled={disabled} compact={compact} />;
  }

  if (step.type === "classify") {
    return <Classify step={step} onCheck={onCheck} disabled={disabled} compact={compact} />;
  }

  if (step.type === "number_line_pick") {
    return <NumberLinePick step={step} onCheck={onCheck} disabled={disabled} compact={compact} />;
  }

  return <FillInBlank step={step} onCheck={onCheck} disabled={disabled} compact={compact} />;
}
