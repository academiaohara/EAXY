"use client";

import { useCallback, useMemo, useState } from "react";
import { InteractiveQuestion } from "@/components/lesson/InteractiveQuestion";
import { LessonComplete } from "@/components/lesson/LessonComplete";
import { LessonFeedbackActions } from "@/components/lesson/LessonFeedbackActions";
import { LessonFooterDock } from "@/components/lesson/LessonFooterDock";
import { LessonFrame } from "@/components/lesson/LessonFrame";
import { LessonPrimaryAction } from "@/components/lesson/LessonPrimaryAction";
import { LessonStepHeader } from "@/components/lesson/LessonStepHeader";
import { LessonTutor } from "@/components/lesson/LessonTutor";
import {
  LessonStepControlProvider,
  useLessonStepControl,
} from "@/components/lesson/LessonStepControlContext";
import { getTutorMessage, getTutorReaction } from "@/lib/lesson/tutor-message";
import { isQuizStep, type FeedbackStatus, type InteractiveLesson, type LessonStep } from "@/lib/lesson/types";

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
  const [showExplanation, setShowExplanation] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [stars, setStars] = useState(0);
  const { control } = useLessonStepControl();

  const totalSteps = lesson.steps.length;
  const currentStep = lesson.steps[stepIndex];
  const isLastStep = stepIndex === totalSteps - 1;
  const courseHref = navigation ? `/aprender/curso/${navigation.courseId}` : "/aprender";
  const totalStars = useMemo(
    () => lesson.steps.filter((step) => isQuizStep(step)).length,
    [lesson.steps],
  );

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

  const goToNextStep = useCallback(() => {
    if (stepIndex < totalSteps - 1) {
      setStepIndex(stepIndex + 1);
      return;
    }
    setCompleted(true);
  }, [stepIndex, totalSteps]);

  const handleNext = useCallback(() => {
    setFeedback(null);
    setShowExplanation(false);
    goToNextStep();
  }, [goToNextStep]);

  function restartLesson() {
    setStepIndex(0);
    setFeedback(null);
    setShowExplanation(false);
    setCompleted(false);
    setStars(0);
  }

  if (completed) {
    return (
      <LessonComplete
        lessonTitle={lesson.title}
        stars={stars}
        totalStars={totalStars}
        courseHref={courseHref}
        onRestart={restartLesson}
      />
    );
  }

  const explanation = getStepExplanation(currentStep);

  return (
    <div className="flex h-full min-h-0 w-full flex-1 flex-col" data-testid="interactive-lesson">
      <h1 className="sr-only">{lesson.title}</h1>

      <LessonFrame
        closeHref={courseHref}
        lessonTitle={lesson.title}
        currentStep={stepIndex + 1}
        totalSteps={totalSteps}
        stars={stars}
        totalStars={totalStars}
        feedback={feedback}
        className="min-h-0 flex-1"
      >
        <div
          key={currentStep.id}
          className="lesson-step-enter grid w-full gap-5 sm:gap-6 xl:grid-cols-[minmax(0,19rem)_minmax(0,1fr)] xl:gap-12"
        >
          <LessonStepHeader step={currentStep} />
          <InteractiveQuestion
            step={currentStep}
            onCheck={handleCheck}
            onContinue={goToNextStep}
            disabled={feedback !== null}
            compact
          />
        </div>
      </LessonFrame>

      <LessonFooterDock
        feedback={feedback}
        tutor={
          <LessonTutor
            message={getTutorMessage(currentStep, feedback)}
            detail={feedback && showExplanation ? explanation : undefined}
            reaction={getTutorReaction(currentStep, feedback)}
          />
        }
        action={
          feedback ? (
            <LessonFeedbackActions
              status={feedback}
              hasExplanation={Boolean(explanation)}
              explanationVisible={showExplanation}
              onToggleExplanation={() => setShowExplanation((prev) => !prev)}
              isLastStep={isLastStep}
              onNext={handleNext}
            />
          ) : control ? (
            <LessonPrimaryAction control={control} />
          ) : null
        }
      />
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
