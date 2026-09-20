"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { CheckCircle2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FeedbackFooter } from "@/components/lesson/FeedbackFooter";
import { InteractiveQuestion } from "@/components/lesson/InteractiveQuestion";
import { LessonBreadcrumb } from "@/components/lesson/LessonBreadcrumb";
import { ProgressBar } from "@/components/lesson/ProgressBar";
import type { FeedbackStatus, InteractiveLesson, LessonStep } from "@/lib/lesson/types";

type LessonNavigationContext = {
  courseId: string;
  courseTitle: string;
  moduleTitle: string;
};

type LessonContainerProps = {
  lesson: InteractiveLesson;
  navigation?: LessonNavigationContext;
};

function getStepExplanation(step: LessonStep): string | undefined {
  if (step.type === "multiple_choice" || step.type === "fill_in_blank") {
    return step.explanation;
  }
  return undefined;
}

export function LessonContainer({ lesson, navigation }: LessonContainerProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [feedback, setFeedback] = useState<FeedbackStatus | null>(null);
  const [completed, setCompleted] = useState(false);

  const totalSteps = lesson.steps.length;
  const currentStep = lesson.steps[stepIndex];
  const isLastStep = stepIndex === totalSteps - 1;
  const courseHref = navigation ? `/aprender/curso/${navigation.courseId}` : "/aprender";

  const handleCheck = useCallback(
    (correct: boolean) => {
      if (feedback !== null) {
        return;
      }

      setFeedback(correct ? "correct" : "incorrect");
    },
    [feedback],
  );

  function advanceStep() {
    if (stepIndex < totalSteps - 1) {
      setStepIndex((prev) => prev + 1);
    } else {
      setCompleted(true);
    }
  }

  function handlePassiveContinue() {
    advanceStep();
  }

  function handleNext() {
    setFeedback(null);
    advanceStep();
  }

  function restartLesson() {
    setStepIndex(0);
    setFeedback(null);
    setCompleted(false);
  }

  if (completed) {
    return (
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 pb-8" data-testid="lesson-complete">
        <Card className="overflow-hidden border-border bg-paper-raised shadow-sm">
          <div className="bg-gradient-to-br from-emerald-500/10 via-cobalt-tint/40 to-transparent px-8 pb-2 pt-10">
            <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-100 ring-4 ring-emerald-50">
              <CheckCircle2Icon className="size-8 text-emerald-600" />
            </div>
          </div>
          <div className="space-y-4 px-8 pb-8 pt-6 text-center">
            <div className="space-y-2">
              <h1 className="font-heading text-2xl font-semibold">¡Lección completada!</h1>
              <p className="text-sm text-muted-foreground">
                Has terminado &ldquo;{lesson.title}&rdquo;.
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
              <Button type="button" variant="outline" onClick={restartLesson}>
                Repetir lección
              </Button>
              <Button nativeButton={false} render={<Link href={courseHref} />}>
                Volver al curso
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div
      className="mx-auto flex w-full max-w-3xl flex-col gap-6 pb-32"
      data-testid="interactive-lesson"
    >
      <header className="space-y-5">
        <LessonBreadcrumb
          courseId={navigation?.courseId}
          courseTitle={navigation?.courseTitle}
          moduleTitle={navigation?.moduleTitle}
        />

        <div className="overflow-hidden rounded-2xl border border-border bg-paper-raised shadow-sm">
          <div className="border-b border-border/60 bg-gradient-to-r from-cobalt-tint/70 via-paper-raised to-paper-raised px-5 py-4 sm:px-6">
            {navigation?.moduleTitle ? (
              <p className="text-xs font-medium uppercase tracking-wide text-cobalt">
                {navigation.moduleTitle}
              </p>
            ) : (
              <p className="text-xs font-medium uppercase tracking-wide text-cobalt">
                {lesson.subtitle}
              </p>
            )}
            <h1 className="mt-1 font-heading text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              {lesson.title}
            </h1>
          </div>
          <div className="px-5 py-4 sm:px-6">
            <ProgressBar current={stepIndex + 1} total={totalSteps} />
          </div>
        </div>
      </header>

      <InteractiveQuestion
        key={currentStep.id}
        step={currentStep}
        onCheck={handleCheck}
        onContinue={handlePassiveContinue}
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
