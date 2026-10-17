"use client";

import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  useRegisterLessonFooterCenter,
  useRegisterLessonPresenterNavigation,
} from "@/components/lesson/LessonStepControlContext";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { DrawnArrow } from "@/components/lesson/stage/modules/mul-div-naturales/chalkboard-shared";
import { StageStepControls } from "@/components/lesson/stage/modules/mul-div-naturales/StageStepControls";
import type { NumeracionCallout, NumeracionCalloutKind } from "@/lib/lesson/types";
import { useReducedMotion } from "@/lib/lesson/stage/use-reduced-motion";
import { cn } from "@/lib/utils";

/** Paleta Manim sobre pizarra (fija en toda la lección). */
export const AMBER = "#ffd866";
export const TEAL = "#5eead4";
export const BLUE = "#7dd3fc";
export const VIOLET = "#a78bfa";
export const INK = "#e8edf5";
export const MUTED = "#94a3b8";
export const ROSE = "#fb7185";
export const SMOOTH = "cubic-bezier(.65,0,.35,1)";

export const ENTER = "animate-in fade-in fill-mode-both motion-reduce:animate-none";

const CALLOUT_BORDER: Record<NumeracionCalloutKind, string> = {
  definicion: AMBER,
  ojo: ROSE,
  regla: TEAL,
  pregunta: VIOLET,
};

export function fmt(n: number): string {
  const s = String(n);
  return n < 10000 ? s : s.replace(/\B(?=(\d{3})+(?!\d))/g, "\u00a0");
}

export function useAppeared(): boolean {
  const [appeared, setAppeared] = useState(false);
  useEffect(() => {
    let second = 0;
    const first = requestAnimationFrame(() => {
      second = requestAnimationFrame(() => setAppeared(true));
    });
    return () => {
      cancelAnimationFrame(first);
      cancelAnimationFrame(second);
    };
  }, []);
  return appeared;
}

export function useNumeracionPhases({
  stepCount,
  onReadyChange,
  intervalMs = 2600,
}: {
  stepCount: number;
  onReadyChange?: (ready: boolean) => void;
  intervalMs?: number;
}) {
  const reduced = useReducedMotion();
  const finalPhase = Math.max(0, stepCount - 1);
  const [phase, setPhase] = useState(0);
  const [playing, setPlaying] = useState(true);
  const isPlaying = playing && phase < finalPhase && !reduced;

  const goTo = useCallback(
    (next: number) => setPhase(Math.max(0, Math.min(finalPhase, next))),
    [finalPhase],
  );

  useEffect(() => {
    if (!reduced) {
      return;
    }
    const jump = requestAnimationFrame(() => setPhase(finalPhase));
    return () => cancelAnimationFrame(jump);
  }, [finalPhase, reduced]);

  useEffect(() => {
    onReadyChange?.(phase >= finalPhase);
  }, [finalPhase, onReadyChange, phase]);

  useEffect(() => {
    if (!isPlaying) {
      return;
    }
    const id = window.setTimeout(() => setPhase((p) => Math.min(finalPhase, p + 1)), intervalMs);
    return () => window.clearTimeout(id);
  }, [finalPhase, intervalMs, isPlaying, phase]);

  const presenterNav = useMemo(
    () => ({
      onAdvance: () => {
        setPlaying(false);
        goTo(phase + 1);
      },
      onRetreat: () => {
        setPlaying(false);
        goTo(phase - 1);
      },
      canAdvance: phase < finalPhase,
      canRetreat: phase > 0,
    }),
    [finalPhase, goTo, phase],
  );
  useRegisterLessonPresenterNavigation(presenterNav);

  const footer = useMemo(
    () => (
      <StageStepControls
        variant="presenter"
        phase={phase}
        stepCount={stepCount}
        playing={isPlaying}
        onPhaseChange={(next) => {
          setPlaying(false);
          goTo(next);
        }}
        onPlayingChange={setPlaying}
        onRestart={() => {
          goTo(0);
          setPlaying(true);
        }}
      />
    ),
    [goTo, isPlaying, phase, stepCount],
  );
  useRegisterLessonFooterCenter(footer);

  return { phase, reduced, goTo, setPlaying };
}

export function SceneShell({
  caption,
  phase,
  children,
}: {
  caption: string;
  phase: number;
  children: ReactNode;
}) {
  return (
    <div
      className="flex h-full min-h-[14rem] w-full flex-1 flex-col items-center gap-2"
      data-testid="numeracion-scene-shell"
    >
      <div className="flex min-h-0 w-full flex-1 items-start justify-center pt-1">{children}</div>
      <div className="flex min-h-[3rem] shrink-0 items-start justify-center px-4">
        <p
          key={phase}
          className={cn(
            ENTER,
            "max-w-3xl text-center text-base font-medium duration-500 text-[color:var(--stage-ink,#e8edf5)]",
          )}
          aria-live="polite"
        >
          <MathRenderer text={caption} />
        </p>
      </div>
    </div>
  );
}

export function IdeaCard({
  callout,
  visible,
  anchorX,
  anchorY,
  width = 168,
}: {
  callout: NumeracionCallout;
  visible: boolean;
  anchorX: number;
  anchorY: number;
  width?: number;
}) {
  const border = CALLOUT_BORDER[callout.kind];
  const offset =
    callout.side === "left"
      ? { x: anchorX - width - 24, y: anchorY - 20 }
      : callout.side === "right"
        ? { x: anchorX + 24, y: anchorY - 20 }
        : { x: anchorX - width / 2, y: anchorY + 28 };
  const lineEnd =
    callout.side === "bottom"
      ? { x: anchorX, y: anchorY + 8 }
      : { x: callout.side === "left" ? anchorX - 6 : anchorX + 6, y: anchorY };

  if (!visible) {
    return null;
  }

  return (
    <g className={cn(ENTER, "duration-500")} aria-hidden={!visible}>
      <line
        x1={offset.x + width / 2}
        y1={callout.side === "bottom" ? offset.y : offset.y + 22}
        x2={lineEnd.x}
        y2={lineEnd.y}
        stroke={border}
        strokeWidth={1}
        strokeOpacity={0.55}
      />
      <foreignObject x={offset.x} y={offset.y} width={width} height={56} aria-hidden>
        <div
          className="rounded-md border px-2 py-1.5 text-[11px] leading-snug shadow-sm backdrop-blur-sm"
          style={{
            borderColor: `${border}99`,
            background: "color-mix(in srgb, var(--stage-surface, #1a2332) 88%, transparent)",
            color: INK,
          }}
        >
          <MathRenderer text={callout.text} emphasis="mark-alternate" />
        </div>
      </foreignObject>
    </g>
  );
}

export function CalloutLayer({
  callouts,
  phase,
  anchor,
}: {
  callouts?: NumeracionCallout[];
  phase: number;
  anchor: { x: number; y: number };
}) {
  if (!callouts?.length) {
    return null;
  }
  return (
    <>
      {callouts.map((c) => (
        <IdeaCard key={c.id} callout={c} visible={phase >= c.phase} anchorX={anchor.x} anchorY={anchor.y} />
      ))}
    </>
  );
}

export function DrawnStroke({
  d,
  visible,
  reduced,
  delayMs = 0,
  stroke = INK,
  strokeWidth = 1.5,
}: {
  d: string;
  visible: boolean;
  reduced: boolean;
  delayMs?: number;
  stroke?: string;
  strokeWidth?: number;
}) {
  return (
    <path
      d={d}
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      pathLength={1}
      strokeDasharray={1}
      strokeDashoffset={visible || reduced ? 0 : 1}
      style={{
        transition: reduced ? undefined : "stroke-dashoffset 0.7s ease",
        transitionDelay: reduced ? undefined : `${delayMs}ms`,
      }}
    />
  );
}

export function AnimArrow(props: {
  coords: [number, number, number, number, number, number];
  stroke?: string;
  delayMs?: number;
  reduced: boolean;
}) {
  const appeared = useAppeared();
  return (
    <DrawnArrow
      coords={props.coords}
      visible={appeared}
      reduced={props.reduced}
      delayMs={props.delayMs ?? 0}
      stroke={props.stroke ?? BLUE}
    />
  );
}

export function fadeOpacity(active: boolean, dimmed = false): number {
  if (!active) {
    return dimmed ? 0.35 : 0;
  }
  return dimmed ? 0.7 : 1;
}

export function StageSvg({
  viewBox,
  children,
  testId,
}: {
  viewBox: string;
  children: ReactNode;
  testId?: string;
}) {
  return (
    <svg
      viewBox={viewBox}
      className="h-full max-h-[min(22rem,52vh)] w-full max-w-3xl text-[color:var(--stage-ink,#e8edf5)]"
      role="img"
      aria-hidden
      data-testid={testId}
    >
      {children}
    </svg>
  );
}
