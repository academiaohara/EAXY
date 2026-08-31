"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Lesson, Step, CheckResult, WidgetAnswer } from "@/lib/lesson-schema";
import {
  checkWidgetAnswer,
  canAdvanceStep,
  stepRequiresCheck,
} from "@/lib/lesson-engine";
import { getLessonProgress, saveLessonProgress } from "@/lib/progress";
import {
  awardLessonStars,
  calculateLessonStars,
} from "@/lib/gamification";
import { MathContent } from "@/lib/math";
import { LessonActionBar } from "@/components/layout";
import { Button } from "@/components/ui/Button";
import { FeedbackPanel } from "@/components/lesson/FeedbackPanel";
import { LessonProgressHeader } from "@/components/lesson/LessonProgressHeader";
import { LessonComplete } from "@/components/lesson/LessonComplete";
import { TapSelect, SliderExplore, FractionBar } from "@/components/widgets";

interface LessonPlayerProps {
  lesson: Lesson;
  courseId?: string;
  topicId?: string;
  nextLessonSlug?: string | null;
  backHref?: string;
}

function getInitialAnswer(step: Step): WidgetAnswer | null {
  if (!step.widget) return null;

  switch (step.widget.type) {
    case "tap_select":
      return { type: "tap_select", selectedId: null };
    case "slider_explore":
      return { type: "slider_explore", value: step.widget.initial };
    case "fraction_bar":
      return { type: "fraction_bar", shadedParts: 0 };
    default:
      return null;
  }
}

export function LessonPlayer({
  lesson,
  courseId,
  topicId,
  nextLessonSlug,
  backHref = "/rutas",
}: LessonPlayerProps) {
  const saved = getLessonProgress(lesson.slug);
  const initialStep = lesson.steps[saved?.currentStepIndex ?? 0];
  const [stepIndex, setStepIndex] = useState(saved?.currentStepIndex ?? 0);
  const [answer, setAnswer] = useState<WidgetAnswer | null>(() =>
    getInitialAnswer(initialStep),
  );
  const [checkResult, setCheckResult] = useState<CheckResult | null>(null);
  const [hintIndex, setHintIndex] = useState(0);
  const [incorrectAttempts, setIncorrectAttempts] = useState(0);
  const [completedStepIds, setCompletedStepIds] = useState<string[]>(
    saved?.completedStepIds ?? [],
  );
  const [finished, setFinished] = useState(false);
  const [earnedStars, setEarnedStars] = useState(0);

  const step = lesson.steps[stepIndex];

  const goToStep = (nextIndex: number) => {
    const nextStep = lesson.steps[nextIndex];
    setStepIndex(nextIndex);
    setAnswer(getInitialAnswer(nextStep));
    setCheckResult(null);
    setHintIndex(0);
  };

  const persistProgress = useCallback(
    (newStepIndex: number, newCompleted: string[]) => {
      saveLessonProgress(lesson.slug, {
        completedStepIds: newCompleted,
        currentStepIndex: newStepIndex,
        completedAt:
          newCompleted.length === lesson.steps.length
            ? new Date().toISOString()
            : undefined,
      });
    },
    [lesson.slug, lesson.steps.length],
  );

  const handleCheck = () => {
    if (!step.widget || !answer) return;
    const result = checkWidgetAnswer(step.widget, answer);
    setCheckResult(result);
    if (!result.correct) {
      setIncorrectAttempts((n) => n + 1);
    }
    if (result.correct && !completedStepIds.includes(step.id)) {
      const updated = [...completedStepIds, step.id];
      setCompletedStepIds(updated);
      persistProgress(stepIndex, updated);
    }
  };

  const handleNext = () => {
    if (!canAdvanceStep(step, checkResult)) return;

    if (!completedStepIds.includes(step.id)) {
      const updated = [...completedStepIds, step.id];
      setCompletedStepIds(updated);
    }

    if (stepIndex < lesson.steps.length - 1) {
      const nextIndex = stepIndex + 1;
      const updated = [...new Set([...completedStepIds, step.id])];
      persistProgress(nextIndex, updated);
      goToStep(nextIndex);
    } else {
      const stars = calculateLessonStars(hintIndex, incorrectAttempts);
      setEarnedStars(stars);
      awardLessonStars(stars);
      setFinished(true);
      persistProgress(stepIndex, [
        ...new Set([...completedStepIds, step.id]),
      ]);
    }
  };

  const needsCheck = stepRequiresCheck(step);
  const canAdvance = canAdvanceStep(step, checkResult);
  const isLastStep = stepIndex === lesson.steps.length - 1;

  const renderWidget = () => {
    if (!step.widget || !answer) return null;

    switch (step.widget.type) {
      case "tap_select":
        return (
          <TapSelect
            widget={step.widget}
            selectedId={
              answer.type === "tap_select" ? answer.selectedId : null
            }
            onSelect={(id) => {
              setAnswer({ type: "tap_select", selectedId: id });
              setCheckResult(null);
            }}
            disabled={checkResult?.correct === true}
            showResult={checkResult !== null}
            correctId={step.widget.correctOptionId}
          />
        );
      case "slider_explore":
        return (
          <SliderExplore
            widget={step.widget}
            value={answer.type === "slider_explore" ? answer.value : step.widget.initial}
            onChange={(value) => {
              setAnswer({ type: "slider_explore", value });
              setCheckResult(null);
            }}
            disabled={checkResult?.correct === true}
          />
        );
      case "fraction_bar":
        return (
          <FractionBar
            widget={step.widget}
            shadedParts={
              answer.type === "fraction_bar" ? answer.shadedParts : 0
            }
            onShadeChange={(parts) => {
              setAnswer({ type: "fraction_bar", shadedParts: parts });
              setCheckResult(null);
            }}
            disabled={checkResult?.correct === true}
            showResult={checkResult !== null}
          />
        );
      default:
        return null;
    }
  };

  if (finished) {
    return (
      <LessonComplete
        lessonTitle={lesson.title}
        stars={earnedStars}
        courseId={courseId}
        topicId={topicId}
        nextLessonSlug={nextLessonSlug}
      />
    );
  }

  return (
    <div className="flex flex-col gap-5 sm:gap-6">
      <header className="flex items-center gap-3 sm:gap-4">
        <Link
          href={backHref}
          className="touch-target flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100"
          aria-label="Salir de la lección"
        >
          ✕
        </Link>

        <div className="min-w-0 flex-1">
          <LessonProgressHeader
            current={stepIndex + 1}
            total={lesson.steps.length}
          />
        </div>
      </header>

      <div className="rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm sm:p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-5 sm:space-y-6"
          >
            {step.title && (
              <h2 className="text-center text-lg font-bold text-slate-900 sm:text-xl">
                {step.title}
              </h2>
            )}

            <MathContent content={step.content} className="text-center" />

            {step.widget && (
              <div className="mt-2 flex justify-center sm:mt-4">
                {renderWidget()}
              </div>
            )}

            {checkResult && (
              <FeedbackPanel
                result={checkResult}
                hintIndex={hintIndex}
                onShowHint={() => setHintIndex((i) => i + 1)}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <LessonActionBar>
        {needsCheck && !checkResult?.correct && (
          <Button
            onClick={handleCheck}
            disabled={
              !answer ||
              (answer.type === "tap_select" && !answer.selectedId)
            }
            fullWidth
            className="!rounded-2xl !bg-slate-200 !text-slate-700 hover:!bg-slate-300 disabled:!bg-slate-100"
          >
            Comprobar
          </Button>
        )}

        {checkResult && !checkResult.correct && (
          <Button
            variant="secondary"
            onClick={() => setHintIndex((i) => i + 1)}
            className="!rounded-2xl"
          >
            ¿Por qué?
          </Button>
        )}

        {(!needsCheck || checkResult?.correct) && (
          <Button
            onClick={handleNext}
            disabled={!canAdvance}
            fullWidth
            className="!rounded-2xl !bg-emerald-500 hover:!bg-emerald-600 disabled:!bg-slate-200 disabled:!text-slate-400"
          >
            {isLastStep ? "Finalizar" : "Continuar"}
          </Button>
        )}
      </LessonActionBar>
    </div>
  );
}
