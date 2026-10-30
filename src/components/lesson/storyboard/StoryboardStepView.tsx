"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  useRegisterLessonPresenterNavigation,
  useRegisterLessonStepControl,
  type LessonContinueMeta,
} from "@/components/lesson/LessonStepControlContext";
import { buildSlideAnim } from "@/components/lesson/anim/registry";
import { StageStepControls } from "@/components/lesson/stage/modules/mul-div-naturales/StageStepControls";
import { StoryboardNarration } from "@/components/lesson/storyboard/StoryboardNarration";
import { useReducedMotion } from "@/lib/lesson/stage/use-reduced-motion";
import type { StoryboardStep } from "@/lib/lesson/types";

type StoryboardStepViewProps = {
  step: StoryboardStep;
  onContinue?: (meta?: LessonContinueMeta) => void;
  presentationUnlocked?: boolean;
};

export function StoryboardStepView({
  step,
  onContinue,
  presentationUnlocked = false,
}: StoryboardStepViewProps) {
  const reduced = useReducedMotion();
  const total = Math.max(1, step.phases.length);
  const [phase, setPhase] = useState(0);
  const [playing, setPlaying] = useState(step.autoplay ?? true);
  const built = useMemo(
    () => buildSlideAnim(step.scene, step.params, step.phases.map((item) => item.text)),
    [step.params, step.phases, step.scene],
  );

  const goTo = useCallback(
    (next: number) => setPhase(Math.min(total - 1, Math.max(0, next))),
    [total],
  );
  const isPlaying = playing && !reduced && phase < total - 1;

  useEffect(() => {
    if (!isPlaying) {
      return;
    }
    const timer = window.setTimeout(() => goTo(phase + 1), step.beatMs ?? 3200);
    return () => window.clearTimeout(timer);
  }, [goTo, isPlaying, phase, step.beatMs]);

  const handlePhase = useCallback(
    (next: number) => {
      setPlaying(false);
      goTo(next);
    },
    [goTo],
  );
  const handleRestart = useCallback(() => {
    goTo(0);
    setPlaying(!reduced);
  }, [goTo, reduced]);

  const complete = phase >= total - 1 || presentationUnlocked;
  const control = useMemo(
    () =>
      complete && onContinue
        ? {
            label: "Continuar",
            onClick: () => onContinue({ completed: true }),
            testId: "lesson-continue-button",
            onBack: phase > 0 ? () => handlePhase(phase - 1) : undefined,
          }
        : null,
    [complete, handlePhase, onContinue, phase],
  );
  useRegisterLessonStepControl(control);
  useRegisterLessonPresenterNavigation(
    useMemo(
      () => ({
        onAdvance: () => handlePhase(phase + 1),
        onRetreat: () => handlePhase(phase - 1),
        canAdvance: phase < total - 1,
        canRetreat: phase > 0,
      }),
      [handlePhase, phase, total],
    ),
  );

  const activePhase = step.phases[phase] ?? { text: "" };

  return (
    <section className="w-full" data-testid="lesson-storyboard" data-phase={phase}>
      <div className="grid w-full items-stretch gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(18rem,1fr)] lg:gap-8">
        <div className="relative flex min-h-[22rem] items-center justify-center overflow-hidden lg:min-h-[30rem]" role="img" aria-label={built.label}>
          {built.render(phase)}
        </div>
        <div className="flex min-w-0 flex-col justify-between">
          <StoryboardNarration phase={activePhase} />
          <div className="flex items-center justify-between gap-3 border-t border-[color:var(--stage-border,#334155)] px-1 pt-4 lg:px-6">
            <span className="text-xs font-semibold tracking-wide text-[color:var(--stage-muted,#94a3b8)]">
              Idea {phase + 1} de {total}
            </span>
            <StageStepControls
              variant="presenter"
              phase={phase}
              stepCount={total}
              playing={isPlaying}
              onPhaseChange={handlePhase}
              onPlayingChange={setPlaying}
              onRestart={handleRestart}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
