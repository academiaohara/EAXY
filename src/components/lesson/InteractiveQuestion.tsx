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
import type { PracticeStepSnapshot, StepCheckResult } from "@/lib/lesson/step-attempt";
import {
  ExploreStepView,
  NarrateStepView,
  PredictStepView,
  RevealStepView,
} from "@/components/lesson/steps/StageSteps";
import type { LessonStageTheme, LessonStep } from "@/lib/lesson/types";

type InteractiveQuestionProps = {
  step: LessonStep;
  onCheck: (result: StepCheckResult) => void;
  onContinue?: (meta?: LessonContinueMeta) => void;
  disabled?: boolean;
  compact?: boolean;
  savedAttempt?: PracticeStepSnapshot | null;
  stageTheme?: LessonStageTheme;
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
  savedAttempt = null,
  stageTheme = "paper",
}: InteractiveQuestionProps) {
  if (step.type === "narrate") {
    return (
      <NarrateStepView
        step={step}
        theme={stageTheme}
        onContinue={() => onContinue?.({ completed: true })}
      />
    );
  }

  if (step.type === "predict") {
    return (
      <PredictStepView
        step={step}
        theme={stageTheme}
        onCheck={onCheck}
        disabled={disabled}
        saved={savedAttempt?.kind === "predict" ? savedAttempt : null}
      />
    );
  }

  if (step.type === "explore") {
    return (
      <ExploreStepView
        step={step}
        theme={stageTheme}
        onCheck={onCheck}
        disabled={disabled}
        saved={savedAttempt?.kind === "explore" ? savedAttempt : null}
      />
    );
  }

  if (step.type === "reveal") {
    return (
      <RevealStepView
        step={step}
        theme={stageTheme}
        onContinue={() => onContinue?.({ completed: true })}
      />
    );
  }

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
    return (
      <FractionPick
        step={step}
        onCheck={onCheck}
        disabled={disabled}
        compact={compact}
        saved={savedAttempt?.kind === "fraction_pick" ? savedAttempt : null}
      />
    );
  }

  if (step.type === "classify") {
    return (
      <Classify
        step={step}
        onCheck={onCheck}
        disabled={disabled}
        compact={compact}
        saved={savedAttempt?.kind === "classify" ? savedAttempt : null}
      />
    );
  }

  if (step.type === "number_line_pick") {
    return (
      <NumberLinePick
        step={step}
        onCheck={onCheck}
        disabled={disabled}
        compact={compact}
        saved={savedAttempt?.kind === "number_line_pick" ? savedAttempt : null}
      />
    );
  }

  return (
    <FillInBlank
      step={step}
      onCheck={onCheck}
      disabled={disabled}
      compact={compact}
      saved={savedAttempt?.kind === "fill_in_blank" ? savedAttempt : null}
    />
  );
}
