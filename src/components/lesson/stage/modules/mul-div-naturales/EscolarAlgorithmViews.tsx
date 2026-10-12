"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  useRegisterLessonFooterCenter,
  useRegisterLessonPresenterNavigation,
} from "@/components/lesson/LessonStepControlContext";
import { buildDivisionBoard } from "@/components/lesson/stage/modules/mul-div-naturales/division-board";
import { DivisionManoChalkboard } from "@/components/lesson/stage/modules/mul-div-naturales/DivisionManoChalkboard";
import { MultiplicacionManoChalkboard } from "@/components/lesson/stage/modules/mul-div-naturales/MultiplicacionManoChalkboard";
import { StageStepControls } from "@/components/lesson/stage/modules/mul-div-naturales/StageStepControls";

function useControllableStepPlayback({
  autoPlay,
  reduced,
  stepCount,
  onReadyChange,
  onAnimationComplete,
  intervalMs = 1400,
}: {
  autoPlay?: boolean;
  reduced: boolean;
  stepCount: number;
  onReadyChange?: (ready: boolean) => void;
  onAnimationComplete?: () => void;
  intervalMs?: number;
}) {
  const finalPhase = Math.max(0, stepCount - 1);
  const [phase, setPhaseState] = useState(reduced ? finalPhase : 0);
  const [playing, setPlaying] = useState(Boolean(autoPlay) && !reduced);
  const timerRef = useRef<number | null>(null);
  const completedRef = useRef(false);

  const notifyComplete = useCallback(() => {
    if (completedRef.current) {
      return;
    }
    completedRef.current = true;
    onReadyChange?.(true);
    onAnimationComplete?.();
  }, [onAnimationComplete, onReadyChange]);

  const setPhase = useCallback(
    (next: number) => {
      const clamped = Math.max(0, Math.min(finalPhase, next));
      setPhaseState(clamped);
      if (clamped >= finalPhase) {
        notifyComplete();
      } else {
        onReadyChange?.(false);
        completedRef.current = false;
      }
    },
    [finalPhase, notifyComplete, onReadyChange],
  );

  useEffect(() => {
    completedRef.current = false;
    if (reduced) {
      setPhaseState(finalPhase);
      setPlaying(false);
      notifyComplete();
      return;
    }
    if (!autoPlay) {
      setPhaseState(0);
      setPlaying(false);
      onReadyChange?.(false);
      return;
    }
    setPhaseState(0);
    setPlaying(true);
    onReadyChange?.(false);
  }, [autoPlay, finalPhase, notifyComplete, onReadyChange, reduced, stepCount]);

  useEffect(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (!playing || reduced || phase >= finalPhase) {
      if (phase >= finalPhase) {
        notifyComplete();
      }
      return;
    }
    timerRef.current = window.setTimeout(() => {
      setPhase(phase + 1);
    }, intervalMs);
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [finalPhase, intervalMs, notifyComplete, phase, playing, reduced, setPhase]);

  const handlePlayingChange = useCallback(
    (next: boolean) => {
      setPlaying(next);
      if (!next && phase >= finalPhase) {
        notifyComplete();
      }
    },
    [finalPhase, notifyComplete, phase],
  );

  return { phase, setPhase, playing, setPlaying: handlePlayingChange, stepCount };
}

export function DivisionManoScene({
  dividend,
  divisor,
  reduced,
  onReadyChange,
  onAnimationComplete,
}: {
  dividend: number;
  divisor: number;
  autoPlay?: boolean;
  reduced: boolean;
  onReadyChange?: (ready: boolean) => void;
  onAnimationComplete?: () => void;
}) {
  const subTotal = buildDivisionBoard(dividend, divisor)?.steps.length ?? 1;
  const { phase, setPhase, playing, setPlaying, stepCount } = useControllableStepPlayback({
    autoPlay: false,
    reduced,
    stepCount: subTotal,
    onReadyChange,
    onAnimationComplete,
    intervalMs: 1300,
  });

  useEffect(() => {
    onReadyChange?.(phase >= stepCount - 1);
  }, [onReadyChange, phase, stepCount]);

  const handleRestart = useCallback(() => {
    setPhase(0);
    setPlaying(false);
    onReadyChange?.(false);
  }, [onReadyChange, setPhase, setPlaying]);

  const advancePhase = useCallback(() => {
    setPhase(Math.min(stepCount - 1, phase + 1));
  }, [phase, setPhase, stepCount]);

  const retreatPhase = useCallback(() => {
    setPhase(Math.max(0, phase - 1));
  }, [phase, setPhase]);

  const presenterNav = useMemo(
    () => ({
      onAdvance: advancePhase,
      onRetreat: retreatPhase,
      canAdvance: phase < stepCount - 1,
      canRetreat: phase > 0,
    }),
    [advancePhase, phase, retreatPhase, stepCount],
  );
  useRegisterLessonPresenterNavigation(presenterNav);

  const footerControls = useMemo(
    () => (
      <StageStepControls
        variant="presenter"
        phase={phase}
        stepCount={stepCount}
        playing={playing}
        onPhaseChange={setPhase}
        onPlayingChange={setPlaying}
        onRestart={handleRestart}
      />
    ),
    [handleRestart, phase, playing, setPhase, setPlaying, stepCount],
  );
  useRegisterLessonFooterCenter(footerControls);

  return (
    <DivisionManoChalkboard dividend={dividend} divisor={divisor} step={phase} showProgress={false} />
  );
}

export function MultiplicacionManoScene({
  multiplicand,
  multiplier,
  subStep = 1,
  onBoardClick,
}: {
  multiplicand: number;
  multiplier: number;
  subStep?: number;
  onBoardClick?: () => void;
  autoPlay?: boolean;
  reduced?: boolean;
  onReadyChange?: (ready: boolean) => void;
  onAnimationComplete?: () => void;
}) {
  return (
    <MultiplicacionManoChalkboard
      multiplicand={multiplicand}
      multiplier={multiplier}
      subStep={subStep}
      onBoardClick={onBoardClick}
    />
  );
}
