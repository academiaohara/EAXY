"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Lesson, Step, CheckResult, WidgetAnswer } from "@/lib/lesson-schema";
import {
  checkWidgetAnswer,
  canAdvanceStep,
  stepRequiresCheck,
} from "@/lib/lesson-engine";
import { getLessonProgress, saveLessonProgress } from "@/lib/progress";
import { MathContent } from "@/lib/math";
import { LessonActionBar } from "@/components/layout";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Button } from "@/components/ui/Button";
import { FeedbackPanel } from "@/components/lesson/FeedbackPanel";
import { TapSelect, SliderExplore, FractionBar } from "@/components/widgets";

interface LessonPlayerProps {
  lesson: Lesson;
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

export function LessonPlayer({ lesson }: LessonPlayerProps) {
  const saved = getLessonProgress(lesson.slug);
  const [stepIndex, setStepIndex] = useState(saved?.currentStepIndex ?? 0);
  const [answer, setAnswer] = useState<WidgetAnswer | null>(null);
  const [checkResult, setCheckResult] = useState<CheckResult | null>(null);
  const [hintIndex, setHintIndex] = useState(0);
  const [completedStepIds, setCompletedStepIds] = useState<string[]>(
    saved?.completedStepIds ?? [],
  );
  const [finished, setFinished] = useState(false);

  const step = lesson.steps[stepIndex];

  useEffect(() => {
    setAnswer(getInitialAnswer(step));
    setCheckResult(null);
    setHintIndex(0);
  }, [step]);

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
      setStepIndex(nextIndex);
      persistProgress(nextIndex, [
        ...new Set([...completedStepIds, step.id]),
      ]);
    } else {
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
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-6 px-2 py-10 text-center sm:py-12"
      >
        <div className="text-5xl sm:text-6xl">🎉</div>
        <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
          ¡Lección completada!
        </h2>
        <p className="max-w-md text-sm text-slate-600 sm:text-base">
          Has terminado &ldquo;{lesson.title}&rdquo;. Sigue practicando para
          afianzar lo aprendido.
        </p>
        <Link
          href="/"
          className="touch-target inline-flex min-h-11 items-center justify-center rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700 sm:min-h-12 sm:text-base"
        >
          Volver al inicio
        </Link>
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col gap-5 sm:gap-6">
      <ProgressBar current={stepIndex + 1} total={lesson.steps.length} />

      <div className="flex flex-1 flex-col gap-5 pb-2 sm:gap-6 md:pb-0">
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
              <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
                {step.title}
              </h2>
            )}

            <MathContent content={step.content} />

            {step.widget && (
              <div className="mt-2 sm:mt-4">{renderWidget()}</div>
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
          >
            Comprobar
          </Button>
        )}

        {(!needsCheck || checkResult?.correct) && (
          <Button onClick={handleNext} disabled={!canAdvance} fullWidth>
            {isLastStep ? "Finalizar" : "Continuar"}
          </Button>
        )}
      </LessonActionBar>
    </div>
  );
}
