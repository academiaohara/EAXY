"use client";

import { Button } from "@/components/ui/button";
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
};

export function InteractiveQuestion({
  step,
  onCheck,
  onContinue,
  disabled = false,
}: InteractiveQuestionProps) {
  if (step.type === "concept") {
    return (
      <div className="space-y-6" data-testid="lesson-concept-step">
        <ConceptCard
          title={step.title}
          content={step.content}
          math={step.math}
          warning={step.warning}
        />
        <Button type="button" onClick={onContinue} data-testid="lesson-continue-button">
          Continuar
        </Button>
      </div>
    );
  }

  if (step.type === "animated_solution") {
    return <AnimatedSolution step={step} onContinue={onContinue ?? (() => {})} />;
  }

  if (step.type === "interactive_tool") {
    return <InteractiveToolStepView step={step} onContinue={onContinue ?? (() => {})} />;
  }

  if (step.type === "fill_in_blank") {
    return <FillInBlank step={step} onCheck={onCheck} disabled={disabled} />;
  }

  return <MultipleChoice step={step} onCheck={onCheck} disabled={disabled} />;
}
