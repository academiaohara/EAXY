"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { InteractiveQuestion } from "@/components/lesson/InteractiveQuestion";
import { LessonComplete } from "@/components/lesson/LessonComplete";
import { LessonFeedbackActions } from "@/components/lesson/LessonFeedbackActions";
import { LessonFooterDock } from "@/components/lesson/LessonFooterDock";
import { LessonFrame } from "@/components/lesson/LessonFrame";
import { LessonHelpButton } from "@/components/lesson/LessonHelpButton";
import { LessonPrimaryAction } from "@/components/lesson/LessonPrimaryAction";
import { LessonStepHeader } from "@/components/lesson/LessonStepHeader";
import { LessonTutorDock } from "@/components/lesson/LessonTutorDock";
import { LessonTutorProvider } from "@/components/lesson/LessonTutorContext";
import { TutorPanel } from "@/components/lesson/TutorPanel";
import {
  LessonStepControlProvider,
  useLessonStepControl,
  type LessonContinueMeta,
} from "@/components/lesson/LessonStepControlContext";
import { getConcept } from "@/lib/lesson/concept-glossary";
import {
  buildHelpRoute,
  buildMessageHelpRoute,
  conceptNodeId,
  getHelpNode,
  hasHelpTopics,
  type HelpNode,
  type HelpOption,
} from "@/lib/lesson/help-route";
import { getTutorSpeechQueue, getTutorReaction } from "@/lib/lesson/tutor-message";
import {
  appendSpokenEntry,
  appendTutorEntry,
  speechMessageKey,
  type TutorLogEntry,
} from "@/lib/lesson/tutor-log";
import type { StepAttemptRecord, StepCheckResult } from "@/lib/lesson/step-attempt";
import {
  isQuizStep,
  type FeedbackStatus,
  type InteractiveLesson,
} from "@/lib/lesson/types";
import { LessonPersistedStateProvider } from "@/components/lesson/LessonPersistedStateContext";
import {
  clearPersistedInteractiveLesson,
  createDefaultInteractiveLessonState,
  readPersistedInteractiveLesson,
  writePersistedInteractiveLesson,
} from "@/lib/local-progress/interactive-lesson-state";
import { readLocalProgress, setLocalLessonStatus } from "@/lib/local-progress/storage";
import { cn } from "@/lib/utils";

type LessonNavigationContext = {
  courseId: string;
  courseTitle: string;
  moduleId?: string;
  moduleTitle: string;
};

type LessonContainerProps = {
  lesson: InteractiveLesson;
  navigation?: LessonNavigationContext;
  /** ID de la lección en el catálogo (para progreso local sin sesión). */
  curriculumLessonId?: string;
  /** Si true, guarda inicio/completado en localStorage. */
  trackLocalProgress?: boolean;
};

/**
 * De qué va la ayuda abierta: del paso en general (botón «No lo entiendo») o de
 * un mensaje o término concreto que el alumno ha pulsado.
 */
type HelpContext =
  | { kind: "step" }
  | { kind: "message"; entryKey: string | null; stepId: string; text: string; conceptIds: string[] };

const STEP_HELP: HelpContext = { kind: "step" };

/** Cita corta del mensaje por el que pregunta el alumno. */
function quote(text: string): string {
  const plain = text.replace(/\*\*/g, "");
  return plain.length > 70 ? `${plain.slice(0, 67).trimEnd()}…` : plain;
}

function helpEntry(node: HelpNode, order: number): TutorLogEntry {
  return {
    key: `help:${node.id}:${order}`,
    author: "tutor",
    text: node.message,
    detail: node.detail,
    math: node.math,
    visual: node.visual,
  };
}

function LessonContainerBody({
  lesson,
  navigation,
  curriculumLessonId,
  trackLocalProgress = false,
}: LessonContainerProps) {
  const stepCount = lesson.steps.length;
  const defaultLessonState = useMemo(
    () => createDefaultInteractiveLessonState(stepCount),
    [stepCount],
  );
  const [storageHydrated, setStorageHydrated] = useState(false);

  const [stepIndex, setStepIndex] = useState(defaultLessonState.stepIndex);
  const [feedback, setFeedback] = useState<FeedbackStatus | null>(null);
  const [completed, setCompleted] = useState(defaultLessonState.completed);
  const [completedSteps, setCompletedSteps] = useState(defaultLessonState.completedSteps);
  const [visitedSteps, setVisitedSteps] = useState(defaultLessonState.visitedSteps);
  const [stepAttempts, setStepAttempts] = useState<Record<string, StepAttemptRecord>>(
    defaultLessonState.stepAttempts,
  );
  const [toolState, setToolState] = useState<Record<string, unknown>>(defaultLessonState.toolState);
  const [stepRemountKey, setStepRemountKey] = useState<Record<string, number>>({});
  const [stars, setStars] = useState(defaultLessonState.stars);
  const [log, setLog] = useState<TutorLogEntry[]>([]);
  const [panelOpen, setPanelOpen] = useState(false);
  const [helpNodeId, setHelpNodeId] = useState<string | null>(null);
  const [helpContext, setHelpContext] = useState<HelpContext>(STEP_HELP);
  const { control } = useLessonStepControl();

  useEffect(() => {
    if (!storageHydrated || !trackLocalProgress || !curriculumLessonId) {
      return;
    }
    if (completed) {
      setLocalLessonStatus(curriculumLessonId, "completed");
      return;
    }
    const catalogStatus = readLocalProgress().lessons[curriculumLessonId];
    if (catalogStatus !== "completed" && catalogStatus !== "started") {
      setLocalLessonStatus(curriculumLessonId, "started");
    }
  }, [storageHydrated, trackLocalProgress, curriculumLessonId, completed]);

  useEffect(() => {
    const saved = readPersistedInteractiveLesson(lesson.slug, stepCount);
    const resumeIndex = saved.stepIndex;
    const step = lesson.steps[resumeIndex];
    /* eslint-disable react-hooks/set-state-in-effect -- rehidratar progreso desde localStorage */
    setStepIndex(resumeIndex);
    setCompleted(saved.completed);
    setCompletedSteps(saved.completedSteps);
    setVisitedSteps(saved.visitedSteps);
    setStepAttempts(saved.stepAttempts);
    setToolState(saved.toolState);
    setStars(saved.stars);
    setFeedback(step ? (saved.stepAttempts[step.id]?.feedback ?? null) : null);
    /* eslint-enable react-hooks/set-state-in-effect */
    setStorageHydrated(true);
  }, [lesson.slug, lesson.steps, stepCount]);

  useEffect(() => {
    if (!storageHydrated) {
      return;
    }
    writePersistedInteractiveLesson(lesson.slug, {
      stepIndex,
      completedSteps,
      visitedSteps,
      stepAttempts,
      stars,
      completed,
      toolState,
      updatedAt: Date.now(),
    });
  }, [
    lesson.slug,
    stepIndex,
    completedSteps,
    visitedSteps,
    stepAttempts,
    stars,
    completed,
    toolState,
    storageHydrated,
  ]);

  useEffect(() => {
    setVisitedSteps((prev) => {
      if (prev[stepIndex]) {
        return prev;
      }
      const next = [...prev];
      next[stepIndex] = true;
      return next;
    });
  }, [stepIndex]);

  const totalSteps = lesson.steps.length;
  const currentStep = lesson.steps[stepIndex];
  const isLastStep = stepIndex === totalSteps - 1;
  const courseHref = !navigation
    ? "/aprender"
    : navigation.moduleId
      ? `/aprender/curso/${navigation.courseId}/tema/${navigation.moduleId}`
      : `/aprender/curso/${navigation.courseId}`;
  const totalStars = useMemo(
    () => lesson.steps.filter((step) => isQuizStep(step)).length,
    [lesson.steps],
  );
  const stepTitles = useMemo(
    () => Object.fromEntries(lesson.steps.map((step) => [step.id, step.title])),
    [lesson.steps],
  );

  const helpRoute = useMemo(() => {
    if (helpContext.kind === "step") {
      return buildHelpRoute(currentStep, feedback);
    }
    const step = lesson.steps.find((candidate) => candidate.id === helpContext.stepId) ?? currentStep;
    const extra = helpContext.conceptIds
      .map((id) => getConcept(id))
      .filter((concept) => concept !== undefined);
    return buildMessageHelpRoute(
      step,
      step.id === currentStep.id ? feedback : null,
      helpContext.text,
      extra,
    );
  }, [currentStep, feedback, helpContext, lesson.steps]);
  const helpNode = helpNodeId ? getHelpNode(helpRoute, helpNodeId) ?? null : null;
  const stepHelpAvailable = useMemo(
    () => hasHelpTopics(buildHelpRoute(currentStep, feedback)),
    [currentStep, feedback],
  );

  /** Registra lo que se dicen tutor y alumno en el historial del panel. */
  const pushEntries = useCallback((entries: TutorLogEntry[]) => {
    setLog((prev) => entries.reduce(appendTutorEntry, prev));
  }, []);

  /** Cada frase que dice la bola queda en el historial, tal cual la dijo. */
  const handleSpeak = useCallback(
    (index: number, line: string) => {
      setLog((prev) =>
        appendSpokenEntry(prev, {
          key: speechMessageKey(currentStep.id, feedback, index),
          author: "tutor",
          text: line,
          stepId: currentStep.id,
          tone: feedback ?? undefined,
        }),
      );
    },
    [currentStep.id, feedback],
  );

  const openPanel = useCallback(() => {
    setPanelOpen(true);
  }, []);

  const closePanel = useCallback(() => {
    setPanelOpen(false);
  }, []);

  const feedbackForStep = useCallback(
    (stepId: string) => stepAttempts[stepId]?.feedback ?? null,
    [stepAttempts],
  );

  const handleCheck = useCallback(
    (result: StepCheckResult) => {
      if (feedback !== null) {
        return;
      }

      const status: FeedbackStatus = result.correct ? "correct" : "incorrect";
      if (result.correct) {
        setStars((prev) => prev + 1);
      }
      setFeedback(status);
      setStepAttempts((prev) => ({
        ...prev,
        [currentStep.id]: {
          feedback: status,
          snapshot: result.snapshot,
        },
      }));
    },
    [currentStep.id, feedback],
  );

  const goToNextStep = useCallback(
    (meta?: LessonContinueMeta) => {
      const markComplete = meta?.completed !== false;
      if (markComplete) {
        setCompletedSteps((prev) => {
          if (prev[stepIndex]) {
            return prev;
          }
          const next = [...prev];
          next[stepIndex] = true;
          return next;
        });
      }

      setHelpNodeId(null);
      setHelpContext(STEP_HELP);
      if (!lesson.steps[stepIndex + 1]) {
        setCompleted(true);
        return;
      }
      const nextStep = lesson.steps[stepIndex + 1];
      setFeedback(nextStep ? feedbackForStep(nextStep.id) : null);
      setStepIndex(stepIndex + 1);
    },
    [feedbackForStep, lesson.steps, stepIndex],
  );

  const handleNext = useCallback(() => {
    if (feedback === "correct") {
      goToNextStep({ completed: true });
      return;
    }
    setFeedback(null);
    goToNextStep({ completed: false });
  }, [feedback, goToNextStep]);

  const handleSkip = useCallback(() => {
    goToNextStep({ completed: false });
  }, [goToNextStep]);

  const goToStep = useCallback(
    (index: number) => {
      if (index < 0 || index >= totalSteps) {
        return;
      }
      const target = lesson.steps[index];
      setFeedback(feedbackForStep(target.id));
      setHelpNodeId(null);
      setHelpContext(STEP_HELP);
      setStepIndex(index);
      setCompleted(false);
    },
    [feedbackForStep, lesson.steps, totalSteps],
  );

  const resetCurrentStep = useCallback(() => {
    const stepId = currentStep.id;
    const attempt = stepAttempts[stepId];
    if (!attempt) {
      return;
    }
    if (attempt.feedback === "correct") {
      setStars((prev) => Math.max(0, prev - 1));
    }
    setStepAttempts((prev) => {
      const next = { ...prev };
      delete next[stepId];
      return next;
    });
    setCompletedSteps((prev) => {
      if (!prev[stepIndex]) {
        return prev;
      }
      const next = [...prev];
      next[stepIndex] = false;
      return next;
    });
    setFeedback(null);
    setStepRemountKey((prev) => ({ ...prev, [stepId]: (prev[stepId] ?? 0) + 1 }));
  }, [currentStep.id, stepAttempts, stepIndex]);

  const goBack = useCallback(() => {
    goToStep(stepIndex - 1);
  }, [goToStep, stepIndex]);

  useEffect(() => {
    if (!storageHydrated || !completed || !trackLocalProgress || !curriculumLessonId) {
      return;
    }
    setLocalLessonStatus(curriculumLessonId, "completed");
  }, [storageHydrated, completed, curriculumLessonId, trackLocalProgress]);

  /**
   * El alumno dice que no lo entiende: el tutor le pregunta qué parte. Con
   * `startNodeId` se salta la pregunta y va directo a esa explicación.
   */
  const openHelp = useCallback(
    (trigger: string, startNodeId?: string) => {
      const route = buildHelpRoute(currentStep, feedback);
      const start =
        (startNodeId ? getHelpNode(route, startNodeId) : undefined) ??
        getHelpNode(route, route.rootId);
      if (!start) {
        return;
      }

      openPanel();
      setHelpContext(STEP_HELP);
      setHelpNodeId(start.id);
      pushEntries([
        { key: `choice:${log.length}`, author: "student", text: trigger },
        helpEntry(start, log.length + 1),
      ]);
    },
    [currentStep, feedback, log.length, openPanel, pushEntries],
  );

  /** El alumno pulsa un mensaje del historial para que el tutor se lo explique. */
  const askAboutEntry = useCallback(
    (entry: TutorLogEntry) => {
      if (!entry.stepId) {
        return;
      }
      const step = lesson.steps.find((candidate) => candidate.id === entry.stepId);
      if (!step) {
        return;
      }
      const route = buildMessageHelpRoute(
        step,
        step.id === currentStep.id ? feedback : null,
        entry.text,
      );
      const root = getHelpNode(route, route.rootId);
      if (!root) {
        return;
      }

      setHelpContext({
        kind: "message",
        entryKey: entry.key,
        stepId: step.id,
        text: entry.text,
        conceptIds: [],
      });
      setHelpNodeId(root.id);
      pushEntries([
        { key: `ask:${log.length}`, author: "student", text: `Explícame esto: «${quote(entry.text)}»` },
        helpEntry(root, log.length + 1),
      ]);
    },
    [currentStep.id, feedback, lesson.steps, log.length, pushEntries],
  );

  /** El alumno pulsa un término resaltado de la teoría. */
  const askAboutConcept = useCallback(
    (conceptId: string, term: string) => {
      const concept = getConcept(conceptId);
      if (!concept) {
        return;
      }
      const route = buildMessageHelpRoute(currentStep, feedback, term, [concept]);
      const node = getHelpNode(route, conceptNodeId(concept.id));
      if (!node) {
        return;
      }

      openPanel();
      setHelpContext({
        kind: "message",
        entryKey: null,
        stepId: currentStep.id,
        text: term,
        conceptIds: [concept.id],
      });
      setHelpNodeId(node.id);
      pushEntries([
        { key: `term:${log.length}`, author: "student", text: concept.question },
        helpEntry(node, log.length + 1),
      ]);
    },
    [currentStep, feedback, log.length, openPanel, pushEntries],
  );

  const chooseHelpOption = useCallback(
    (option: HelpOption) => {
      const next = option.next ? getHelpNode(helpRoute, option.next) : undefined;
      const entries: TutorLogEntry[] = [
        { key: `choice:${log.length}`, author: "student", text: option.label },
      ];
      if (next) {
        entries.push(helpEntry(next, log.length + 1));
      } else if (option.next === null && helpContext.kind === "message") {
        entries.push({
          key: `done:${log.length + 1}`,
          author: "tutor",
          text: "¡Genial! Si te surge otra duda, pulsa cualquier mensaje.",
        });
      }
      pushEntries(entries);

      setHelpNodeId(option.next);
      if (option.next === null) {
        if (helpContext.kind === "step") {
          closePanel();
        }
        setHelpContext(STEP_HELP);
      }
    },
    [closePanel, helpContext.kind, helpRoute, log.length, pushEntries],
  );

  const tutorActions = useMemo(() => ({ askAboutConcept }), [askAboutConcept]);

  function restartLesson() {
    clearPersistedInteractiveLesson(lesson.slug);
    setStepIndex(0);
    setFeedback(null);
    setCompleted(false);
    setStars(0);
    setLog([]);
    setHelpNodeId(null);
    setHelpContext(STEP_HELP);
    setPanelOpen(false);
    setCompletedSteps(lesson.steps.map(() => false));
    setStepAttempts({});
    setToolState({});
    setStepRemountKey({});
    setVisitedSteps(() => {
      const initial = lesson.steps.map(() => false);
      initial[0] = true;
      return initial;
    });
  }

  const incompleteSteps = useMemo(
    () =>
      lesson.steps
        .map((step, index) => ({ index, title: step.title, done: completedSteps[index] }))
        .filter((entry) => !entry.done),
    [completedSteps, lesson.steps],
  );

  if (!storageHydrated) {
    return (
      <div
        className="flex min-h-0 flex-1 flex-col items-center justify-center p-8"
        data-testid="interactive-lesson"
      >
        <p className="text-sm text-ink-muted">Recuperando tu progreso…</p>
      </div>
    );
  }

  if (completed) {
    return (
      <LessonComplete
        lessonTitle={lesson.title}
        stars={stars}
        totalStars={totalStars}
        courseHref={courseHref}
        onRestart={restartLesson}
        incompleteSteps={incompleteSteps}
        onJumpToStep={(index) => {
          setCompleted(false);
          const target = lesson.steps[index];
          setFeedback(target ? feedbackForStep(target.id) : null);
          setStepIndex(index);
          setVisitedSteps((prev) => {
            const next = [...prev];
            next[index] = true;
            return next;
          });
        }}
      />
    );
  }

  const reaction = getTutorReaction(currentStep, feedback);
  const wideStep =
    currentStep.layout === "split" ||
    (currentStep.type === "interactive_tool" && currentStep.layout === undefined);
  const hasWhy = feedback === "correct" && Boolean(getHelpNode(buildHelpRoute(currentStep, feedback), "why"));
  const currentAttempt = stepAttempts[currentStep.id];
  const canResetStep = isQuizStep(currentStep) && currentAttempt !== undefined;
  const stepMountKey = `${currentStep.id}:${stepRemountKey[currentStep.id] ?? 0}`;

  return (
    <LessonPersistedStateProvider toolState={toolState} onToolStateChange={setToolState}>
      <LessonTutorProvider value={tutorActions}>
      <div
        className={cn(
          "flex h-full min-h-0 w-full flex-1 flex-col transition-[padding] duration-300",
          panelOpen && "lg:pl-[24rem]",
        )}
        data-testid="interactive-lesson"
      >
        <h1 className="sr-only">{lesson.title}</h1>

        <LessonFrame
          closeHref={courseHref}
          lessonTitle={lesson.title}
          currentStep={stepIndex + 1}
          currentStepIndex={stepIndex}
          totalSteps={totalSteps}
          completedSteps={completedSteps}
          visitedSteps={visitedSteps}
          onGoToStep={goToStep}
          stars={stars}
          totalStars={totalStars}
          feedback={feedback}
          className="min-h-0 flex-1"
          tutorPanelOpen={panelOpen}
          overlay={
            <LessonTutorDock
              speechKey={`${currentStep.id}:${feedback ?? "none"}`}
              messages={getTutorSpeechQueue(currentStep, feedback)}
              reaction={reaction}
              onOpenPanel={openPanel}
              onSpeak={handleSpeak}
              panelOpen={panelOpen}
            />
          }
          footer={
            <LessonFooterDock
              feedback={feedback}
              canBack={stepIndex > 0}
              onBack={goBack}
              onSkip={feedback ? undefined : handleSkip}
              action={
                feedback ? (
                  <LessonFeedbackActions
                    status={feedback}
                    isLastStep={isLastStep}
                    onNext={handleNext}
                    onReset={canResetStep ? resetCurrentStep : undefined}
                    onHelp={
                      stepHelpAvailable
                        ? () =>
                            feedback === "correct"
                              ? openHelp("¿Por qué?", hasWhy ? "why" : undefined)
                              : openHelp("Ayúdame, no lo veo")
                        : undefined
                    }
                  />
                ) : control ? (
                  <LessonPrimaryAction control={control} />
                ) : null
              }
              help={
                stepHelpAvailable && !feedback ? (
                  <LessonHelpButton feedback={feedback} onClick={() => openHelp("No lo entiendo")} />
                ) : null
              }
            />
          }
        >
          <div
            key={stepMountKey}
            className={cn(
              "lesson-step-enter mx-auto flex w-full flex-col gap-6 pb-24 sm:gap-7",
              wideStep ? "max-w-6xl" : "max-w-4xl",
            )}
          >
            <LessonStepHeader step={currentStep} />
            <InteractiveQuestion
              step={currentStep}
              onCheck={handleCheck}
              onContinue={goToNextStep}
              disabled={feedback !== null}
              savedAttempt={currentAttempt?.snapshot ?? null}
              compact
            />
          </div>
        </LessonFrame>

        <TutorPanel
          open={panelOpen}
          log={log}
          stepTitles={stepTitles}
          helpNode={helpNode}
          canAskForHelp={stepHelpAvailable}
          reaction={reaction}
          activeEntryKey={helpNode && helpContext.kind === "message" ? helpContext.entryKey : null}
          onClose={closePanel}
          onStartHelp={() => openHelp("No entiendo algo")}
          onChooseOption={chooseHelpOption}
          onAskAbout={askAboutEntry}
        />
      </div>
    </LessonTutorProvider>
    </LessonPersistedStateProvider>
  );
}

export function LessonContainer(props: LessonContainerProps) {
  return (
    <LessonStepControlProvider>
      <LessonContainerBody {...props} />
    </LessonStepControlProvider>
  );
}
