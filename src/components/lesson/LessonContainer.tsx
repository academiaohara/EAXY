"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { TrophyIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FeedbackFooter } from "@/components/lesson/FeedbackFooter";
import { InteractiveQuestion } from "@/components/lesson/InteractiveQuestion";
import { ProgressBar } from "@/components/lesson/ProgressBar";
import type { FeedbackStatus, InteractiveLesson, LessonStep } from "@/lib/lesson/types";

const XP_PER_CORRECT = 10;
const MAX_HEARTS = 3;

type LessonContainerProps = {
  lesson: InteractiveLesson;
};

function getStepExplanation(step: LessonStep): string | undefined {
  if (step.type === "multiple_choice" || step.type === "fill_in_blank") {
    return step.explanation;
  }
  return undefined;
}

export function LessonContainer({ lesson }: LessonContainerProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [xp, setXp] = useState(0);
  const [hearts, setHearts] = useState(MAX_HEARTS);
  const [feedback, setFeedback] = useState<FeedbackStatus | null>(null);
  const [completed, setCompleted] = useState(false);

  const totalSteps = lesson.steps.length;
  const currentStep = lesson.steps[stepIndex];
  const isLastStep = stepIndex === totalSteps - 1;

  const handleCheck = useCallback(
    (correct: boolean) => {
      if (feedback !== null) {
        return;
      }

      setFeedback(correct ? "correct" : "incorrect");
      if (correct) {
        setXp((prev) => prev + XP_PER_CORRECT);
      } else {
        setHearts((prev) => Math.max(0, prev - 1));
      }
    },
    [feedback],
  );

  function handleConceptContinue() {
    if (stepIndex < totalSteps - 1) {
      setStepIndex((prev) => prev + 1);
    } else {
      setCompleted(true);
    }
  }

  function handleNext() {
    setFeedback(null);

    if (stepIndex < totalSteps - 1) {
      setStepIndex((prev) => prev + 1);
      return;
    }

    setCompleted(true);
  }

  if (completed) {
    return (
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 pb-8" data-testid="lesson-complete">
        <Card className="space-y-4 border-border bg-paper-raised p-8 text-center shadow-sm">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-100">
            <TrophyIcon className="size-8 text-emerald-600" />
          </div>
          <div className="space-y-2">
            <h1 className="font-heading text-2xl font-semibold">¡Lección completada!</h1>
            <p className="text-sm text-muted-foreground">
              Has terminado &ldquo;{lesson.title}&rdquo; con {xp} XP.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setStepIndex(0);
                setXp(0);
                setHearts(MAX_HEARTS);
                setFeedback(null);
                setCompleted(false);
              }}
            >
              Repetir lección
            </Button>
            <Button nativeButton={false} render={<Link href="/aprender" />}>
              Volver al curso
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div
      className="mx-auto flex w-full max-w-2xl flex-col gap-6 pb-32"
      data-testid="interactive-lesson"
    >
      <header className="space-y-4">
        <Link
          href="/aprender"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← Volver al curso
        </Link>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">{lesson.subtitle}</p>
          <h1 className="font-heading text-2xl font-semibold tracking-tight">{lesson.title}</h1>
        </div>
        <ProgressBar
          current={stepIndex + 1}
          total={totalSteps}
          xp={xp}
          hearts={hearts}
          maxHearts={MAX_HEARTS}
        />
      </header>

      <InteractiveQuestion
        key={currentStep.id}
        step={currentStep}
        onCheck={handleCheck}
        onContinue={handleConceptContinue}
        disabled={feedback !== null}
      />

      {feedback ? (
        <FeedbackFooter
          status={feedback}
          explanation={getStepExplanation(currentStep)}
          isLastStep={isLastStep}
          onNext={handleNext}
        />
      ) : null}
    </div>
  );
}
