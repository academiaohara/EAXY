"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { CheckCircle2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FeedbackFooter } from "@/components/lesson/FeedbackFooter";
import { InteractiveQuestion } from "@/components/lesson/InteractiveQuestion";
import { LessonBottomBar } from "@/components/lesson/LessonBottomBar";
import { LessonBreadcrumb } from "@/components/lesson/LessonBreadcrumb";
import {
  LessonStepControlProvider,
  useLessonStepControl,
} from "@/components/lesson/LessonStepControlContext";
import { ProgressBar } from "@/components/lesson/ProgressBar";
import { StepPhaseBadge } from "@/components/lesson/StepPhaseBadge";
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

function LessonContainerBody({
  lesson,
  navigation,
}: LessonContainerProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [feedback, setFeedback] = useState<FeedbackStatus | null>(null);
  const [completed, setCompleted] = useState(false);
  const { control } = useLessonStepControl();

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
      <div
        className="mx-auto flex h-full w-full max-w-4xl items-center justify-center p-4 sm:p-6"
        data-testid="lesson-complete"
      >
        <Card className="w-full max-w-lg overflow-hidden border-border bg-paper-raised shadow-sm">
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
      className="mx-auto flex h-full min-h-0 w-full max-w-4xl flex-col gap-3 p-4 sm:gap-4 sm:p-6"
      data-testid="interactive-lesson"
    >
      <header className="shrink-0 space-y-2">
        <LessonBreadcrumb
          courseId={navigation?.courseId}
          courseTitle={navigation?.courseTitle}
          moduleTitle={navigation?.moduleTitle}
        />

        <div className="overflow-hidden rounded-xl border border-border bg-paper-raised shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border/60 bg-gradient-to-r from-cobalt-tint/70 via-paper-raised to-paper-raised px-4 py-3 sm:px-5">
            <div className="min-w-0 space-y-1">
              {navigation?.moduleTitle ? (
                <p className="text-[11px] font-medium uppercase tracking-wide text-cobalt">
                  {navigation.moduleTitle}
                </p>
              ) : (
                <p className="text-[11px] font-medium uppercase tracking-wide text-cobalt">
                  {lesson.subtitle}
                </p>
              )}
              <h1 className="font-heading text-lg font-semibold tracking-tight text-ink sm:text-xl">
                {lesson.title}
              </h1>
            </div>
            <StepPhaseBadge step={currentStep} />
          </div>
          <div className="px-4 py-2 sm:px-5">
            <ProgressBar current={stepIndex + 1} total={totalSteps} />
          </div>
        </div>
      </header>

      <section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-border bg-paper-raised shadow-sm">
        <div className="shrink-0 border-b border-border/60 px-4 py-2 sm:px-5">
          <h2 className="font-heading text-base font-medium text-ink">{currentStep.title}</h2>
        </div>

        <div className="min-h-0 flex-1 overflow-hidden">
          <div className="h-full overflow-hidden px-4 py-3 sm:px-5 sm:py-4">
            <InteractiveQuestion
              key={currentStep.id}
              step={currentStep}
              onCheck={handleCheck}
              onContinue={handlePassiveContinue}
              disabled={feedback !== null}
              compact
            />
          </div>
        </div>

        {feedback ? (
          <FeedbackFooter
            variant="docked"
            status={feedback}
            explanation={getStepExplanation(currentStep)}
            isLastStep={isLastStep}
            onNext={handleNext}
          />
        ) : control ? (
          <LessonBottomBar control={control} />
        ) : null}
      </section>
    </div>
  );
}

export function LessonContainer(props: LessonContainerProps) {
  return (
    <LessonStepControlProvider>
      <LessonContainerBody {...props} />
    </LessonStepControlProvider>
  );
}
