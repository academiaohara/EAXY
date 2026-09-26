"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { CheckCircle2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FeedbackFooter } from "@/components/lesson/FeedbackFooter";
import { InteractiveQuestion } from "@/components/lesson/InteractiveQuestion";
import { LessonFrame } from "@/components/lesson/LessonFrame";
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
  const [stars, setStars] = useState(0);

  const totalSteps = lesson.steps.length;
  const currentStep = lesson.steps[stepIndex];
  const isLastStep = stepIndex === totalSteps - 1;
  const courseHref = navigation ? `/aprender/curso/${navigation.courseId}` : "/aprender";

  const handleCheck = useCallback(
    (correct: boolean) => {
      if (feedback !== null) {
        return;
      }

      if (correct) {
        setStars((prev) => prev + 1);
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
    setStars(0);
  }

  if (completed) {
    return (
      <div className="mx-auto w-full max-w-2xl pb-8" data-testid="lesson-complete">
        <div className="overflow-hidden rounded-2xl border-2 border-emerald-300 bg-paper-raised shadow-lg shadow-emerald-100/50">
          <div className="bg-gradient-to-b from-emerald-50 to-white px-8 pb-2 pt-12 text-center">
            <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-emerald-100 ring-4 ring-emerald-50">
              <CheckCircle2Icon className="size-10 text-emerald-600" />
            </div>
          </div>
          <div className="space-y-5 px-8 pb-10 pt-6 text-center">
            <div className="space-y-2">
              <h1 className="font-heading text-2xl font-semibold">¡Lección completada!</h1>
              <p className="text-sm text-muted-foreground">
                Has terminado &ldquo;{lesson.title}&rdquo;.
              </p>
              {stars > 0 ? (
                <p className="text-sm font-medium text-emerald-700">
                  {stars} ⭐ en esta sesión
                </p>
              ) : null}
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
              <Button type="button" variant="outline" className="rounded-full" onClick={restartLesson}>
                Repetir lección
              </Button>
              <Button
                nativeButton={false}
                className="rounded-full"
                render={<Link href={courseHref} />}
              >
                Volver al curso
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="mx-auto w-full max-w-2xl pb-32"
      data-testid="interactive-lesson"
    >
      <h1 className="sr-only">{lesson.title}</h1>

      <LessonFrame
        closeHref={courseHref}
        currentStep={stepIndex + 1}
        totalSteps={totalSteps}
        stars={stars}
        feedback={feedback}
      >
        <InteractiveQuestion
          key={currentStep.id}
          step={currentStep}
          onCheck={handleCheck}
          onContinue={handlePassiveContinue}
          disabled={feedback !== null}
          feedback={feedback}
        />
      </LessonFrame>

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
