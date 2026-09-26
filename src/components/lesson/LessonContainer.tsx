"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { FeedbackFooter } from "@/components/lesson/FeedbackFooter";
import { InteractiveQuestion } from "@/components/lesson/InteractiveQuestion";
import { LessonBottomBar } from "@/components/lesson/LessonBottomBar";
import { LessonFrame } from "@/components/lesson/LessonFrame";
import { LessonTutor } from "@/components/lesson/LessonTutor";
import { TutorMascot } from "@/components/tutor/tutor-mascot";
import {
  LessonStepControlProvider,
  useLessonStepControl,
} from "@/components/lesson/LessonStepControlContext";
import { getStepTutorMessage } from "@/lib/lesson/tutor-message";
import { tutorMoodForFeedback } from "@/lib/tutor/moods";
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

function LessonContainerBody({ lesson, navigation }: LessonContainerProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [feedback, setFeedback] = useState<FeedbackStatus | null>(null);
  const [completed, setCompleted] = useState(false);
  const [stars, setStars] = useState(0);
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

      if (correct) {
        setStars((prev) => prev + 1);
      }
      setFeedback(correct ? "correct" : "incorrect");
    },
    [feedback],
  );

  const handlePassiveContinue = useCallback(() => {
    if (stepIndex < totalSteps - 1) {
      setStepIndex(stepIndex + 1);
      return;
    }
    setCompleted(true);
  }, [stepIndex, totalSteps]);

  const handleNext = useCallback(() => {
    setFeedback(null);
    if (stepIndex < totalSteps - 1) {
      setStepIndex(stepIndex + 1);
      return;
    }
    setCompleted(true);
  }, [stepIndex, totalSteps]);

  function restartLesson() {
    setStepIndex(0);
    setFeedback(null);
    setCompleted(false);
    setStars(0);
  }

  if (completed) {
    return (
      <div
        className="flex h-full min-h-0 w-full items-center justify-center bg-[#eef0f3] p-4 sm:p-6"
        data-testid="lesson-complete"
      >
        <div className="w-full max-w-lg overflow-hidden rounded-2xl border-2 border-emerald-300 bg-paper-raised shadow-lg shadow-emerald-100/50">
          <div className="bg-gradient-to-b from-emerald-50 to-white px-8 pb-2 pt-10 text-center">
            <TutorMascot
              mood="celebrate"
              size={112}
              className="mx-auto"
              label="El tutor celebra que has completado la lección"
            />
          </div>
          <div className="space-y-5 px-8 pb-10 pt-6 text-center">
            <div className="space-y-2">
              <h1 className="font-heading text-2xl font-semibold">¡Lección completada!</h1>
              <p className="text-sm text-muted-foreground">
                Has terminado &ldquo;{lesson.title}&rdquo;.
              </p>
              {stars > 0 ? (
                <p className="text-sm font-medium text-emerald-700">{stars} ⭐ en esta sesión</p>
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

  const tutorMood = feedback ? tutorMoodForFeedback(feedback) : "idle";

  return (
    <div
      className="relative flex h-full min-h-0 w-full flex-1 flex-col"
      data-testid="interactive-lesson"
    >
      <h1 className="sr-only">{lesson.title}</h1>
      <p className="sr-only">{currentStep.title}</p>

      <LessonFrame
        closeHref={courseHref}
        currentStep={stepIndex + 1}
        totalSteps={totalSteps}
        stars={stars}
        feedback={feedback}
        className="min-h-0 flex-1"
      >
        <InteractiveQuestion
          key={currentStep.id}
          step={currentStep}
          onCheck={handleCheck}
          onContinue={handlePassiveContinue}
          disabled={feedback !== null}
          compact
        />
      </LessonFrame>

      {feedback ? (
        <FeedbackFooter
          variant="fixed"
          status={feedback}
          explanation={getStepExplanation(currentStep)}
          isLastStep={isLastStep}
          onNext={handleNext}
        />
      ) : control ? (
        <LessonBottomBar control={control} fixed />
      ) : null}

      <LessonTutor mood={tutorMood} message={getStepTutorMessage(currentStep)} />
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
