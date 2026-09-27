"use client";

import { useCallback, useMemo, useState } from "react";
import { InteractiveQuestion } from "@/components/lesson/InteractiveQuestion";
import { LessonComplete } from "@/components/lesson/LessonComplete";
import { LessonFeedbackActions } from "@/components/lesson/LessonFeedbackActions";
import { LessonFooterDock } from "@/components/lesson/LessonFooterDock";
import { LessonFrame } from "@/components/lesson/LessonFrame";
import { LessonHelpButton } from "@/components/lesson/LessonHelpButton";
import { LessonPrimaryAction } from "@/components/lesson/LessonPrimaryAction";
import { LessonStepHeader } from "@/components/lesson/LessonStepHeader";
import { LessonTutor } from "@/components/lesson/LessonTutor";
import { TutorPanel } from "@/components/lesson/TutorPanel";
import {
  LessonStepControlProvider,
  useLessonStepControl,
} from "@/components/lesson/LessonStepControlContext";
import {
  buildHelpRoute,
  getHelpNode,
  hasHelpTopics,
  type HelpNode,
  type HelpOption,
} from "@/lib/lesson/help-route";
import {
  getFeedbackTutorMessage,
  getStepTutorMessage,
  getTutorMessage,
  getTutorReaction,
} from "@/lib/lesson/tutor-message";
import {
  appendTutorEntry,
  countTutorEntries,
  feedbackMessageKey,
  stepMessageKey,
  type TutorLogEntry,
} from "@/lib/lesson/tutor-log";
import {
  isQuizStep,
  type FeedbackStatus,
  type InteractiveLesson,
  type LessonStep,
} from "@/lib/lesson/types";
import { cn } from "@/lib/utils";

type LessonNavigationContext = {
  courseId: string;
  courseTitle: string;
  moduleTitle: string;
};

type LessonContainerProps = {
  lesson: InteractiveLesson;
  navigation?: LessonNavigationContext;
};

function stepEntry(step: LessonStep): TutorLogEntry {
  return {
    key: stepMessageKey(step.id),
    author: "tutor",
    text: getStepTutorMessage(step),
  };
}

function helpEntry(node: HelpNode, order: number): TutorLogEntry {
  return {
    key: `help:${node.id}:${order}`,
    author: "tutor",
    text: node.message,
    detail: node.detail,
    math: node.math,
  };
}

function LessonContainerBody({ lesson, navigation }: LessonContainerProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [feedback, setFeedback] = useState<FeedbackStatus | null>(null);
  const [completed, setCompleted] = useState(false);
  const [stars, setStars] = useState(0);
  const [log, setLog] = useState<TutorLogEntry[]>(() => [stepEntry(lesson.steps[0])]);
  const [panelOpen, setPanelOpen] = useState(false);
  const [unseen, setUnseen] = useState(0);
  const [helpNodeId, setHelpNodeId] = useState<string | null>(null);
  const { control } = useLessonStepControl();

  const totalSteps = lesson.steps.length;
  const currentStep = lesson.steps[stepIndex];
  const isLastStep = stepIndex === totalSteps - 1;
  const courseHref = navigation ? `/aprender/curso/${navigation.courseId}` : "/aprender";
  const totalStars = useMemo(
    () => lesson.steps.filter((step) => isQuizStep(step)).length,
    [lesson.steps],
  );

  const helpRoute = useMemo(() => buildHelpRoute(currentStep, feedback), [currentStep, feedback]);
  const helpNode = helpNodeId ? getHelpNode(helpRoute, helpNodeId) ?? null : null;
  const canAskForHelp = hasHelpTopics(helpRoute);

  /**
   * Registra lo que se dicen tutor y alumno. Lo que el tutor cuenta con el
   * panel cerrado queda pendiente y se avisa sobre la bola.
   */
  const pushEntries = useCallback(
    (entries: TutorLogEntry[]) => {
      setLog((prev) => entries.reduce(appendTutorEntry, prev));
      if (!panelOpen) {
        setUnseen((prev) => prev + countTutorEntries(entries));
      }
    },
    [panelOpen],
  );

  const openPanel = useCallback(() => {
    setPanelOpen(true);
    setUnseen(0);
  }, []);

  const closePanel = useCallback(() => {
    setPanelOpen(false);
    setUnseen(0);
  }, []);

  const handleCheck = useCallback(
    (correct: boolean) => {
      if (feedback !== null) {
        return;
      }

      const status: FeedbackStatus = correct ? "correct" : "incorrect";
      if (correct) {
        setStars((prev) => prev + 1);
      }
      setFeedback(status);
      pushEntries([
        {
          key: feedbackMessageKey(currentStep.id, status),
          author: "tutor",
          text: getFeedbackTutorMessage(status),
        },
      ]);
    },
    [currentStep.id, feedback, pushEntries],
  );

  const goToNextStep = useCallback(() => {
    setHelpNodeId(null);
    const nextStep = lesson.steps[stepIndex + 1];
    if (!nextStep) {
      setCompleted(true);
      return;
    }
    setStepIndex(stepIndex + 1);
    pushEntries([stepEntry(nextStep)]);
  }, [lesson.steps, pushEntries, stepIndex]);

  const handleNext = useCallback(() => {
    setFeedback(null);
    goToNextStep();
  }, [goToNextStep]);

  /** El alumno dice que no lo entiende: el tutor le pregunta qué parte. */
  const openHelp = useCallback(
    (trigger: string) => {
      const root = getHelpNode(helpRoute, helpRoute.rootId);
      if (!root) {
        return;
      }

      openPanel();
      setHelpNodeId(root.id);
      pushEntries([
        { key: `choice:${log.length}`, author: "student", text: trigger },
        helpEntry(root, log.length + 1),
      ]);
    },
    [helpRoute, log.length, openPanel, pushEntries],
  );

  const chooseHelpOption = useCallback(
    (option: HelpOption) => {
      const next = option.next ? getHelpNode(helpRoute, option.next) : undefined;
      const entries: TutorLogEntry[] = [
        { key: `choice:${log.length}`, author: "student", text: option.label },
      ];
      if (next) {
        entries.push(helpEntry(next, log.length + 1));
      }
      pushEntries(entries);

      setHelpNodeId(option.next);
      if (option.next === null) {
        closePanel();
      }
    },
    [closePanel, helpRoute, log.length, pushEntries],
  );

  function restartLesson() {
    setStepIndex(0);
    setFeedback(null);
    setCompleted(false);
    setStars(0);
    setLog([stepEntry(lesson.steps[0])]);
    setUnseen(0);
    setHelpNodeId(null);
    setPanelOpen(false);
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

  const reaction = getTutorReaction(currentStep, feedback);

  return (
    <div
      className={cn(
        "flex h-full min-h-0 w-full flex-1 flex-col transition-[padding] duration-300",
        panelOpen && "lg:pr-[24rem]",
      )}
      data-testid="interactive-lesson"
    >
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
            reaction={reaction}
            onOpenPanel={openPanel}
            unreadCount={unseen}
            panelOpen={panelOpen}
          />
        }
        action={
          <>
            {canAskForHelp ? (
              <LessonHelpButton
                feedback={feedback}
                onClick={() =>
                  openHelp(feedback === "incorrect" ? "Vamos a verlo" : "No lo entiendo")
                }
              />
            ) : null}
            {feedback ? (
              <LessonFeedbackActions status={feedback} isLastStep={isLastStep} onNext={handleNext} />
            ) : control ? (
              <LessonPrimaryAction control={control} />
            ) : null}
          </>
        }
      />

      <TutorPanel
        open={panelOpen}
        log={log}
        helpNode={helpNode}
        canAskForHelp={canAskForHelp}
        reaction={reaction}
        onClose={closePanel}
        onStartHelp={() => openHelp("No entiendo algo")}
        onChooseOption={chooseHelpOption}
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
